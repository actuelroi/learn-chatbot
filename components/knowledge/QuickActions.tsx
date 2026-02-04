import { File, Globe, Upload } from "lucide-react"
import { Button } from "../ui/button"


interface Props {
    onOpenModal: (tab: string) => void
}

const QuickActions = ({ onOpenModal }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button
                variant={"outline"}
                className="h-auto py-8 px-6 flex flex-col items-center justify-center gap-4 border-white/5 bg-[#0A0A0E] transition-all hover:bg-white/50"
                onClick={() => onOpenModal('website')}
            >
                <div className="p-3 rounded-full bg-indigo-500/10 border border-indigo-500 group-hover:bg-indigo-500/20 transition-colors">
                    <Globe className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="space-y-1.5 text-center w-full">
                    <span className="text-sm font-medium block whitespace-normal">
                        Add website
                    </span>
                    <p className="text-xs text-zinc-500 font-normal leading-relaxed whitespace-normal wrap-break-word">
                        Crawl your website or specific pages to automatically keep your chatbot knowledge base in sync
                    </p>
                </div>

            </Button>

            <Button
                variant={"outline"}
                className="h-auto py-8 px-6 flex flex-col items-center justify-center gap-4 border-white/5 bg-[#0A0A0E] transition-all hover:bg-white/50"
                onClick={() => onOpenModal('upload')}
            >
                <div className="p-3 rounded-full bg-indigo-500/10 border border-indigo-500 group-hover:bg-indigo-500/20 transition-colors">
                    <Upload className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="space-y-1.5 text-center w-full">
                    <span className="text-sm font-medium block whitespace-normal">
                        Upload file
                    </span>
                    <p className="text-xs text-zinc-500 font-normal leading-relaxed whitespace-normal wrap-break-word">
                        Upload csv files to instantly train your assistant with existing documents
                    </p>
                </div>

            </Button>


            <Button
                variant={"outline"}
                className="h-auto py-8 px-6 flex flex-col items-center justify-center gap-4 border-white/5 bg-[#0A0A0E] transition-all hover:bg-white/50"
                onClick={() => onOpenModal('text')}
            >
                <div className="p-3 rounded-full bg-indigo-500/10 border border-indigo-500 group-hover:bg-indigo-500/20 transition-colors">
                    <File className="w-6 h-6 text-zinc-400" />
                </div>
                <div className="space-y-1.5 text-center w-full">
                    <span className="text-sm font-medium block whitespace-normal">
                       Manual text
                    </span>
                    <p className="text-xs text-zinc-500 font-normal leading-relaxed whitespace-normal wrap-break-word">
                      Manual copy paste FAQs , internal notes, or policies
                    </p>
                </div>

            </Button>
        </div>
    )
}

export default QuickActions
