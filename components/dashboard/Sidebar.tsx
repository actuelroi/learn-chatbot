"use client"

import { useUser } from "@/hooks/useUser"
import { cn } from "@/lib/utils"
import { BookOpen, Bot, Layers, LayoutDashboard, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"


const SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "Knowledge",
    href: "/dashboard//knowledge",
    icon: BookOpen
  },
  {
    label: "Sections",
    href: "/dashboard/sections",
    icon: Layers
  },
  {
    label: "Chatbot",
    href: "/dashboard/charbot",
    icon: Bot
  },
  {
    label: "Conversations",
    href: "/dashboard/conversations",
    icon: MessageSquare
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings
  },
]



const Sidebar = () => {
  const pathName = usePathname()
  const { email } = useUser()
  const [metadata, setMetaData] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchMetadata = async () => {
      const response = await fetch('/api/metadata/fetch')

      const data = await response.json()
      setMetaData(data.exists)
      setIsLoading(false)
    }
    fetchMetadata();
  }, [])


  return (
    <aside className='w-64 border-r border-white/5 bg-[#050509] flex-col h-screen fixed left-0 top-0 z-40 hidden md:flex'>
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-black rounded">
            </div>
          </div>
          <span className="text-sm font-medium tracking-tight text-white/90">OneMinuteSupport</span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {SIDEBAR_ITEMS.map((item, i) => {
          const isActive = pathName === item.href
          return (
            <Link href={item.href} key={i}
              className={cn('flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive ? "bg-white/5 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors">


          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/5">
            <span className="text-xs text-zinc-400 group-hover:text-white">
              {metadata?.business_name?.slice(0, 2).toUpperCase() || ".."}
            </span>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-zinc-300 truncate">
                {isLoading
                  ? "Loading.." : `${metadata?.business_name} &apos;s workspace`
                }
              </span>
              <span className="text-xs text-zinc-500 truncate">{email}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
