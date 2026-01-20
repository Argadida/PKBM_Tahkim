import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Hanya tangani route sign-in dan sign-up
    if (!pathname.startsWith("/sign-in") && !pathname.startsWith("/sign-up")) {
        return NextResponse.next();
    }

    try {
        // Gunakan internal API dari Better Auth yang lebih akurat
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        const hasSession = !!session?.user;
        const userRole = (session?.user as any)?.role;
        const userEmail = session?.user?.email;

        // LOGGING UNTUK DEBUGGING (Cek di terminal server)
        console.log(`[Middleware Check] Path: ${pathname} | Email: ${userEmail} | Role: ${userRole}`);

        // 1. Redirect Halaman Sign-in (jika sudah login pental ke admin)
        if (pathname.startsWith("/sign-in") && hasSession) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }

        // 2. Proteksi Halaman Sign-up
        if (pathname.startsWith("/sign-up")) {
            // Jika belum login -> arahkan ke sign-in
            if (!hasSession) {
                return NextResponse.redirect(new URL("/sign-in", request.url));
            }

            // Jika sudah login (apapun role-nya), izinkan akses ke /sign-up
            return NextResponse.next();
        }

    } catch (err) {
        console.error("Middleware Error:", err);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/sign-up/:path*", "/sign-in/:path*"],
};
