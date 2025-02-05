import { NextResponse } from "next/server";
import { uploads } from "@/utils/cloudinary"; 

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;


    const cloudinaryResult = await uploads(base64File, "products");

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      cloudinaryUrl: cloudinaryResult.url,
      cloudinaryId: cloudinaryResult.public_id,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
