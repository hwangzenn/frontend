import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
  url: process.env.GHOST_URL || 'http://localhost:2368',
  key: process.env.GHOST_CONTENT_API_KEY || '622f36b71fac841c02bd0ceaf6',
  version: "v5.0"
});

export async function getPosts() {
  return await api.posts
    .browse({
      limit: "all",
      include: ["tags", "authors"],
      // @ts-ignore: Next.js fetch cache option, not in Ghost types
      fetchOptions: { next: { revalidate: 0 } }
    })
    .catch(err => {
      console.error(err);
      return [];
    });
}

export async function getSinglePost(postSlug: string) {
  return await api.posts
    .read(
      { slug: postSlug },
      { formats: ["html"] }
    )
    .catch(err => {
      console.error(err);
      return null;
    });
}