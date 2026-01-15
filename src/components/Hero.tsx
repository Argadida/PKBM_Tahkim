"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const backgroundImages = [
  "/hero_islamic_education_1768183350013.png",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2070&auto=format&fit=crop"
];

const SLIDE_DURATION = 2000; // maksimal 2 detik

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Sliding Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImages[currentImage]})` }}
          />
        </AnimatePresence>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Subtle Islamic Geometric Pattern Background (Overlayed on top of images but below text) */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="container relative z-10 px-4 md:px-6 lg:px-8 text-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-emerald-500/10 backdrop-blur-md text-emerald-400 text-sm font-medium mb-8 border border-emerald-500/20 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Berkarya Berbakti Dan Peduli</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-xl">
            Membangun Generasi <br />
            <span className="text-emerald-400 font-semibold">
              Rabbani & Qur'ani
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-100 mb-10 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
            Integrasi ilmu syar'i dan keterampilan modern untuk membentuk karakter yang beradab, cerdas, dan siap menghadapi masa depan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#programs"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
            >
              Lihat Program
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#contact"
              className="text-emerald-700 hover:text-emerald-800 px-6 py-3 rounded-xl hover:bg-emerald-50"
            >
              Hubungi Kami
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
