"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, BookOpen, GraduationCap, School, Users, Baby } from "lucide-react";
import Link from "next/link";

const programs = [
    {
        title: "PAUD",
        slug: "paud",
        subtitle: "Usia 3-6 Tahun",
        icon: Baby,
        iconColor: "bg-blue-500",
        iconHoverColor: "group-hover:bg-blue-600",
        iconTextColor: "text-white",
        features: ["Adab Islami", "Calistung Dasar", "Hafalan Juz 30", "Motorik"],
    },
    {
        title: "Paket C",
        slug: "paket-c",
        subtitle: "Setara SMA",
        icon: GraduationCap,
        iconColor: "bg-emerald-500",
        iconHoverColor: "group-hover:bg-emerald-600",
        iconTextColor: "text-white",
        features: ["Entrepreneurship", "Life Skills", "Persiapan Kampus", "Sertifikasi"],
    }
];

const Programs = () => {
    return (
        <section id="programs" className="py-16 md:py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
                    >
                        Jenjang Pendidikan
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg text-slate-600 leading-relaxed"
                    >
                        Pilihan program pendidikan yang dirancang untuk memenuhi kebutuhan umat,
                        mulai dari usia dini hingga tingkat lanjut dengan kurikulum terpadu.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {programs.map((program, index) => (
                        <Link key={program.slug} href={`/programs/${program.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{
                                    y: -15,
                                    transition: { duration: 0.3 }
                                }}
                                className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-500/15 transition-all duration-500 flex flex-col h-full group border border-slate-100 hover:border-emerald-200 relative overflow-hidden"
                            >
                                {/* Gradient Background on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/0 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className={`relative z-10 w-14 h-14 ${program.iconColor || 'bg-emerald-50'} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 ${program.iconHoverColor || 'group-hover:bg-emerald-500'} group-hover:rotate-6 transition-all duration-500`}>
                                    <program.icon className={`w-7 h-7 ${program.iconTextColor || 'text-emerald-600'} group-hover:text-white transition-colors duration-500`} />
                                </div>

                                <div className="relative z-10 mb-6">
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors duration-500">
                                        {program.title}
                                    </h3>
                                    <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wider">
                                        {program.subtitle}
                                    </p>
                                </div>

                                <div className="relative z-10 space-y-4 mb-10 flex-grow">
                                    {program.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
                                            <div className="mt-1 bg-emerald-100 rounded-full p-0.5 group-hover:bg-emerald-500 transition-colors duration-500">
                                                <Check className="w-3 h-3 text-emerald-600 group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="relative z-10 inline-flex items-center gap-2 text-emerald-600 font-bold text-sm mt-auto group-hover:gap-4 transition-all duration-300">
                                    <span>Lihat Detail</span>
                                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Programs;
