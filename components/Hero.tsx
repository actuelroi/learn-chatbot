import { ArrowRight, Bot, Send, User } from "lucide-react"
import Image from "next/image"


const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-20">
                <div className="inline-flex items-center gap-2 
        px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-float 
        ">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34, 197, 94, 0.4)]"></span>
                    <span className="text-xs text-zinc-300 tracking-wide font-light">
                        Version 1.0.0 available now
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-medium tracking-tight  mb-6 leading-[1.1]">
                    Human-friendly support,
                    <br />
                    <span className="text-zinc-500">powered by AI</span>
                </h1>
                <p className="text-lg md:text-xl text-zinc-400 font-light mb-10 max-w-2xl mx- leading-relaxed">
                    Instantanly response with ai base on your knowlege
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap4 mb-20">
                    <button className="h-11 px-8 border rounded-full bg-white text-black text-sm">
                        Start for free
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="h-11 px-8 rounded-full border border-zinc-800 text-black text-sm">
                        View demo
                    </button>
                </div>
            </div>
            <div className="max-w-3xl mx-auto relative z-10">
                <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none">  </div>
                <div className="rounded-2xl overflow-hidden p-1 md:p-2 relative ring-1 ring-white/10 bg-[#0a0a0e] shadow-2xl ">
                    <div className="flex flex-col h-125 md:h-150 w-full bg-[#0a0a0e] rounded-xl overflow-hidden">
                        <div className="h-14 border-b border-white/5 flex  items-center justify-between px-6 bg-[#0E0E12 shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse">
                                    <span className="text-sm font-medium text-zinc-300">
                                        OneMinute Inc
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-zinc-950" >
                            <div className="flex w-full flex-col items-start">
                                <div className="flex max-w-[85%] gap-3 flex-row">
                                    <div className="w-8 h-8 rounded-full flex items-start ">
                                        <Bot className="w-4 h-4 text-zinc-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="p-4 rounded-2xl text-sm leading-relaxed shadow-sm bg-white">
                                            Hi there how can i help you today
                                        </div>
                                        <div className="flex flex-wrap gap-2 pt-1 ml-1">
                                            <span className="px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 text-xs font-medium cursor-default ">
                                                FAQ
                                            </span>
                                            <span className="px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 text-xs font-medium cursor-default ">
                                                Princing
                                            </span>
                                            <span className="px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 text-xs font-medium cursor-default ">
                                                Support
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex w-full flex-col items-end">
                                    <div className="flex max-w-[85%] gap-3 flex-row-reverse">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-zinc-400" />
                                        </div>
                                        <div className="p-4 rounded-2xl text-sm leading-relaxed text-white">
                                            I nedd some information about oneminute stack
                                        </div>
                                    </div>
                                </div>

                                <div className="flex w-full flex-col items-start">
                                    <div className="flex max-w-[85%] gap-3 flex-row">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-zinc-400" />
                                        </div>
                                        <div className="p-4 rounded-2xl text-sm leading-relaxed text-white">
                                            You have to check you bank account for feather support
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="p-4 bg-[#0A0A0E] border-t border-white/5 shrink-0">
                            <div className="relative">
                                <div className="min-h-12.5 w-full px-4 py-3 text-sm bg-zing-900 border text-white/50 rounded-xl items-center justify-between flex">
                                    <span>Type a message ...</span>
                                    <button className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center">
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
