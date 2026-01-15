import { getPosts } from "@/app/actions/posts";
import { getMessages } from "@/app/actions/contact";
import Link from "next/link";
import { Plus, Pencil, ExternalLink, FileText } from "lucide-react";
import { DeleteButton } from "./delete-button";
import DashboardTabs from "@/components/admin/DashboardTabs";
import MessagesList from "@/components/admin/MessagesList";

export default async function AdminDashboard({
    searchParams,
}: {
    searchParams: Promise<{ tab?: string }>;
}) {
    const { tab = "posts" } = await searchParams;
    const posts = await getPosts();
    const messages = await getMessages();
    const unreadCount = messages.filter(m => m.status === "pending").length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Admin</h1>
                    <p className="text-slate-500 mt-1">Kelola konten blog dan pesan pengunjung di satu tempat.</p>
                </div>

                {tab === "posts" && (
                    <Link
                        href="/admin/posts/create"
                        className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent rounded-xl shadow-lg shadow-emerald-100 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                        <Plus className="h-4 w-4 mr-2 stroke-[3]" />
                        Tambah Post Baru
                    </Link>
                )}
            </div>

            <DashboardTabs activeTab={tab} unreadCount={unreadCount} />

            {tab === "posts" ? (
                <div className="bg-white shadow-xl shadow-gray-100 rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-emerald-500" />
                            Daftar Artikel
                        </h3>
                        <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shadow-sm">
                            {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50/30">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        Judul & Slug
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        Tanggal
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-emerald-50/30 transition-colors group">
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{post.title}</div>
                                            <div className="text-xs text-gray-400 mt-1 font-medium">{post.slug}</div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-[10px] leading-5 font-bold uppercase tracking-wider rounded-full ${post.published
                                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                                : 'bg-amber-100 text-amber-700 border border-amber-200'
                                                }`}>
                                                {post.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">
                                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString("id-ID", {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            }) : '-'}
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    className="text-gray-400 hover:text-emerald-600 transition-all p-2 hover:bg-emerald-50 rounded-xl"
                                                    title="Lihat Live"
                                                >
                                                    <ExternalLink className="h-4.5 w-4.5" />
                                                </Link>
                                                <Link
                                                    href={`/admin/posts/edit/${post.id}`}
                                                    className="text-gray-400 hover:text-indigo-600 transition-all p-2 hover:bg-indigo-50 rounded-xl"
                                                    title="Edit"
                                                >
                                                    <Pencil className="h-4.5 w-4.5" />
                                                </Link>
                                                <DeleteButton id={post.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {posts.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-20 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <div className="p-4 bg-gray-50 rounded-2xl">
                                                    <FileText className="w-8 h-8 text-gray-300" />
                                                </div>
                                                <p className="font-medium text-gray-400">Belum ada artikel. Mulai menulis sekarang!</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <MessagesList messages={messages} />
            )}
        </div>
    );
}
