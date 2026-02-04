import Sidebar from '@/components/dashboard/Sidebar'
import { cookies } from 'next/headers'
import React, { PropsWithChildren } from 'react'
import Header from '../../components/dashboard/Header'


export const metadata = {
    title: "OneMinute Support - Dashboard",
    description: "Instantly resolve customer question"
}


const layout = async ({ children }:{children:React.ReactNode}) => {
    const cookieStore = await cookies()
    const metadataCookie = cookieStore.get("metadata")


    return (
        <div className='bg-[#050509] min-h-screen font-sans  text-zinc-100'>
            {
                metadataCookie?.value ? (
                    <>
                        <Sidebar/>
                        <div className='flex flex-col md:ml-64 relative min-h-screen transition-all duration-300'>
                            <Header/>
                            <main className='flex-1'>
                                {children}
                            </main>
                        </div>
                    </>
                ) : children
            }
        </div>
    )
}

export default layout
