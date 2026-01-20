import { db } from "./src/lib/db";
import { user, account } from "./src/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";

async function fixAdmin() {
    const email = "admin@pkbmmatsil.com";
    const plainPassword = "admin123";

    console.log("Checking admin user...");
    const [adminUser] = await db.select().from(user).where(eq(user.email, email));

    if (!adminUser) {
        console.log("Admin user not found, nothing to fix.");
        return;
    }

    console.log("Admin user found. ID:", adminUser.id);

    // Delete existing accounts for this user
    console.log("Cleaning up existing accounts...");
    await db.delete(account).where(eq(account.userId, adminUser.id));

    // Better Auth uses scrypt by default (hash:salt format often)
    const hashedPassword = await hashPassword(plainPassword);
    const now = new Date();

    console.log("Creating proper account entry using Better Auth hash...");
    await db.insert(account).values({
        id: crypto.randomUUID(),
        accountId: adminUser.id,
        providerId: "credential",
        userId: adminUser.id,
        password: hashedPassword,
        createdAt: now,
        updatedAt: now,
    });

    console.log("Updating user table...");
    await db.update(user)
        .set({
            password: null,
            emailVerified: true,
            role: "admin",
            updatedAt: now,
        })
        .where(eq(user.id, adminUser.id));

    console.log("✅ Admin account fixed with compatible hash!");
    console.log("Email: admin@pkbmmatsil.com");
    console.log("Password: admin123");
}

fixAdmin()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
