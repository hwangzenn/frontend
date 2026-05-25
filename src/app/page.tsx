export const dynamic = 'force-dynamic';
import { getPosts } from "@/lib/ghost";
import HomeClient from "./components/HomeClient";

interface Post {
  id: string;
  title: string;
  excerpt?: string;
  custom_excerpt?: string;
  feature_image?: string | null;
  published_at?: string | null;
  slug: string;
}

export default async function HomePage() {
  const posts = (await getPosts()) as Post[];
  return <HomeClient posts={posts} />;
}
