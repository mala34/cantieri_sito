import { getCollection } from "astro:content";

type Post = Awaited<ReturnType<typeof getCollection<"blog">>>[number];

function sortPosts(a: Post, b: Post): number {
  return b.data.date.getTime() - a.data.date.getTime();
}

export async function getBlogPosts() {
  const posts = await getCollection("blog");
  return posts.sort(sortPosts);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
