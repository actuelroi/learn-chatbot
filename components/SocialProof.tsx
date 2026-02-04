


const SocialProof = () => {
    return (
        <section className="py-12 border-white/5 bg-black/20">
            <div className="maw-w-6xl mx-auto px-6 text-center">
                <p className="text-xs font-medium text-zinc-600 uppercase -tracking-widest mb-8">
                    Trusted by modern product teams
                </p>
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-80">
                   <span className="text-lg font-bold tracking-tight text-white">
                      ACME
                   </span>
                   <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                     <div className="w-4 h-4 bg-white rounded-full"></div> Sphere
                   </span>
                   <span className="text-lg font-bold tracking-tight text-white">
                      NEXUS
                   </span>
                   <span className="text-lg font-bold tracking-tight text-white">
                     Vantage.
                   </span>
                </div>
            </div>
        </section>
    )
}

export default SocialProof
