"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await submitContactForm(formData);
            if (result.success) {
                setIsSuccess(true);
                // Reset success state after 5 seconds
                setTimeout(() => setIsSuccess(false), 5000);
            } else if (result.error) {
                setError(result.error);
            }
        } catch (err) {
            setError("Gagal mengirim pesan. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="contact" className="py-20 md:py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left Side: Info */}
                    <div className="lg:w-5/12 space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-3xl font-bold text-slate-900 mb-4">
                                Ada Pertanyaan? <br/> Jangan ragu untuk menghubungi kami.
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Mulai langkah awal membangun generasi Rabbani. Hubungi kami atau isi formulir untuk pendaftaran dan informasi lebih lanjut.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-50 rounded-xl">
                                    <MapPin className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-800 mb-1">Lokasi</h4>
                                    <p className="text-slate-600 text-sm">Pondok Pesantren Tahkimussunnah Al-islamy, W7HH+2X, Nunggal Rejo, Kec. Punggur, Kabupaten Lampung Tengah, Lampung 34152</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-50 rounded-xl">
                                    <Phone className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-800 mb-1">WhatsApp</h4>
                                    <p className="text-slate-600 text-sm">081367286280</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-50 rounded-xl">
                                    <Mail className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-800 mb-1">Email</h4>
                                    <p className="text-slate-600 text-sm">pkbm.matsilpunggur@gmail.om</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:w-7/12 w-full">
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 flex flex-col items-center text-center space-y-4"
                                >
                                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Pesan Terkirim!</h3>
                                    <p className="text-slate-600 max-w-sm">
                                        Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda melalui WhatsApp atau Email.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="mt-4 text-emerald-600 font-medium hover:underline"
                                    >
                                        Kirim pesan lagi
                                    </button>
                                </motion.div>
                            ) : (
                                <form action={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-slate-700">Nama Lengkap</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                placeholder="Nama Anda"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-slate-700">Alamat Email (Opsional)</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="email@contoh.com"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-400"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label htmlFor="phone" className="text-sm font-medium text-slate-700">Nomor WhatsApp</label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                required
                                                placeholder="08xxxxxxxxxx"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="program" className="text-sm font-medium text-slate-700">Program yang Diminati</label>
                                        <select
                                            id="program"
                                            name="program"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all bg-white"
                                        >
                                            <option value="" disabled selected>Pilih Program</option>
                                            <option value="PAUD">PAUD (3-6 Tahun)</option>
                                            <option value="Paket C">Paket C (Setara SMA)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-slate-700">Pesan / Pertanyaan</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            required
                                            placeholder="Tulis pesan Anda..."
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all resize-none placeholder:text-slate-400"
                                        ></textarea>
                                    </div>

                                    {error && (
                                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Send className="w-4 h-4" />
                                        )}
                                        <span>{isSubmitting ? "Mengirim..." : "Kirim Pesan"}</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;

