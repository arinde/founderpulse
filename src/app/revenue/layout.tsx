import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Founder Pulse",
  description: "A dashboard for founders to track their business metrics",
};

export default function RevenueLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 ml-52 mt-16 bg-gray-50">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
