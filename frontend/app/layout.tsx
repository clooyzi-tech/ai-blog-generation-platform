import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Blog Dashboard",
  description: "Automate your blog content with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex h-screen overflow-hidden bg-[var(--color-bg-dark)] text-[var(--color-text-main)] font-inter">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {children}
        </main>
      </body>
    </html>
  );
}
