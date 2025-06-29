import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css"
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import NextAuthProvider from "@/providers/NextAuthProvider";

export const metadata: Metadata = {
  title: "Mitr Phol Careers",
  description: "Join us at Mitr Phol",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <NextAuthProvider session={session}>
        <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </head>
        <body className="w-[100%] relative mx-auto">
          <div className="w-full relative">
            {children}
          </div>
        </body>
      </html>
    </NextAuthProvider>
  );
}
