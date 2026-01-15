"use client";

import { deletePost } from "@/app/actions/posts";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteButton({ id }: { id: number }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this post?")) {
            setIsDeleting(true);
            try {
                await deletePost(id);
                // router.refresh(); // revalidatePath in action handles this usually, but safe to do
            } catch (error) {
                alert("Failed to delete post");
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-900 disabled:opacity-50"
        >
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </button>
    );
}
