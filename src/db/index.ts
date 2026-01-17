import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    throw new Error("❌ DATABASE_URL is missing. If you are deploying to Vercel, please add 'DATABASE_URL' to your Project Settings > Environment Variables.");
}

const sql = neon(dbUrl);
export const db = drizzle(sql, { schema });
