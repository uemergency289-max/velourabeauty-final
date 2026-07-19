import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { file } = await req.json();
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
    const result = await cloudinary.uploader.upload(file, { folder: "velourabeauty/products" });
    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    return NextResponse.json({ error: "Upload failed. Check Cloudinary env variables." }, { status: 500 });
  }
}
