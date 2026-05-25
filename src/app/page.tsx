'use client';
import { useState, useEffect } from "react";
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
  tags?: { name: string; slug: string }[];
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then((data) => setPosts(data as Post[]));
  }, []);

  return <HomeClient posts={posts} />;
}
