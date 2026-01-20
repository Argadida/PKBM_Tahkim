
import { auth } from "./src/lib/auth";

async function testSignIn() {
    try {
        console.log("Attempting to get session...");
        // Mock a request or just check if auth object is valid
        console.log("Auth object initialized:", !!auth);

        // Try to fetch a user to see if DB is working through auth
        const user = await auth.api.getSession({
            headers: new Headers()
        });
        console.log("Session fetch successful:", user);
    } catch (error) {
        console.error("Error in auth logic:", error);
    }
}

testSignIn();
