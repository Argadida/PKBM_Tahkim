import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "../db/schema";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "https://pkbm-tahkim.vercel.app", // Fallback URL
    trustedOrigins: [
        "https://pkbm-tahkim.vercel.app",
        "https://pkbm-matsil.vercel.app",
        "http://localhost:3000",
        ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ],


    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),

    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
            },
        },
    },
});
