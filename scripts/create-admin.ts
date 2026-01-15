import { db } from "../src/db";
import { user, account, session, posts } from "../src/db/schema";
import { auth } from "../src/lib/auth";
import { eq } from "drizzle-orm";

async function createAdmin() {
    const email = "admin@pkbmmatsil.com";
    const password = "admin123";
    const name = "Admin PKBM";

    try {
        console.log("Checking if admin user already exists...");

        // Check if user already exists
        const existingUser = await db.query.user.findFirst({
            where: eq(user.email, email)
        });

        if (existingUser) {
            console.log("Existing admin found. Preparing to recreate with correct hashing...");

            // 1. Delete sessions and accounts which are definitely tied to auth
            await db.delete(session).where(eq(session.userId, existingUser.id));
            await db.delete(account).where(eq(account.userId, existingUser.id));

            // 2. Temporarily rename old user so we can sign up with same email
            const tempEmail = `old_${Date.now()}_${email}`;
            await db.update(user).set({ email: tempEmail }).where(eq(user.id, existingUser.id));
            console.log("Old user renamed temporarily to avoid conflict.");
        }

        console.log("Creating admin user using Better Auth API...");

        // 3. Use Better Auth API to sign up
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            }
        });

        if (!result) {
            throw new Error("Failed to create user through Better Auth API");
        }

        const newUser = await db.query.user.findFirst({
            where: eq(user.email, email)
        });

        if (!newUser) throw new Error("New user not found after creation");

        // 4. Transfer posts from old user to new user if old user existed
        if (existingUser) {
            console.log("Transferring posts from old admin to new admin...");
            await db.update(posts)
                .set({ authorId: newUser.id })
                .where(eq(posts.authorId, existingUser.id));

            // 5. Delete the old user record
            await db.delete(user).where(eq(user.id, existingUser.id));
            console.log("Old user record cleaned up.");
        }

        // Mark the email as verified manually
        console.log("Marking email as verified...");
        await db.update(user)
            .set({ emailVerified: true })
            .where(eq(user.id, newUser.id));

        console.log("\n✅ Admin user created/re-aligned successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📧 Email:", email);
        console.log("🔑 Password:", password);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\n⚠️  Please change the password after first login!");
    } catch (error) {
        console.error("\n❌ Error creating admin user:", error);
        process.exit(1);
    }
}

createAdmin()
    .then(() => {
        console.log("Script completed.");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Script failed:", err);
        process.exit(1);
    });
