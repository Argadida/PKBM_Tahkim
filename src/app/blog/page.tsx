import { getPosts } from "@/app/actions/posts";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Calendar, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
    const posts = await getPosts();
    const publishedPosts = posts.filter(p => p.published);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Artikel & Blog
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Informasi terbaru, artikel inspiratif, dan kabar kegiatan dari PKBM Matsil.
                        </p>
                    </div>

                    {publishedPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {publishedPosts.map((post) => (
                                <article key={post.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden h-full">
                                    <Link href={`/blog/${post.slug}`} className="block overflow-hidden h-48 bg-slate-100 relative">
                                        {post.coverImage ? (
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-300">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 001.414-2.828L5.414 5.414a2 2 0 00-2.828 2.828L5.414 11.414a2 2 0 002.828 2.828L17.414 20.586a2 2 0 002.828-2.828L15.586 16.586a2 2 0 00-2.828-1.414L9 19.586a2 2 0 00-1.414 2.828L9.586 21.586"></path></svg>
                                            </div>
                                        )}
                                    </Link>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                            {post.createdAt && (
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(post.createdAt).toLocaleDateString("id-ID", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                        <Link href={`/blog/${post.slug}`} className="block mb-3">
                                            <h2 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>
                                        </Link>
                                        <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow">
                                            {post.excerpt || post.content.substring(0, 150) + "..."}
                                        </p>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                                        >
                                            Baca Selengkapnya
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl">
                            <h3 className="text-xl font-medium text-slate-900 mb-2">Belum ada artikel</h3>
                            <p className="text-slate-500">Nantikan artikel-artikel menarik dan bermanfaat dari kami.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
