import { NextResponse } from "next/server";
import { uploads } from "@/utils/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const cloudinaryResult = await uploads(file, "products");

    if (!cloudinaryResult || !cloudinaryResult.url) {
      return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      cloudinaryUrl: cloudinaryResult.url,
      cloudinaryId: cloudinaryResult.public_id,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file", details: error.message }, { status: 500 });
  }
}
