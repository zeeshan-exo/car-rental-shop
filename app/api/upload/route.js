import { NextResponse } from "next/server";
import { uploads } from "@/utils/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("image");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const cloudinaryResults = await Promise.all(
      files.map((file) => uploads(file, "products"))
    );

    const failedUpload = cloudinaryResults.find(
      (result) => !result || !result.url
    );
    if (failedUpload) {
      return NextResponse.json(
        { error: "Cloudinary upload failed for one or more files" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Files uploaded successfully",
      uploads: cloudinaryResults.map((result) => ({
        cloudinaryUrl: result.url,
        cloudinaryId: result.public_id,
      })),
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file", details: error.message },
      { status: 500 }
    );
  }
}
