'use client';
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Loader2, Upload, X } from 'lucide-react';

export default function PostEditor({ post, mode = 'create' }: { post?: any, mode?: 'create' | 'edit' }) {
    const [title, setTitle] = useState(post?.title || '');
    const [slug, setSlug] = useState(post?.slug || '');
    const [content, setContent] = useState(post?.content || '');
    const [excerpt, setExcerpt] = useState(post?.excerpt || '');
    const [coverImage, setCoverImage] = useState(post?.coverImage || '');
    const [published, setPublished] = useState(post?.published || false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                setCoverImage(data.url);
            } else {
                alert(data.error || "Upload failed");
            }
        } catch (err) {
            alert("Upload failed");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const data = { title, slug, content, excerpt, coverImage, published, id: post?.id };
            let res;
            if (mode === 'create') {
                res = await fetch('/api/admin/posts', { method: 'POST', body: JSON.stringify(data) });
            } else {
                res = await fetch('/api/admin/posts', { method: 'PUT', body: JSON.stringify(data) });
            }

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to save');
            }
            router.push('/admin');
            router.refresh();
        } catch (e: any) {
            alert(e.message || 'Error saving post');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" value={title} onChange={e => {
                        setTitle(e.target.value);
                        if (mode === 'create') {
                            setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                        }
                    }} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                    <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                    <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    {!coverImage ? (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-gray-50 transition"
                        >
                            {isUploading ? <Loader2 className="animate-spin h-6 w-6 text-emerald-500 mb-2" /> : <Upload className="h-6 w-6 text-gray-400 mb-2" />}
                            <span className="text-sm text-gray-500">{isUploading ? 'Uploading...' : 'Import from Computer'}</span>
                        </button>
                    ) : (
                        <div className="relative rounded-lg overflow-hidden border border-gray-200">
                            <img src={coverImage} alt="Cover" className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center space-x-2">
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 bg-white rounded-full text-gray-700 hover:bg-emerald-500 hover:text-white transition">
                                    <Upload className="h-5 w-5" />
                                </button>
                                <button type="button" onClick={() => setCoverImage('')} className="p-2 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <label className="flex items-center space-x-2 cursor-pointer select-none">
                        <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary accent-emerald-500" />
                        <span className="text-gray-700 font-medium">Published</span>
                    </label>
                </div>
                <div data-color-mode="light">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <MDEditor
                            value={content}
                            onChange={(val) => setContent(val || '')}
                            height={500}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-100">
                <button onClick={handleSubmit} disabled={isLoading} className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-600 transition disabled:opacity-50 flex items-center">
                    {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                    {mode === 'create' ? 'Create Post' : 'Update Post'}
                </button>
            </div>
        </div>
    )
}
