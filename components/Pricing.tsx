import { Check } from "lucide-react"


const Pricing = () => {
    return (
        <section
            id="pricing"
            className="py-32 px-6 max-w-6xl mx-auto text-center"
        >
            <h1 className="text-3xl md:text-4xl font-medium text-black tracking-tight">
                Fair, usage-base pricing
            </h1>
            <p className="text-zinc-500 font-light mb-16">
                Start free, upgrade as you grow
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-4">

                <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 flex flex-col text-left items-start hover:bg-zinc-900/40 transition-colors">
                    <div className="text-sm font-medium text-zinc-400 mb-2">Starter</div>
                    <div className="text-4xl font-medium text-white tracking-tight mb-6">
                        $0 <span className="text-lg text-zinc-600 font-light">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-8 text-sm text-zinc-300 font-light">
                        <li className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-zinc-600" /> 100 conversations
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-zinc-600" /> 1 Knowledge source
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-zinc-600" /> Community support
                        </li>
                    </ul>
                    <button className="w-full py-3 rounded-xl boder border-white/10 text-black hover:bg-black/5 transition-colors text-sm font-medium mt-auto">
                        Start free
                    </button>
                </div>

                <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 flex flex-col text-left items-start hover:bg-zinc-900/40 transition-colors">
                    <div className="text-sm font-medium text-zinc-400 mb-2">Popular</div>
                    <div className="text-sm font-medium text-indigo-400 mb-2">Pro</div>
                   
                    <div className="text-4xl font-medium text-white tracking-tight mb-6">
                        $49 <span className="text-lg text-zinc-600 font-light">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-8 text-sm text-zinc-300 font-light">
                        <li className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-zinc-600" /> unlimited conversations
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-zinc-600" /> unlimeted  Knowledge source
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-indigo-400" /> Community support
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-zinc-600" /> Custom branding
                        </li>
                    </ul>
                    <button className="w-full bg-white py-3 rounded-xl border border-white/10 text-black hover:bg-black/5 transition-colors text-sm font-medium mt-auto">
                        Get started
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Pricing
