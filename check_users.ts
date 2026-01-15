
import { db } from "./src/lib/db";
import { user } from "./src/db/schema";

async function main() {
    const users = await db.select().from(user);
    console.log(JSON.stringify(users, null, 2));
}

main().catch(console.error);
