"use client";

import { motion } from "framer-motion";
import { MessageSquare, Reply, User, Clock } from "lucide-react";

interface Message {
    id: number;
    name: string;
    message: string;
    reply: string | null;
    createdAt: Date | null;
}

export default function PublicMessages({ messages }: { messages: Message[] }) {
    if (messages.length === 0) return null;

    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-4"
                    >
                        <MessageSquare className="w-4 h-4" />
                        Tanya Jawab Pengunjung
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
                    >
                        Diskusi & Pertanyaan Umum
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 max-w-2xl mx-auto"
                    >
                        Lihat berbagai pertanyaan dari pengunjung lain yang telah dijawab oleh tim admin kami.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-white hover:border-emerald-100 transition-all group"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                                    <User className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold text-slate-900">{msg.name}</h4>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <Clock className="w-3 h-3" />
                                            {msg.createdAt && new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(new Date(msg.createdAt))}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed italic">
                                        "{msg.message}"
                                    </p>
                                </div>
                            </div>

                            <div className="ml-6 md:ml-12 pl-6 border-l-2 border-emerald-100 relative">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Reply className="w-4 h-4 text-emerald-600" />
                                    <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest">Balasan Admin</span>
                                </div>
                                <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/50">
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        {msg.reply}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {messages.length > 4 && (
                    <div className="mt-12 text-center">
                        <p className="text-slate-400 text-sm italic">
                            Menampilkan {messages.length} diskusi terbaru
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
