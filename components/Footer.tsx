import Link from "next/link"


const Footer = () => {
    return (
        <footer className="border-t border-white/5 py-12 bg-black/40">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-zinc-800 rounded-2 items-center justify-center flex">
                        <div className="w-2 h-2 bg-zinc-400 rounded"></div>
                    </div>
                    <span className="text-sm text-zinc-500 font-medium">OneMinute support</span>
                </div>
               <div className="flex gap-8 text-sm text-zinc-600 font-light">
                 <Link href={"#"}>
                 Privacy
                 </Link>
                 <Link href={"#"}>
                 Terms
                 </Link>
                 <Link href={"#"}>
                 Twitter
                 </Link>
               </div>
            </div>
        </footer>
    )
}

export default Footer
