"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, Trash2, Reply, Send, X, CheckCircle2, Clock, ChevronRight, User, Hash } from "lucide-react";
import { deleteMessage, replyToMessage } from "@/app/actions/contact";

interface Message {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    program: string | null;
    message: string;
    reply: string | null;
    status: string | null;
    createdAt: Date | null;
}

export default function MessagesList({ messages }: { messages: Message[] }) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [replyText, setReplyText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedMessage = messages.find(m => m.id === selectedId);

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
            await deleteMessage(id);
            if (selectedId === id) setSelectedId(null);
        }
    };

    const handleReply = async () => {
        if (!selectedId || !replyText.trim()) return;
        setIsSubmitting(true);
        try {
            await replyToMessage(selectedId, replyText);
            setReplyText("");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "-";
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    };

    const formatDateShort = (date: Date | null) => {
        if (!date) return "";
        const now = new Date();
        const msgDate = new Date(date);

        if (now.toDateString() === msgDate.toDateString()) {
            return msgDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        }
        return msgDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-100 flex flex-col md:flex-row h-[calc(100vh-250px)] min-h-[600px]">
            {/* List View (Gmail Style) */}
            <div className={`flex-1 flex flex-col border-r border-slate-100 ${selectedId ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-emerald-500" />
                        Kotak Masuk
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">
                        {messages.length} Total
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3 p-8">
                            <div className="p-4 bg-slate-50 rounded-full">
                                <Mail className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-sm font-medium">Beres! Tidak ada pesan baru.</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedId(msg.id)}
                                className={`group flex items-center gap-4 p-4 cursor-pointer transition-all hover:bg-emerald-50/30 relative ${selectedId === msg.id ? 'bg-emerald-50/50 border-l-4 border-emerald-500' : 'bg-white'}`}
                            >
                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${msg.status === 'pending' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200'}`}></div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h4 className={`text-sm truncate ${msg.status === 'pending' ? 'font-bold text-slate-900' : 'font-semibold text-slate-600'}`}>
                                            {msg.name}
                                        </h4>
                                        <span className="text-[10px] text-slate-400 font-medium shrink-0">
                                            {formatDateShort(msg.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate pr-8">
                                        {msg.message}
                                    </p>
                                </div>

                                <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => handleDelete(e, msg.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Detail View */}
            <div className={`md:w-3/5 lg:w-2/3 flex flex-col bg-white overflow-hidden ${selectedId ? 'flex' : 'hidden md:flex items-center justify-center bg-slate-50/30'}`}>
                {selectedMessage ? (
                    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                        {/* Detail Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="md:hidden p-2 text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="hidden sm:flex w-12 h-12 rounded-full bg-emerald-100 items-center justify-center text-emerald-600 font-bold text-xl uppercase">
                                    {selectedMessage.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 leading-none mb-1">{selectedMessage.name}</h2>
                                    <p className="text-xs text-slate-500 font-medium">Melalui Formulir Kontak • {formatDate(selectedMessage.createdAt)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => handleDelete(e, selectedMessage.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    title="Hapus Pesan"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Detail Info Bar */}
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                <span className="font-semibold">Email:</span>
                                <span className="truncate">{selectedMessage.email || "-"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                <span className="font-semibold">WhatsApp:</span>
                                {selectedMessage.phone ? (
                                    <a href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, "")}`} target="_blank" className="text-emerald-600 hover:underline">
                                        {selectedMessage.phone}
                                    </a>
                                ) : "-"}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <Hash className="w-3.5 h-3.5 text-slate-400" />
                                <span className="font-semibold">Program:</span>
                                <span className="bg-white px-2 py-0.5 rounded border border-slate-200">{selectedMessage.program || "-"}</span>
                            </div>
                        </div>

                        {/* Detail Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            <div className="prose prose-slate max-w-none">
                                <div className="text-slate-800 whitespace-pre-wrap leading-relaxed bg-white border border-slate-100 p-6 rounded-2xl shadow-sm italic">
                                    "{selectedMessage.message}"
                                </div>
                            </div>

                            {selectedMessage.reply && (
                                <div className="animate-in slide-in-from-top-4 duration-500">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">A</div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Balasan Admin</span>
                                        <div className="flex-1 h-[1px] bg-slate-100"></div>
                                    </div>
                                    <div className="bg-slate-800 text-slate-200 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Reply className="w-12 h-12" />
                                        </div>
                                        <p className="relative z-10 italic leading-relaxed">{selectedMessage.reply}</p>
                                    </div>
                                </div>
                            )}

                            {/* Reply Form */}
                            <div className="pt-8 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Reply className="w-4 h-4 text-emerald-500" />
                                    {selectedMessage.reply ? "Perbarui Catatan Balasan" : "Tulis Catatan Balasan"}
                                </h3>
                                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all shadow-sm">
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Tulis balasan atau catatan untuk pesan ini..."
                                        className="w-full p-4 text-sm text-slate-700 outline-none resize-none min-h-[120px]"
                                        onFocus={() => {
                                            if (!replyText && selectedMessage.reply) setReplyText(selectedMessage.reply);
                                        }}
                                    />
                                    <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                        <p className="text-[10px] text-slate-400 italic">Terakhir diperbarui: {formatDate(selectedMessage.createdAt)}</p>
                                        <button
                                            onClick={handleReply}
                                            disabled={isSubmitting || !replyText.trim()}
                                            className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center gap-2"
                                        >
                                            {isSubmitting ? "Menyimpan..." : "Simpan Balasan"}
                                            <Send className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
                                    <div className="p-1 bg-white rounded-md border border-amber-200 shrink-0">
                                        <Hash className="w-3 h-3 text-amber-600" />
                                    </div>
                                    <p className="text-[10px] text-amber-800/80 font-medium">
                                        Catatan balasan ini hanya terlihat oleh admin. Untuk menghubungi pengunjung, gunakan nomor WhatsApp di atas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 text-slate-300 p-12 text-center">
                        <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center">
                            <Mail className="w-8 h-8 opacity-20" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-400">Pilih pesan untuk melihat detail</p>
                            <p className="text-xs text-slate-300 mt-1">Gunakan panel kiri untuk menavigasi pesan masuk.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
