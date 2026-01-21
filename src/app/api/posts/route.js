import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Post from "@/app/models/Post";

export async function GET() {
  await connectDB();
  const posts = await Post.find();
  return NextResponse.json(posts);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const post = await Post.create(body);
  return NextResponse.json(post);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Post.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
