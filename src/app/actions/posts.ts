"use server";

import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth"; // We might need this to get current user
import { headers } from "next/headers";

// Helper to generate slug
function generateSlug(title: string) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

export async function getPosts() {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
}

export async function getPost(id: number) {
    const result = await db.select().from(posts).where(eq(posts.id, id));
    return result[0];
}

export async function getPostBySlug(slug: string) {
    const result = await db.select().from(posts).where(eq(posts.slug, slug));
    return result[0];
}

export async function createPost(data: { title: string; content: string; excerpt?: string; coverImage?: string; published?: boolean }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // Optional: Check if user is admin/logged in
    if (!session) {
        throw new Error("Unauthorized");
    }

    const slug = generateSlug(data.title);
    // TODO: Handle duplicate slugs (append -2, -3 etc) - For now assuming unique titles

    await db.insert(posts).values({
        title: data.title,
        slug: slug,
        content: data.content,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        published: data.published || false,
        authorId: session.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    revalidatePath("/admin");
    revalidatePath("/blog");
}

export async function updatePost(id: number, data: { title: string; content: string; excerpt?: string; coverImage?: string; published?: boolean }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    // Check if title changed to update slug? Maybe not to preserve URLs. 
    // Let's update slug if title changes for now, or keep it. Usually better to keep slug.
    // Let's just update content.

    await db.update(posts).set({
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        published: data.published,
        updatedAt: new Date(),
    }).where(eq(posts.id, id));

    revalidatePath("/admin");
    revalidatePath("/blog");
    // revalidatePath(`/blog/${slug}`); // If we had the slug
}

export async function deletePost(id: number) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    await db.delete(posts).where(eq(posts.id, id));

    revalidatePath("/admin");
    revalidatePath("/blog");
}
