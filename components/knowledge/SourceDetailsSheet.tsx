import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import { getStatusBadge, getTypeIcon } from "./KnowlegdeTable";


interface Props{
    isOpen: boolean;
    setIsOpen: (open:boolean) => void;
    selectedSource: KnowledgeSource | null;

}

const SourceDetailsSheet = ({isOpen,selectedSource,setIsOpen}:Props) => {

    if(!selectedSource){
        return null;
    }



  return (
   <Sheet onOpenChange={setIsOpen} open={isOpen}>
     <SheetContent className="w-full p-0 border-l+">
      <div className="h-full flex flex-col">
           <SheetHeader className="p-6 border-b border-white">
              <SheetTitle className="text-xl text-white items-center gap-">
                
              {getTypeIcon(selectedSource.type as SourceType)}
              {selectedSource.name}
              </SheetTitle>

              <SheetDescription className="text-white">
                {selectedSource.source_url || 'Manual entry'}
              </SheetDescription>
              <div className="pt-2 flex gap-2">
                {getStatusBadge(selectedSource.status as SourceStatus)}
                <span className="text-xs text-zinc-500 py-1 flex items-center">
                    Updated{' '}
                    {selectedSource.last_updated && new Date(selectedSource.last_updated).toLocaleDateString()}

                </span>
              </div>

           </SheetHeader>
           <div className="flex-1 overflow-y-auto p-6 space-y-6">
             <div className="space-y-4">
                <h4 className="text-sm font-medium text-zinc-300 uppercase">
                 Content Preview
                </h4>
                     <div className="p-4 rounded-lg border border-white h-72 overflow-y-scroll leading-relaxed">
                        {selectedSource.content || `# ${selectedSource.name}` }
                     </div>
             </div>

           </div>

           <SheetFooter className="p-6 border-t border-white">
            <Button variant={'destructive'}>
                Disconnect Source
            </Button>

           </SheetFooter>
      </div>
     </SheetContent>
   </Sheet>
  )
}

export default SourceDetailsSheet
