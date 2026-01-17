import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

let dbUrl = process.env.DATABASE_URL || "file:./data/sqlite.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;

// Handle local file logic manually to ensure path is correct and directory exists
if (dbUrl.startsWith("file:")) {
    const relativePath = dbUrl.replace("file:", "");
    // Resolve absolute path to avoid CWD issues
    // Note: We strip 'file:' first to get the path
    const absolutePath = path.resolve(process.cwd(), relativePath);
    const dbDir = path.dirname(absolutePath);

    if (!fs.existsSync(dbDir)) {
        try {
            fs.mkdirSync(dbDir, { recursive: true });
        } catch (e) {
            console.error("Failed to create database directory:", e);
        }
    }

    // Update dbUrl to use the absolute path, properly formatted for LibSQL
    dbUrl = `file:${absolutePath}`;
}

const client = createClient({
    url: dbUrl,
    authToken: authToken,
});

export const db = drizzle(client, { schema });
