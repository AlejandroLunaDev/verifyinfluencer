import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar/navbar";



export const metadata: Metadata = {
  title: "verifyinfluencer",
  description: "verifyinfluencer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" text-white min-h-screen flex flex-col bg-background">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
