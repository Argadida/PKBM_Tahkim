
import { db } from "./src/lib/db";
import { user, account } from "./src/db/schema";
import { eq, and } from "drizzle-orm";
import * as bcrypt from "bcryptjs";

async function fixAdmin() {
    const email = "admin@pkbmmatsil.com";
    const password = "admin123";

    console.log("Checking admin user...");
    const [adminUser] = await db.select().from(user).where(eq(user.email, email));

    if (!adminUser) {
        console.log("Admin user not found, nothing to fix.");
        return;
    }

    console.log("Admin user found. ID:", adminUser.id);

    // Delete any existing accounts for this user to start fresh
    console.log("Cleaning up existing accounts...");
    await db.delete(account).where(eq(account.userId, adminUser.id));

    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date();

    console.log("Creating proper account entry...");
    await db.insert(account).values({
        id: crypto.randomUUID(), // Better Auth uses its own, but this should be fine
        accountId: adminUser.id, // MUST match userId for credential provider in Better Auth 1.x usually
        providerId: "credential",
        userId: adminUser.id,
        password: hashedPassword,
        createdAt: now,
        updatedAt: now,
    });

    // Set password to null in the user table to match Better Auth's behavior
    console.log("Updating user table...");
    await db.update(user)
        .set({
            password: null,
            emailVerified: true,
            updatedAt: now,
        })
        .where(eq(user.id, adminUser.id));

    console.log("✅ Admin account fixed!");
    console.log("Email: admin@pkbmmatsil.com");
    console.log("Password: admin123");
}

fixAdmin()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
