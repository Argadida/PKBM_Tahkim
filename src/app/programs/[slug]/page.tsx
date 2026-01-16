"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Check, BookOpen, GraduationCap, School, Users, Calendar, Clock, MapPin, Baby } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const programData = {
    "paud": {
        title: "PAUD (Pendidikan Anak Usia Dini)",
        subtitle: "Usia 3-6 Tahun",
        description: "Program pendidikan anak usia dini yang berfokus pada pembentukan karakter Islami, adab, dan persiapan dasar akademik dengan metode bermain sambil belajar.",
        note: "",
        icon: Baby,
        features: [
            "Pembentukan Adab Islami sejak dini",
            "Pengenalan huruf dan angka (Calistung Dasar)",
            "Hafalan Juz 30, doa-doa harian dan ilmu hadits",
            "Pengembangan motorik kasar dan halus",
            "Lingkungan belajar yang aman dan nyaman",
            "Tenaga pengajar yang sabar dan kompeten"
        ],
        details: {
            duration: "2 tahun",
            schedule: "Senin–Sabtu, 07:30–11:00",
            location: "Belakang Gedung Ma'had Tahkimussunnah Al-islamy",
            curriculum: "Kurikulum Merdeka Berbasis Pesantren"
        },
        image: "/paud3.jpeg"
    },
    "paket-c": {
        title: "Paket C (Setara SMA)",
        subtitle: "Pendidikan Menengah Atas",
        description: "Membekali siswa tingkat akhir dengan keterampilan hidup (life skills), kewirausahaan, dan persiapan matang untuk dunia kuliah atau kerja.",
        note: "Catatan: {`Untuk Program ini mengharuskan siswa menjalankan program bording school (Pesantren) di Ponpes Tahkimussunnah Al-islamy selama masa Paket C.`}",
        icon: GraduationCap,
        features: [
            "Program Entrepreneurship (Wirausaha)",
            "Pelatihan Life Skills dan Teknologi",
            "Bimbingan Persiapan Masuk Perguruan Tinggi",
            "Sertifikasi Kompetensi keahlian tertentu",
            "Kajian Agama Mendalam dan Kontemporer",
            "Relasi luas dengan dunia usaha/industri (DUDI)"
        ],
        details: {
            duration: "3 tahun",
            schedule: "Senin–Sabtu, 07:30–13:00",
            location: "Gedung Kantor PKBM Matsil,Ma'had Tahkimussunnah Al-islamy",
            curriculum: "Kurikulum Merdeka Berbasis Pesantren"
        },
        image: "https://i.pinimg.com/1200x/30/31/bc/3031bcdd881c35b1e5ad74f433e69dc3.jpg"
    }
};

export default function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const program = programData[slug as keyof typeof programData];

    if (!program) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Program tidak ditemukan</h1>
                <Link href="/" className="text-emerald-600 hover:underline">Kembali ke Beranda</Link>
            </div>
        );
    }

    const Icon = program.icon;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pb-20">
                {/* Hero Section */}
                <div className="relative h-[400px] w-full overflow-hidden">
                    <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center">
                        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                            <Link
                                href="/#programs"
                                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span>Kembali ke Program</span>
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {program.title}
                            </h1>
                            <p className="text-xl text-emerald-100 font-medium">
                                {program.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl -mt-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-2 space-y-8"
                        >
                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-800">Deskripsi Program</h2>
                                        <div className="h-1 w-12 bg-emerald-500 rounded-full mt-1"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-4">
                                        <p className="text-slate-600 leading-relaxed text-lg">
                                            {program.description}
                                        </p>
                                    </div>
                                    <div className="relative h-48 md:h-full min-h-[200px] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                                        <img
                                            src={program.image}
                                            alt={`${program.title} illustration`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                                    </div>
                                </div>

                                <div className="gap-8 mb-8">
                                    <div className="space-y-2">
                                        <p className="text-red-400 leading-relaxed text-m text italic">
                                            {program.note}
                                        </p>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    Keunggulan Program
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {program.features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + (index * 0.1) }}
                                            className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group"
                                        >
                                            <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <span className="text-slate-700 font-medium">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Sidebar Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="space-y-6"
                        >
                            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
                                <h3 className="text-xl font-bold mb-6">Informasi Cepat</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <Clock className="w-6 h-6 text-emerald-400 shrink-0" />
                                        <div>
                                            <p className="text-emerald-400 text-sm font-medium">Jadwal Belajar</p>
                                            <p className="text-slate-300">{program.details.schedule}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Calendar className="w-6 h-6 text-emerald-400 shrink-0" />
                                        <div>
                                            <p className="text-emerald-400 text-sm font-medium">Durasi Program</p>
                                            <p className="text-slate-300">{program.details.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-6 h-6 text-emerald-400 shrink-0" />
                                        <div>
                                            <p className="text-emerald-400 text-sm font-medium">Lokasi</p>
                                            <p className="text-slate-300">{program.details.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <BookOpen className="w-6 h-6 text-emerald-400 shrink-0" />
                                        <div>
                                            <p className="text-emerald-400 text-sm font-medium">Kurikulum</p>
                                            <p className="text-slate-300">{program.details.curriculum}</p>
                                        </div>
                                    </div>
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        href="https://ppdb.tahkimussunnah.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full mt-10 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
