import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure uploads directory exists
        const uploadDir = join(process.cwd(), "public", "uploads");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (err) {
            // Directory might already exist
        }

        // Create a unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = `${uniqueSuffix}-${file.name.replace(/\s+/g, "-")}`;
        const path = join(uploadDir, filename);

        await writeFile(path, buffer);

        const imageUrl = `/uploads/${filename}`;

        return NextResponse.json({ url: imageUrl });
    } catch (error: any) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "Error uploading file" },
            { status: 500 }
        );
    }
}
