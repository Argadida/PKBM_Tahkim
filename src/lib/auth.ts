import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "../db/schema";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET!,   // 🔴 WAJIB
    baseURL: process.env.BETTER_AUTH_URL!,     // ✅ DISARANKAN

    database: drizzleAdapter(db, {
        provider: "sqlite", // ⬅️ tetap OK walau pakai Turso
        schema,
    }),

    emailAndPassword: {
        enabled: true,
    },
});
