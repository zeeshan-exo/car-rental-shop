import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
        return NextResponse.json({ message: "Missing secret key" }, { status: 500 });
    }

    const data = await req.json();
    const { token } = data;

    if (!token) {
        return NextResponse.json({ message: "Token not found" }, { status: 400 });
    }

    try {
        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const result = await response.json();

        if (result.success) {
            return NextResponse.json({ message: "Success" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Failed to verify" }, { status: 403 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
