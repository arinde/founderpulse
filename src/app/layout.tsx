import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder Pulse",
  description: "A dashboard for founders to track their business metrics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
