import PostForm from "../../../post-form";
import { getPost } from "@/app/actions/posts";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPost(parseInt(id));

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Post</h1>
            <PostForm post={post as any} isEditing={true} />
        </div>
    );
}
