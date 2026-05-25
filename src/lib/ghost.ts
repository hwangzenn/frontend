import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
  url: process.env.GHOST_URL || 'https://techblog.factorix.co.kr',
  key: process.env.GHOST_CONTENT_API_KEY || '08d53b1c612cacc19469ea7fea',
  version: "v5.0"
});

export async function getPosts() {
  return await api.posts
    .browse({
      limit: "all",
      include: ["tags", "authors"],
      // @ts-ignore: Next.js fetch cache option
      fetchOptions: { next: { revalidate: 60 } }
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