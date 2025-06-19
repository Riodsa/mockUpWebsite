import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";



const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Mitr Phol Careers",
  description: "Join us at Mitr Phol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="min-h-screen w-auto relative mx-auto">
        
        <div>
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
