import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edu_NSW_ACT_Cursive } from "next/font/google";

export const metadata: Metadata = {
  title: "Founder Pulse",
  description: "A dashboard for founders to track their business metrics",
};
const eduCursive =  Edu_NSW_ACT_Cursive({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
 });
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={eduCursive.className}>
        <div>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 md:ml-52 ml-16 mt-16 bg-gray-50">{children}</main>
          </div>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </body>
    </html>
  );
}
