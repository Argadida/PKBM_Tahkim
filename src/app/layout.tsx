import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "PKBM MATSIL",
    description: "Berkarya Berbakti Dan Peduli",
};

import BackToHome from "@/components/BackToHome";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body className={cn(inter.variable, "font-sans antialiased bg-background text-foreground")}>
                {children}
                <BackToHome />
            </body>
        </html>
    );
}
