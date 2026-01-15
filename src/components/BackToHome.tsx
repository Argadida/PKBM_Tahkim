"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const BackToHome = () => {
    const pathname = usePathname();
    const isHome = pathname === "/";

    if (isHome) return null;

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <Link href="/">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgb(5, 150, 105)", // emerald-600
                        color: "white"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center bg-white text-emerald-600 border-2 border-emerald-600 w-12 h-12 rounded-full font-bold shadow-2xl transition-all group backdrop-blur-sm bg-white/90"
                >
                    <Home className="w-6 h-6 group-hover:animate-pulse" />
                </motion.div>
            </Link>
        </div>
    );
};

export default BackToHome;
