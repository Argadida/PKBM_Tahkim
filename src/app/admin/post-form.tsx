"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { createPost, updatePost } from "@/app/actions/posts";
import { Loader2, Save, ArrowLeft, Image as ImageIcon, Type, Link as LinkIcon, FileText, Upload, X } from "lucide-react";
import Link from "next/link";

interface PostFormProps {
    post?: {
        id: number;
        title: string;
        content: string;
        excerpt: string | null;
        coverImage: string | null;
        published: boolean | null;
    };
    isEditing?: boolean;
}

export default function PostForm({ post, isEditing = false }: PostFormProps) {
    const router = useRouter();
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState(post?.content || "");
    const [excerpt, setExcerpt] = useState(post?.excerpt || "");
    const [coverImage, setCoverImage] = useState(post?.coverImage || "");
    const [published, setPublished] = useState(post?.published || false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Simple validation
        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file");
            return;
        }

        if (file.size > 1 * 1024 * 1024) {
            setError("File size should be less than 1MB");
            return;
        }

        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Upload failed");
            }

            const data = await res.json();
            setCoverImage(data.url);
        } catch (err: any) {
            setError(err.message || "Failed to upload image");
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = {
                title,
                content,
                excerpt,
                coverImage,
                published,
            };

            if (isEditing && post) {
                await updatePost(post.id, data);
            } else {
                await createPost(data);
            }
            router.push("/admin");
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 bg-white border border-gray-200 rounded-full text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {isEditing ? "Edit Post" : "Create New Post"}
                        </h1>
                        <p className="text-sm text-slate-500">
                            {isEditing ? "Update your existing content" : "Share your thoughts with the world"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-4 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center px-3">
                        <input
                            id="published"
                            type="checkbox"
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer transition-colors"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                        />
                        <label htmlFor="published" className="ml-2 block text-sm font-medium text-slate-700 cursor-pointer select-none">
                            Publish immediately
                        </label>
                    </div>
                    <div className="h-6 w-px bg-gray-200 mx-1"></div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all transform active:scale-95"
                    >
                        {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        {isEditing ? "Update" : "Save"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                                Post Title
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Type className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border-2 border-slate-300 rounded-xl leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-lg shadow-sm"
                                    placeholder="Enter an engaging title..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2" data-color-mode="light">
                            <label className="block text-sm font-semibold text-slate-700">Content</label>
                            <div className="border-2 border-slate-300 rounded-xl overflow-hidden shadow-sm bg-white">
                                <MDEditor
                                    value={content}
                                    onChange={(val) => setContent(val || "")}
                                    height={500}
                                    preview="live"
                                    className="!border-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <h3 className="text-lg font-semibold text-slate-900 border-b border-gray-100 pb-2">Post Details</h3>

                        <div>
                            <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 mb-2">
                                Excerpt
                            </label>
                            <div className="relative">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <FileText className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea
                                    id="excerpt"
                                    rows={4}
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border-2 border-slate-300 rounded-xl leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all sm:text-sm resize-none shadow-sm"
                                    placeholder="Brief summary for list view..."
                                />
                            </div>
                            <p className="mt-2 text-xs text-gray-500 text-right">
                                {excerpt.length} characters
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Cover Image
                            </label>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                                id="cover-image-upload"
                            />

                            {!coverImage ? (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="w-full flex flex-col items-center justify-center px-6 py-10 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-emerald-400 transition-all group cursor-pointer"
                                >
                                    {uploading ? (
                                        <Loader2 className="h-10 w-10 text-emerald-500 animate-spin mb-3" />
                                    ) : (
                                        <Upload className="h-10 w-10 text-slate-400 group-hover:text-emerald-500 transition-colors mb-3" />
                                    )}
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-slate-900">
                                            {uploading ? "Uploading..." : "Click to upload image"}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            PNG, JPG or WEBP (Max 1MB)
                                        </p>
                                    </div>
                                </button>
                            ) : (
                                <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm group aspect-video">
                                    <img
                                        src={coverImage}
                                        alt="Cover"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-2 bg-white rounded-full text-slate-900 hover:bg-emerald-500 hover:text-white transition-colors shadow-lg"
                                            title="Change Image"
                                        >
                                            <Upload className="h-5 w-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setCoverImage("")}
                                            className="p-2 bg-white rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-colors shadow-lg"
                                            title="Remove Image"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                    {uploading && (
                                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
