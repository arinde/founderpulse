"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ChartNoAxesCombined, Users, Cog, ChevronsRight, X } from "lucide-react"
import { useState } from "react"

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const toggleSidebar = () => {
        setOpen(!open);
    }
    const pathname = usePathname();
   
    return ( 
        <aside className={`h-screen ${open ? "w-36" : "w-16" } md:w-52 mt-12 bg-slate-950 text-white fixed border-r-gray-950 border-r-2 md: border-r-0`}>
            <div className="md:space-y-8 md:flex hidden flex-col mt-20 items-center">
                <Link href="/dashboard" className={`cursor-pointer font-semibold text-lg flex items-center justify-center ${pathname === "/dashboard" ? " w-full bg-gray-100   text-blue-950 text-center py-2" : "bg-none"}`}><button className="flex items-center justify-center gap-x-2" >Dashboard <LayoutDashboard size={20} /></button></Link>
                 <Link href="/revenue" className={`cursor-pointer font-semibold text-lg flex items-center justify-center ${pathname === "/revenue" ? " w-full bg-gray-100   text-blue-950 text-center py-2" : "bg-non"}`}> <button className="flex items-center justify-center gap-x-2">Revenue <ChartNoAxesCombined size={16} /></button></Link>
                 <Link href="/users" className={`cursor-pointer font-semibold text-lg flex items-center justify-center ${pathname === "/users" ? " w-full bg-gray-100   text-blue-950 text-center py-2" : "bg-none"}`}> <button className="flex items-center justify-center gap-x-2">Users <Users size={18} /></button></Link>
                 <Link href="/settings" className={`cursor-pointer font-semibold text-lg flex items-center justify-center ${pathname === "/settings" ? "w-full bg-gray-100   text-blue-950 text-center py-2" : "bg-none"}`}> <button className="flex items-center justify-center gap-x-2">Settings <Cog size={18} /></button></Link>
            </div>
            
            <div>
                <div onClick={toggleSidebar} className={`md:hidden flex justify-center rounded-full  w-fit p-1 ${open ? "ml-32" : "ml-10"} bg-gray-900 border border-gray-400 items-center mt-16`}>
                   {open ? <X /> : <ChevronsRight />}
                 </div>
                {/* Mobile Sidebar */}
                <div className="flex md:hidden justify-center items-center flex-col space-y-12 mt-20">
                    <Link href="/dashboard" className={`transition-all duration-300 group font-semibold text-lg flex items-center justify-center ${pathname === "/dashboard" ? " w-full text-green-400 text-center py-2" : "bg-none"}`}>
                        <button className={`flex items-center justify-center ${open ? "gap-x-1": "gap-x-0"}`}>
                            {open ? <LayoutDashboard size={24} /> : <LayoutDashboard size={36} />}
                            {open && <span className="text-md"> Dashboard</span>}
                            {pathname === "/dashboard" && <span className={`font-sans ${open ? "left-[141px]" : "left-[61px]"} absolute  h-16 w-[3px] bg-teal-600`}></span>}
                        </button>
                    </Link>
                    <Link href="/revenue" className={`transition-all duration-300 group font-semibold text-lg flex items-center justify-center ${pathname === "/revenue" ? "w-full text-green-400 text-center py-2" : "bg-non"}`}>
                        <button className={`flex items-center justify-center ${open ? "gap-x-1": "gap-x-0"}`}>
                            {open ? <ChartNoAxesCombined size={24} /> : <ChartNoAxesCombined size={36} />}
                            {open && <span className="text-md"> Revenue</span>}
                            {pathname === "/revenue" && <span className={`font-sans ${open ? "left-[141px]" : "left-[61px]"} absolute  h-16 w-[3px] bg-teal-600`}></span>}
                        </button>

                    </Link>
                    <Link href="/users" className={`transition-all duration-300 group font-semibold text-lg flex items-center justify-center ${pathname === "/users" ? " w-full  text-green-400 text-center py-2" : "bg-none"}`}>
                        <button className={`flex items-center justify-center ${open ? "gap-x-1": "gap-x-0"}`}>
                            {open ? <Users size={24} /> : <Users size={36} />}
                            {open && <span className="text-md"> Users</span>}
                            {pathname === "/users" && <span className={`font-sans ${open ? "left-[141px]" : "left-[61px]"} absolute  h-16 w-[3px] bg-teal-600`}></span>}
                        </button>
                    </Link>
                    <Link href="/settings" className={`transition-all duration-300 group font-semibold text-lg flex items-center justify-center ${pathname === "/settings" ? "w-full  text-green-400 text-center py-2" : "bg-none"}`}>
                        <button className={`flex items-center justify-center ${open ? "gap-x-1": "gap-x-0"}`}>
                            {open ? <Cog size={24} /> : <Cog size={36} />}
                            {open && <span className="text-md"> Cog</span>}
                            {pathname === "/cog" && <span className={`font-sans ${open ? "left-[141px]" : "left-[61px]"} absolute  h-16 w-[3px] bg-teal-600`}></span>}
                        </button>
                    </Link>
                 </div>

                 
            </div>
        </aside>
    )
}