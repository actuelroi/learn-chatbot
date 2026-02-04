import { BookOpen, MessageCircleHeart, ShieldCheck } from 'lucide-react'
import React from 'react'

const Features = () => {
    return (
        <section id='features' className='py-32 px-6 max-w-6xl mx-auto'>
            <div className='mb-20'>
                <h2 className='text-3xl md:text-5xl font-medium text-white tracking-tight mb-6'>
                    Disigned for trust.
                </h2>
                <p className='text-xl text-zinc-500 font-light max-w-xl leading-relaxed'>
                    Most AI support tools hallucinate.Ours is strickly grounded in your percsont website white your content
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8' >
                <div className='group p-8 rounded-3xl border border-white/5 bg-linear-to-r'>
                    <div className='w-12 h-12 rounded-2xl  bg-[#0A0A0E] border border-white/50 flex items-center justify-center'>
                        <BookOpen className='w-6 h-6 text-zinc-300' />
                    </div>
                      <h3 className='text-lg font-medium text-white mb-3'>
                        Knowleg graph
                      </h3>
                      <p className='text-sm text-zinc-400 font-light leading-relaxed'>
                         We crawl your site and docs to build a structureed understanding og your product.No manual tranning required
                      </p>
                </div>

                <div className='group p-8 rounded-3xl border border-white/5 bg-linear-to-r'>
                    <div className='w-12 h-12 rounded-2xl  bg-[#0A0A0E] border border-white/50 flex items-center justify-center'>
                        <ShieldCheck className='w-6 h-6 text-zinc-300' />
                    </div>
                      <h3 className='text-lg font-medium text-white mb-3'>
                       Strick Guardrails
                      </h3>
                      <p className='text-sm text-zinc-400 font-light leading-relaxed'>
                        Defined exacly what the ai can and cannnot say. It will politely decline out-of scope questions
                      </p>
                </div>


                <div className='group p-8 rounded-3xl border border-white/5 bg-linear-to-r'>
                    <div className='w-12 h-12 rounded-2xl  bg-[#0A0A0E] border border-white/50 flex items-center justify-center'>
                        <MessageCircleHeart className='w-6 h-6 text-zinc-300' />
                    </div>
                      <h3 className='text-lg font-medium text-white mb-3'>
                       Tone matching
                      </h3>
                      <p className='text-sm text-zinc-400 font-light leading-relaxed'>
                       Whether you are professionnal , quirky, or consise the minni your brands voice perfectly
                      </p>
                </div>

            </div>
        </section>
    )
}

export default Features
