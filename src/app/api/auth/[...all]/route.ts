export const runtime = "nodejs";
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";
import { appendFileSync } from "fs";

const handler = toNextJsHandler(auth);

export const GET = async (req: Request) => {
    try {
        return await handler.GET(req);
    } catch (err: any) {
        appendFileSync("auth_error.log", `[${new Date().toISOString()}] GET Error: ${err.message}\n${err.stack}\n`);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        return await handler.POST(req);
    } catch (err: any) {
        appendFileSync("auth_error.log", `[${new Date().toISOString()}] POST Error: ${err.message}\n${err.stack}\n`);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
};

