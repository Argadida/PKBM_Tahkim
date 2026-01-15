"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();
    const isHome = pathname === "/";

    const navLinks = [
        { name: "Beranda", href: "/" },
        { name: "Program", href: "/programs" },
        { name: "Keunggulan", href: isHome ? "#advantages" : "/#advantages" },
        { name: "Artikel", href: "/blog" },
        { name: "Kontak", href: isHome ? "#contact" : "/#contact" },
    ];

    return (
        <nav className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300 bg-white",
            scrolled ? "shadow-sm border-b border-slate-100 py-2" : "py-4"
        )}>
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 font-bold text-xl text-slate-800 group">
                    <div className="relative w-11 h-11 flex items-center justify-center overflow-hidden">
                        <img
                            src="/logo.png"
                            alt="PKBM MATSIL Logo"
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-emerald-600">PKBM</span>
                        <span className="text-slate-700">MATSIL</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href="#register" className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-emerald-100 ring-offset-2 focus:ring-2 ring-emerald-500">
                        Daftar Sekarang
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg p-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium p-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-2">
                        <Link
                            href="#register"
                            className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Daftar Sekarang
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
