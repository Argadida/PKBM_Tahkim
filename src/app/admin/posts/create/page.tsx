import PostForm from "../../post-form";

export default function CreatePostPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Post</h1>
            <PostForm />
        </div>
    );
}
