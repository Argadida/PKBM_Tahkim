import { db } from "../src/db";
import { user, account, session } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function deleteAdmin() {
    const email = "admin@pkbmmatsil.com";

    try {
        console.log("Deleting admin user:", email);

        // Find user
        const users = await db.select().from(user).where(eq(user.email, email));

        if (users.length === 0) {
            console.log("No user found with email:", email);
            return;
        }

        // Delete all accounts for this user email
        await db.delete(account).where(eq(account.accountId, email));
        console.log("Deleted account records by accountId");

        // Delete user
        await db.delete(user).where(eq(user.email, email));
        console.log("Deleted user record");

        console.log("✅ Admin records cleared successfully!");
    } catch (error) {
        console.error("❌ Error deleting admin user:", error);
        throw error;
    }
}

deleteAdmin()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
