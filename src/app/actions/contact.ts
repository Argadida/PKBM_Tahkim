"use server";

import { db } from "@/db";
import { messages } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";

export async function submitContactForm(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const program = formData.get("program") as string;
    const message = formData.get("message") as string;

    if (!name || !message) {
        return { error: "Nama dan pesan harus diisi" };
    }

    try {
        await db.insert(messages).values({
            name,
            email,
            phone,
            program,
            message,
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return { error: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti." };
    }
}

export async function getMessages() {
    try {
        const result = await db.select().from(messages).orderBy(messages.createdAt);
        return result.reverse(); // Newest first
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
}

export async function replyToMessage(id: number, reply: string) {
    try {
        await db.update(messages)
            .set({
                reply,
                status: "replied"
            })
            .where(eq(messages.id, id));

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error replying to message:", error);
        return { error: "Gagal membalas pesan" };
    }
}

export async function deleteMessage(id: number) {
    try {
        await db.delete(messages).where(eq(messages.id, id));
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error deleting message:", error);
        return { error: "Gagal menghapus pesan" };
    }
}

export async function getPendingMessagesCount() {
    try {
        const result = await db.select({ count: sql<number>`count(*)` })
            .from(messages)
            .where(eq(messages.status, "pending"));
        return result[0]?.count || 0;
    } catch (error) {
        console.error("Error fetching pending count:", error);
        return 0;
    }
}

export async function getPublicMessages() {
    try {
        const result = await db.select()
            .from(messages)
            .where(sql`${messages.status} = 'replied' AND ${messages.reply} IS NOT NULL`)
            .orderBy(messages.createdAt);
        return result.reverse().slice(0, 6); // Newest 6
    } catch (error) {
        console.error("Error fetching public messages:", error);
        return [];
    }
}
