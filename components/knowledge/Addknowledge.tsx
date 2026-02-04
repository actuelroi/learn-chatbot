"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle, FileText, Globe, Loader, Upload } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface AddKnowledgeProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    defaultTab: string;
    setDefaultTab: (tab: string) => void;
    onImport: (data: any) => Promise<void>;
    isLoading: boolean;
    existingSources: KnowledgeSource[]
}

const AddKnowledge = ({ defaultTab, existingSources,
    isLoading, isOpen, onImport, setDefaultTab,
    setIsOpen }: AddKnowledgeProps) => {

    const [websiteUrl, setWebsiteUrl] = useState("");
    const [docsTitle, setDocsTitle] = useState("");
    const [docsContent, setDocsContent] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [error, setError] = useState<String | null>(null);

    const validateUrl = (url: string) => {
        try {
            const parsed = new URL(url);
            return ["http:", "https"].includes(parsed.protocol)
        } catch {
            return false
        }
    }

    const handleImportWrapper = async () => {
        setError(null)
        const data: any = { type: defaultTab };

        if (defaultTab === "website") {
            if (!websiteUrl) {
                setError("Please enter a website url")
                return
            }
            if (!validateUrl(websiteUrl)) {
                setError('Please enter a valid URL (e.g. https://example.com')
                return
            }

            const normalizedInput = websiteUrl.replace(/\/$/, "");

            const exists = existingSources.some((source) => {
                if (source.type !== "website" || !source.source_url) {
                    return false
                }
                const normalizesSource = source.source_url.replace(/\/$/, "")
                return normalizesSource === normalizedInput;
            })

            if (exists) {
                setError('This website already in your knowledge base')
                return
            }
            data.url = websiteUrl
        } else if (defaultTab === "text") {
            if (!docsTitle.trim()) {
                setError("Please enter a title");
                return
            }
            if (!docsContent.trim()) {
                setError("Please provide content");
                return
            }
            data.title = docsTitle;
            data.content = docsContent;
        }
        else if(defaultTab === "upload"){

            if(!uploadedFile){
                setError('Please select a file to upload');
                return
            }

            data.file = uploadedFile;
           
        }

        await onImport(data);

        setWebsiteUrl('')
        setDocsTitle('');
        setDocsContent('');
        setUploadedFile(null);
        setError(null)
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    setError(null)
                }
            }}
        >
            <DialogContent className="sm:max-w-150 bg-[#0E0E12] border-white/10 text-zinc-100 p-0 overflow-hidden gap-0" >
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle>
                        Add new Source
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        Choose a content type to train your assistant
                    </DialogDescription>
                </DialogHeader>
                <Tabs
                    defaultValue="website"
                    value={defaultTab}
                    onValueChange={(value) => {
                        setDefaultTab(value)
                        setError(null)
                    }}
                    className="w-full"
                >
                    <div className="px-6 border-b border-white/5">
                        <TabsList className="bg-transparent h-auto p-0 gap-6" >
                            <TabsTrigger
                                value="website"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 uppercase tracking-wider text-zinc-500 data-[state=active]:text-white transition-all 
                      focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ring-0 outline-none border-t-0 border-x-0 "
                            >
                                Website
                            </TabsTrigger>


                            <TabsTrigger
                                value="text"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 uppercase tracking-wider text-zinc-500 data-[state=active]:text-white transition-all 
                      focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ring-0 outline-none border-t-0 border-x-0 "
                            >
                                Q&A / Text
                            </TabsTrigger>
                            <TabsTrigger
                                value="upload"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 uppercase tracking-wider text-zinc-500 data-[state=active]:text-white transition-all 
                      focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ring-0 outline-none border-t-0 border-x-0 "
                            >
                                File upload
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="p-6 min-h-50 space-y-4">
                        {error && (
                            <Alert
                                variant={'destructive'}
                                className="bg-red-500/10 border-red-500/20 text-red-400"
                            >
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="ml-2 text-xs">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}


                        <TabsContent value={"website"} className="mt-0 space-y-4 animate-in fade-in duration-300">
                            <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-sm flex gap-3">
                                <Globe className="w-5 h-5 shrink-0" />
                                <p className="font-medium text-white">Crawl website</p>
                            </div>
                            <div >

                                <p className="text-xs text-indigo-300/80 mt-1 leading-relaxed">
                                    Enter a wesite URL to crawl significanly or add a specific path link to provide focused context
                                </p>
                            </div>
                            <div className="space-y-3">
                                <Label>Wesite URL </Label>
                                <Input
                                    placeholder="https://example.com"
                                    className="bg-white/5 border-white/10 mt-1"
                                    value={websiteUrl}
                                    onChange={(e) => {
                                        setWebsiteUrl(e.target.value);
                                        if (error) setError(null)
                                    }}
                                />
                            </div>
                        </TabsContent>




                        <TabsContent value={"text"} className="mt-0 space-y-4 animate-in fade-in duration-300">
                            <div className="p-4 rounded-lg bg-indigo-500/10 border border-purple-500/20 text-purple-200 text-sm flex gap-3">
                                <FileText className="w-5 h-5 shrink-0" />
                                <p className="font-medium text-white"> Raw text</p>
                            </div>
                            <div >

                                <p className="text-xs text-purple-300/80 mt-1 leading-relaxed">
                                    Pase existing FAQs, policies or internal notes directly
                                </p>
                            </div>
                            <div className="space-y-3">
                                <Label>Tile </Label>
                                <Input
                                    placeholder="e.g Refund Policy"
                                    className="bg-white/5 border-white/10 mt-1"
                                    value={docsTitle}
                                    onChange={(e) => {
                                        setDocsTitle(e.target.value);
                                        if (error) setError(null)
                                    }}
                                />
                            </div>
                            <div className="space-y-3">
                                <Label>Content</Label>
                                <Textarea
                                    placeholder="Paste text here"
                                    className="bg-white/5 border-white/10 h-32 resize-none"
                                    value={docsContent}
                                    onChange={(e) => setDocsContent(e.target.value)}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent
                            value={"upload"}
                            className="mt-0 space-y-4 animate-in fade-in duration-300">

                            <input
                                type="file"
                                id="csv-file-input"
                                accept=".csv, text/csv"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        if (file.size > 10 * 1024 * 1024) {
                                            setError("File size must be less than 10MB")
                                            return
                                        }
                                        if (!file.name.endsWith(".csv") && file.type === "text/csv") {
                                            setError('Please passe csv file')
                                            return
                                        }

                                        setUploadedFile(file)
                                        setError(null)
                                    }



                                }}
                            />

                            <div className="border-2 border-dashed border-white/10 rounded-xl h-60 flex items-center justify-center flex-col"
                                onClick={() => document.getElementById('csv-file-input')?.click()}
                            >


                                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                                    <Upload className="w-5 h-5 shrink-0 text-zinc-400" />

                                </div>

                                <p className="text-sm font-medium text-white">
                                    {uploadedFile ? uploadedFile.name : 'Click to upload files'}
                                </p>
                                <p className="text-xs text-zinc-500 mt-1">
                                    CSV (max 10MB)
                                </p>
                            </div>
                        </TabsContent>



                    </div>

                    <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">

                        <Button variant={'ghost'}
                            className="text-zinc-400 hover:text-white hover:bg-white/5"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button

                            className={cn("bg-white min-w-27.5 text-black hover:bg-zinc-200",
                                isLoading ? "opacity-50 cursor-not-allowed" : ""
                            )}

                            onClick={handleImportWrapper}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader className="w-4 h-4 mr-2 animate-spin" />
                            ) : ("Import Source")}
                        </Button>
                    </div>

                </Tabs>
            </DialogContent>

        </Dialog>
    )
}

export default AddKnowledge
