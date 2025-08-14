"use client"
import Link from "next/link"
import { User, Settings } from "lucide-react"
export default function Navbar() {
    return (
        <nav className=" fixed z-50 w-full bg-slate-800 text-white ">
            <div className="flex justify-between items-center  h-16 mx-8">
                <Link href="/">Founder<span className="text-yellow-300 font-bold tracking-wider font-serif text-md">Pulse</span></Link>

                <div className="flex ">
                    <User />
                    <Settings />
                </div>
            </div>
        </nav>
    )
}