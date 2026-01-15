"use client";

import Link from "next/link";

export default function DashboardTabs({ activeTab, unreadCount = 0 }: { activeTab: string, unreadCount?: number }) {
    return (
        <div className="flex border-b border-slate-200">
            <Link
                href="/admin?tab=posts"
                className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${activeTab === "posts"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                    }`}
            >
                Posts
            </Link>
            <Link
                href="/admin?tab=messages"
                className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${activeTab === "messages"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                    }`}
            >
                Messages
                {unreadCount > 0 && (
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold rounded-full shadow-sm shadow-rose-200 animate-bounce">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </Link>
        </div>
    );
}
