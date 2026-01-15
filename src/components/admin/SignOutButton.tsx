'use client';
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();
    return (
        <button
            onClick={async () => {
                await authClient.signOut();
                router.push('/admin/login');
            }}
            className="w-full bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition flex items-center justify-center font-medium duration-200"
        >
            Sign Out
        </button>
    )
}
