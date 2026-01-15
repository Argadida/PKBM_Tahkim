import { getPostBySlug } from "@/app/actions/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post || !post.published) {
        // If logged in admin, maybe show draft? For now hide.
        // Actually, let's just 404 for public.
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                <article className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
                    <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-emerald-600 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Blog
                    </Link>

                    <header className="mb-10 text-center">
                        <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-4">
                            {post.createdAt && (
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(post.createdAt).toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                            )}
                            {/* Author could be added here if available in post join */}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                            {post.title}
                        </h1>
                        {post.coverImage && (
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-8">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </header>

                    <div className="markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
