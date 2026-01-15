import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const BlogSection = async () => {
    // Fetch latest 3 published posts from database
    const latestPosts = await db
        .select()
        .from(posts)
        .where(eq(posts.published, true))
        .orderBy(desc(posts.createdAt))
        .limit(3);

    // If no posts, show placeholder
    if (latestPosts.length === 0) {
        return (
            <section className="py-20 md:py-24 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-4">
                                Kabar & Artikel Terbaru
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                Ikuti perkembangan terbaru, artikel pendidikan, dan dokumentasi kegiatan santri di PKBM Matsil.
                            </p>
                        </div>
                    </div>
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                        <p className="text-slate-500">Belum ada artikel yang dipublikasikan.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-4">
                            Kabar & Artikel Terbaru
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                            Ikuti perkembangan terbaru, artikel pendidikan, dan dokumentasi kegiatan santri di PKBM Matsil.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden md:inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                        Lihat Semua Artikel <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestPosts.map((post, index) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-slate-100 flex flex-col h-full"
                        >
                            <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                                <Image
                                    src={post.coverImage || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    unoptimized
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-2 hover:text-emerald-600 transition-colors">
                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                </h3>

                                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                    {post.excerpt || post.content.substring(0, 150) + '...'}
                                </p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm mt-auto"
                                >
                                    Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-10 text-center md:hidden">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                        Lihat Semua Artikel <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
