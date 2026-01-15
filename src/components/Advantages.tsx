"use client";

import { motion } from "framer-motion";
import { BookOpen, ShieldCheck, Heart, UserCheck, Star, Users } from "lucide-react";

const advantages = [
    {
        icon: BookOpen,
        title: "Kurikulum Adab & Al-Qur'an",
        description: "Pondasi karakter Rabbani dengan metode talaqqi dan pembiasaan adab Islami sehari-hari.",
    },
    {
        icon: ShieldCheck,
        title: "Legalitas Resmi",
        description: "Ijazah diakui negara (Setara Formal) dan dapat digunakan untuk melanjutkan ke jenjang berikutnya.",
    },
    {
        icon: UserCheck,
        title: "Tutor Kompeten",
        description: "Dibimbing oleh asatidzah yang berpengalaman, beraqidah lurus, dan berdedikasi tinggi.",
    },
    {
        icon: Heart,
        title: "Lingkungan Islami",
        description: "Suasana belajar yang kondusif, terpisah putra-putri, dan jauh dari pengaruh negatif.",
    },
    {
        icon: Users,
        title: "Small Class Ratio",
        description: "Jumlah santri terbatas per kelas untuk memastikan fokus dan kualitas pendampingan maksimal.",
    },
    {
        icon: Star,
        title: "Ekstrakurikuler",
        description: "Program pengembangan minat dan bakat yang meliputi Bekam, Tata Busana, dan Design Grafis.",
    }
];

const Advantages = () => {
    return (
        <section id="advantages" className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-4">
                        Mengapa Memilih Kami?
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                        Komitmen kami dalam menghadirkan pendidikan berkualitas yang menyeimbangkan
                        kesuksesan dunia dan keselamatan akhirat.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {advantages.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="p-8 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group cursor-default"
                        >
                            <div className="mb-6 p-3 rounded-xl bg-white w-fit shadow-sm group-hover:bg-emerald-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                <item.icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Advantages;
