import { getPosts } from "@/lib/ghost";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json({
    count: posts.length,
    ghost_url: process.env.GHOST_URL || '(fallback used)',
    posts: (posts as any[]).slice(0, 3).map((p: any) => ({
      title: p.title,
      tags: p.tags?.map((t: any) => ({ name: t.name, slug: t.slug })),
    })),
  });
}
