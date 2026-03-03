'use client'
import SectionFormFields from "@/components/sections/SectionFormFields"
import SectionTable from "@/components/sections/SectionTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"


type SectionStatus = "active" | "draft" | "disabled"
type Tone = 'strict' | 'neutral' | 'friendly'| 'empathetic'




interface KnowledgeSource{
  id: string;
  name: string;
  type: string;
  status: string;
}




const INITIAL_FORM_DATA:SectionFormData = {
  name:'',
  description:'',
  tone: 'neutral',
  allowedTopics:'',
  blockedTopics:"",
  fallbackBehavior: "escalate",
}


const page = () => {


 useEffect(() => {
        fetchSections();
    }, [])

 const [isSheetOpen, setIsSheetOpen]=useState(false)
 const [selectedSection, setSelectedSection]=useState<Section | null>(null)
 const [knowledgeSources, setKnowledgeSources]=useState<KnowledgeSource[]>([])

 const [selectedSources, setSelectedSources] = useState<string[]>([]);
 const [isLoading, setIsLoading]= useState(true)
 const [isSaving, setIsSaving]= useState(false)
 const [sections, setSections]= useState<Section[]>([])

 const [isLoadingSections, setIsLoadingSections]= useState(true)
 const [isLoadingSources, setIsLoadingSources]= useState(false)
 const [formData, setFormData]= useState<SectionFormData>(INITIAL_FORM_DATA)



 useEffect(() => {
        const fetchKnowledgeSources = async () => {
            try{
                const res = await fetch("/api/knowledge/fetch")
                const data = await res.json();
                setKnowledgeSources(data.sources || [])
            }catch(error){
                console.error("Failed to fetch knowledge sources:", error);
            }finally{
                setIsLoadingSources(false);
            }
        };
        fetchKnowledgeSources();
    }, [])


  const handleCreateSection = () => {
        setSelectedSection({
            id: "new",
            name: "",
            description: "",
            sourceCount: 0,
            tone: "neutral",
            scopeLabel: "",
            status: "draft",
            source_ids: [],
            allowed_topics: "",
            blocked_topics: "",
        }); 
        setSelectedSources([]);
        setFormData(INITIAL_FORM_DATA);
        setIsSheetOpen(true);
    }



 const fetchSections = async () => {
        try {
            setIsLoadingSections(true);
            const response = await fetch("/api/sections/fetch");
            const data = await response.json();
 
            const transformedSections: Section[] = data.map((section: any) => ({
                id: section.id,
                name: section.name,
                description: section.description,
                sourceCount: section.source_ids?.length || 0,
                source_ids: section.source_ids || [],
                tone: section.tone as Tone,
                scopeLabel: section.allowed_topics || "General",
                allowed_topics: section.allowed_topics,
                blocked_topics: section.blocked_topics,
                status: section.status as SectionStatus,
            }))
            setSections(transformedSections);
        } catch (error) {
            console.error("Failed to fetch sections:", error);
        }finally{
            setIsLoadingSections(false);
        }
    }

    const handleSaveSection = async () => {
        if(!formData.name.trim() || !formData.description.trim()){
            alert("Please enter a section name");
            return;
        }
        if(!formData.description.trim()){
            alert("Please enter a section description");
            return;
        }
        if(selectedSources.length === 0){
            alert("Please select at least one knowledge source");
            return;
        }

        setIsSaving(true);
        try{
            const sectionData = {
                ...formData,
                sourceIDs: selectedSources,
                status: "active",
            };
            const response = await fetch("/api/sections/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sectionData),
            });
            if(!response.ok){
                throw new Error("Failed to create section");
            }
            await fetchSections();
            setIsSheetOpen(false);
        }catch(error){
            console.error("Error creating section:", error);
        }finally{
            setIsSaving(false);
        }
        
        
    };
    const handleDeleteSection = async () => {
        if(!selectedSection || selectedSection.id === "new") return;

        if(!confirm(`Are you sure you want to delete "${selectedSection.name}"? This action cannot be undone.`)) return;

        try {
            setIsSaving(true);
            const response = await fetch(`/api/sections/delete`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: selectedSection.id}),
            })
            if(!response.ok){
                throw new Error("Failed to delete section");
            }
            await fetchSections();
            setIsSheetOpen(false);
        } catch (error) {
            console.error("Error deleting section:", error);
        }finally{
            setIsSaving(false);
        }
    }

    const handlePreviewSection = (section: Section) => {
        setSelectedSection(section);
        setFormData({
            name: section.name,
            description: section.description,
            tone: section.tone,
            allowedTopics: section.allowed_topics || "",
            blockedTopics: section.blocked_topics || "",
            fallbackBehavior: "escalate",
        });
        setSelectedSources(section.source_ids || []);
        setIsSheetOpen(true);
    }

const isPreviewMode = selectedSection?.id !== "new";

  return (
    <div className="p-8">
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                <div >
                    <h1 className='text-2xl font-semibold text-white tracking-tight'>
                      Section
                    </h1>
                    <p className='text-sm text-zinc-400 mt-1'> Define behavior and tone for different topics.</p>
                </div>
                <div className='flex items-center gap-2'>
                    <Button
                        onClick={handleCreateSection}
                        className='bg-white text-black hover:bg-zinc-200 cursor-pointer'
                    >
                        <Plus className='w-4 h-4 mr-2' />
                        Create sections
                    </Button>
                </div>
            </div>
        <Card>
          <CardContent className="p-0">
            <SectionTable 
                isLoading={isLoadingSections}
                sections={sections}
                onPreview={handlePreviewSection}
                onCreateSection={handleCreateSection}
                />
          </CardContent>
        </Card>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} >
          <SheetContent className="w-full sm:max-w-lg border-l border-white">
           {selectedSection && (
            <>
              <SheetHeader className="p-6 border-b border-white">
                 <SheetTitle className='text-xl '>
                            {selectedSection.id === "new"
                            ? "Create Section"
                            : "View Section"}
                        </SheetTitle>
                        <SheetDescription className='text-zinc-500'>
                                {selectedSection.id === "new"
                                ? "Configure how the AI behaves for this specific topics"
                                : "Review section configuration and data sources."}
                        </SheetDescription>
              </SheetHeader>
               <div className='flex-1 overflow-y-auto px-6 py-0 space-y-8'>
                  <SectionFormFields 
                            formData={formData}
                            setFormData={setFormData}
                            selectedSources={selectedSources}
                            setSelectedSources={setSelectedSources}
                            knowledgeSources={knowledgeSources}
                            isLoadingSources={isLoadingSources}
                            isDisabled={isPreviewMode}
                            />
               </div>
            </>
           )}
          </SheetContent>
        </Sheet>
        
    </div>
  )
}

export default page
