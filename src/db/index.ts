import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

// Ensure the database directory exists
const dbPath = process.env.DATABASE_URL || "sqlite.db";
const dbDir = path.dirname(path.resolve(dbPath));

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const sqlite = new Database(dbPath);

export const db = drizzle(sqlite, { schema });
