"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, LayoutDashboard, FileText, LogOut, Plus, MessageSquare, UserPlus } from "lucide-react";
import Link from "next/link";
import { getPendingMessagesCount } from "@/app/actions/contact";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/sign-in");
        }
    }, [session, isPending, router]);

    useEffect(() => {
        const fetchUnreadCount = async () => {
            const count = await getPendingMessagesCount();
            setUnreadCount(count);
        };
        if (session) {
            fetchUnreadCount();
        }
    }, [session]);

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    };

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-emerald-600" />
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold text-emerald-600">Admin Panel</h1>
                    <p className="text-xs text-gray-400 mt-1">PKBM Matsil</p>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                        <LayoutDashboard className="h-5 w-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin?tab=posts"
                        className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                        <FileText className="h-5 w-5 mr-3" />
                        Daftar Artikel
                    </Link>
                    <Link
                        href="/admin?tab=messages"
                        className="flex items-center justify-between px-4 py-2 text-gray-600 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                        <div className="flex items-center">
                            <MessageSquare className="h-5 w-5 mr-3" />
                            Pesan Masuk
                        </div>
                        {unreadCount > 0 && (
                            <span className="flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] shadow-sm animate-pulse">
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                        )}
                    </Link>
                    <Link
                        href="/blog"
                        target="_blank"
                        className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                        <FileText className="h-5 w-5 mr-3" />
                        Live Blog
                    </Link>
                    <Link
                        href="/sign-up"
                        className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                        <UserPlus className="h-5 w-5 mr-3" />
                        Tambah Admin
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center mb-4 px-4">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                            {session.user.name?.charAt(0) || "A"}
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-medium text-gray-700 truncate">{session.user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                {children}
            </main>
        </div>
    );
}
