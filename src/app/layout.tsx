import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
//import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "ANi-LIst",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
        <Navbar initialSession={session} />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
