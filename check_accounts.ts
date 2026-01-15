
import { db } from "./src/lib/db";
import { account } from "./src/db/schema";

async function main() {
    const accounts = await db.select().from(account);
    console.log(JSON.stringify(accounts, null, 2));
}

main().catch(console.error);
