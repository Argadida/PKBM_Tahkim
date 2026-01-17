import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, GraduationCap, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 font-bold text-xl text-white mb-6 group">
                            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden">
                                <img
                                    src="/logo.png"
                                    alt="PKBM MATSIL Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-emerald-500">PKBM</span>
                                <span className="text-white">MATSIL</span>
                            </div>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                            <span className="font-semibold italic mb-0.5">Berkarya Berbakti Dan Peduli.</span>
                            <br />
                            Integrasi ilmu syar'i dan keterampilan modern untuk membentuk karakter yang beradab, cerdas, dan siap menghadapi masa depan.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300">
                                <Facebook className="w-4 h-4" />
                            </Link>
                            <Link href="https://www.instagram.com/matsil_tv/" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300">
                                <Instagram className="w-4 h-4" />
                            </Link>
                            <Link href="https://www.youtube.com/@MatsilTV" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300">
                                <Youtube className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Tautan Cepat</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-emerald-500 transition-colors">Beranda</Link></li>
                            <li><Link href="#programs" className="hover:text-emerald-500 transition-colors">Program Pendidikan</Link></li>
                            <li><Link href="#advantages" className="hover:text-emerald-500 transition-colors">Keunggulan</Link></li>
                            <li><Link href="/blog" className="hover:text-emerald-500 transition-colors">Artikel</Link></li>
                        </ul>
                    </div>

                    {/* Programs */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Program</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/programs/paud" className="hover:text-emerald-500 transition-colors">PAUD (3-6 Tahun)</Link></li>
                            <li><Link href="/programs/paket-c" className="hover:text-emerald-500 transition-colors">Paket C (Setara SMA)</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Hubungi Kami</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>Pondok Pesantren Tahkimussunnah Al-islamy, W7HH+2X, Nunggal Rejo, Kec. Punggur, Kabupaten Lampung Tengah, Lampung 34152</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span>081367286280</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span>pkbm.matsilpunggur@gmail.om</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 text-center md:text-left">
                        © {new Date().getFullYear()} PKBM MATSIL. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-500">
                        <Link href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
