"use client"
import { useState } from "react"
import Link from "next/link"

export default function Sidebar() {

    const [active, setActive] = useState("dashbaord")

   
    return ( 
        <aside className=" h-screen w-52 mt-12 bg-slate-900 text-white fixed">
            <div className="space-y-5 flex flex-col  mt-20 items-center">
                <Link href="/dashboard"><p onClick={() => setActive("dashboard")} className={`cursor-pointer font-semibold text-md ${active === "dashboard" ? "bg-yellow-300 px-14 rounded-md text-gray-800 text-center py-2 w-full" : "bg-none"}`}>Dashboard</p></Link>
                 <Link href="/revenue"><p onClick={() => setActive("revenue")} className={`font-semibold text-md ${active === "revenue" ? "bg-yellow-300 rounded-md text-gray-800 text-center py-2 w-full" : "bg-none"}`}>Revenue</p></Link>
                 <Link href="/users"><p onClick={() => setActive("users")} className={`font-semibold text-md ${active === "users" ? "bg-yellow-300 rounded-md text-gray-800 text-center py-2 w-full" : "bg-none"}`}>Users</p></Link>
                 <Link href="/settings"><p onClick={() => setActive("settings")} className={`font-semibold text-md ${active === "settings" ? "bg-yellow-300 rounded-md text-gray-800 text-center py-2 w-full" : "bg-none"}`}>Settings</p></Link>
            </div>
        </aside>
    )
}