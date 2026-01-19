import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
    title: "PKBM MATSIL",
    description: "Berkarya Berbakti Dan Peduli",
    icons: {
        icon: "/logo.png",
        apple: "/logo.png",
    },
};

import BackToHome from "@/components/BackToHome";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body className={cn(poppins.variable, "font-sans antialiased bg-background text-foreground")}>
                {children}
                <BackToHome />
            </body>
        </html>
    );
}
