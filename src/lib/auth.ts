import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "../db/schema";

export const auth = betterAuth({
    secret: "kjsd8734nmsdf834jfd734nmsdf", // Sementara hardcode untuk fix error undefined
    baseURL: process.env.BETTER_AUTH_URL || "https://pkbm-tahkim.vercel.app", // Fallback URL


    database: drizzleAdapter(db, {
        provider: "sqlite", // ⬅️ tetap OK walau pakai Turso
        schema,
    }),

    emailAndPassword: {
        enabled: true,
    },

});
