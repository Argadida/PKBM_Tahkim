"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, School, Users, CheckCircle2, ArrowRight, ShieldCheck, Heart, Sparkles, BookMarked, Baby } from "lucide-react";
import Link from "next/link";

const programs = [
    {
        title: "PAUD (Pendidikan Anak Usia Dini)",
        slug: "paud",
        icon: Baby,
        description: "Membentuk fondasi karakter Islami dan adab sejak dini melalui metode bermain yang edukatif.",
        longDescription: "Program PAUD kami tidak hanya sekadar tempat bermain, namun merupakan kawah candradimuka bagi anak-anak untuk mengenal nilai-nilai tauhid, adab kepada orang tua, dan kecintaan pada Al-Qur'an sejak usia dini.",
        features: ["Adab Islami", "Calistung Dasar", "Hafalan Juz 30", "Motorik Kasar & Halus", "Lingkungan Nyaman", "Pengajar Kompeten"],
        color: "bg-blue-50 text-blue-600",
        hoverColor: "group-hover:bg-blue-500"
    },
    {
        title: "Paket C (Setara SMA)",
        slug: "paket-c",
        icon: GraduationCap,
        description: "Persiapan matang menuju pendidikan tinggi dan dunia profesional dengan bekal iman.",
        longDescription: "Membimbing siswa tingkat akhir untuk siap menghadapi tantangan masa depan, baik ke perguruan tinggi maupun wirausaha, dengan integritas moral yang tinggi.",
        features: ["Persiapan Kampus", "Entrepreneurship", "Life Skills", "Tahfidz Lanjutan", "Kajian Mendalam", "Relasi Industri"],
        color: "bg-rose-50 text-rose-600",
        hoverColor: "group-hover:bg-rose-500"
    }
];

const CurriculumSection = () => (
    <div className="py-20 bg-slate-900 text-white rounded-[3rem] overflow-hidden my-20">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6"
                    >
                        <BookMarked className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">Kurikulum Terpadu</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        Integrasi Kurikulum Nasional & <span className="text-emerald-400">Nilai Diniyah</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Kami percaya bahwa pendidikan yang lengkap adalah yang menyeimbangkan antara kecerdasan intelektual, emosional, dan spiritual. Kurikulum kami dirancang untuk menghasilkan lulusan yang kompeten di bidangnya namun tetap teguh memegang prinsip syariat.
                    </p>
                    <div className="space-y-4">
                        {[
                            "Kurikulum Merdeka yang Adaptif",
                            "Metode Pembelajaran Active Learning",
                            "Fokus pada Pembentukan Karakter (Adab)",
                            "Bimbingan Intensif Tahfizh Al-Qur'an"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="p-1 bg-emerald-500/20 rounded-full">
                                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                </div>
                                <span className="text-slate-200 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-12">
                            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
                                <Heart className="w-10 h-10 text-rose-400 mb-4" />
                                <h4 className="font-bold mb-2">Pendidikan Hati</h4>
                                <p className="text-sm text-slate-400">Mengutamakan kesucian niat dan adab sebelum ilmu.</p>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
                                <Sparkles className="w-10 h-10 text-emerald-400 mb-4" />
                                <h4 className="font-bold mb-2">Inovasi Belajar</h4>
                                <p className="text-sm text-slate-400">Memanfaatkan teknologi modern dalam koridor syar'i.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-emerald-500 p-6 rounded-3xl text-white">
                                <Users className="w-10 h-10 mb-4" />
                                <h4 className="font-bold mb-2">Komunitas Salih</h4>
                                <p className="text-sm">Lingkungan yang mendukung tumbuh kembang karakter positif.</p>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
                                <ShieldCheck className="w-10 h-10 text-blue-400 mb-4" />
                                <h4 className="font-bold mb-2">Ijazah Resmi</h4>
                                <p className="text-sm text-slate-400">Telah terakreditasi dan memiliki pengakuan negara.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default function ProgramsOverview() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-24 pb-20">
                {/* Header Section */}
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-4 block">PKBM MATSIL</span>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                            Program Pendidikan <br className="hidden md:block" />
                            <span className="text-emerald-600">Berkualitas & Beradab</span>
                        </h1>
                        <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                            Kami menyediakan berbagai jenjang pendidikan formal kesetaraan (PKBM) bagi masyarakat dengan kurikulum terpadu yang menitikberatkan pada pembentukan aqidah dan karakter Islami.
                        </p>
                    </motion.div>
                </div>

                {/* Programs Grid */}
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                    <div className="space-y-12">
                        {programs.map((program, index) => (
                            <motion.div
                                key={program.slug}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-100 grid grid-cols-1 lg:grid-cols-12 relative">
                                    {/* Icon & Title Area */}
                                    <div className="lg:col-span-4 p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-50 flex flex-col justify-center items-center lg:items-start text-center lg:text-left transition-colors group-hover:bg-slate-50/50">
                                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${program.slug === 'paud' ? 'bg-emerald-500' : 'bg-rose-500'} text-white`}>
                                            <program.icon className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors">
                                            {program.title}
                                        </h3>
                                        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase">Terakreditasi</span>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">Kurikulum Merdeka</span>
                                        </div>
                                    </div>

                                    {/* Description Area */}
                                    <div className="lg:col-span-8 p-10 lg:p-12 flex flex-col justify-center">
                                        <p className="text-slate-500 font-medium mb-4 uppercase tracking-tighter text-sm">Tentang Program</p>
                                        <p className="text-slate-700 text-lg mb-8 leading-relaxed">
                                            {program.longDescription}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                            {program.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                                    <span className="text-slate-600 font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 mt-auto relative z-20">
                                            <Link
                                                href={`/programs/${program.slug}`}
                                                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 group-hover:scale-[1.02]"
                                            >
                                                Pelajari Lebih Lengkap
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                            <Link
                                                href="/#contact"
                                                className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                                            >
                                                Tanya Pendaftaran
                                            </Link>
                                        </div>
                                    </div>
                                    {/* Stretched Link for the entire card */}
                                    <Link href={`/programs/${program.slug}`} className="absolute inset-0 z-10" aria-label={`Detail ${program.title}`}>
                                        <span className="sr-only">Lihat Detail {program.title}</span>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Curriculum Detail Component */}
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                    <CurriculumSection />
                </div>

                {/* Final CTA */}
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl font-bold text-slate-800">Siap melangkah bersama kami?</h2>
                        <p className="text-slate-600 italic">"Ilmu tanpa adab seperti api tanpa kayu bakar, sedangkan adab tanpa ilmu seperti ruh tanpa jasad."</p>
                        <div className="pt-4">
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl"
                            >
                                Daftar Sekarang Melalui WhatsApp
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
