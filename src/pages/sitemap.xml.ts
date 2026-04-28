import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const SITE_URL = "https://www.cantieri.ai";

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  alternates?: { hreflang: string; href: string }[];
}

function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export const GET: APIRoute = async () => {
  const today = toDateString(new Date());

  // --- Pagine statiche ---
  const staticPages: SitemapEntry[] = [
    {
      loc: `${SITE_URL}/`,
      lastmod: today,
      changefreq: "weekly",
      priority: "1.0",
      alternates: [
        { hreflang: "it", href: `${SITE_URL}/` },
        { hreflang: "en", href: `${SITE_URL}/en/` },
        { hreflang: "ar", href: `${SITE_URL}/ar/` },
        { hreflang: "x-default", href: `${SITE_URL}/` },
      ],
    },
    {
      loc: `${SITE_URL}/en/`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.9",
      alternates: [
        { hreflang: "it", href: `${SITE_URL}/` },
        { hreflang: "en", href: `${SITE_URL}/en/` },
        { hreflang: "ar", href: `${SITE_URL}/ar/` },
        { hreflang: "x-default", href: `${SITE_URL}/` },
      ],
    },
    {
      loc: `${SITE_URL}/ar/`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.9",
      alternates: [
        { hreflang: "it", href: `${SITE_URL}/` },
        { hreflang: "en", href: `${SITE_URL}/en/` },
        { hreflang: "ar", href: `${SITE_URL}/ar/` },
        { hreflang: "x-default", href: `${SITE_URL}/` },
      ],
    },
    {
      loc: `${SITE_URL}/contattaci/`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.8",
      alternates: [
        { hreflang: "it", href: `${SITE_URL}/contattaci/` },
        { hreflang: "en", href: `${SITE_URL}/en/contact/` },
        { hreflang: "ar", href: `${SITE_URL}/ar/contact/` },
        { hreflang: "x-default", href: `${SITE_URL}/contattaci/` },
      ],
    },
    {
      loc: `${SITE_URL}/en/contact/`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.7",
      alternates: [
        { hreflang: "it", href: `${SITE_URL}/contattaci/` },
        { hreflang: "en", href: `${SITE_URL}/en/contact/` },
        { hreflang: "ar", href: `${SITE_URL}/ar/contact/` },
        { hreflang: "x-default", href: `${SITE_URL}/contattaci/` },
      ],
    },
    {
      loc: `${SITE_URL}/ar/contact/`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.7",
      alternates: [
        { hreflang: "it", href: `${SITE_URL}/contattaci/` },
        { hreflang: "en", href: `${SITE_URL}/en/contact/` },
        { hreflang: "ar", href: `${SITE_URL}/ar/contact/` },
        { hreflang: "x-default", href: `${SITE_URL}/contattaci/` },
      ],
    },
  ];

  // --- Pagina indice blog ---
  const blogIndex: SitemapEntry = {
    loc: `${SITE_URL}/blog/`,
    lastmod: today,
    changefreq: "weekly",
    priority: "0.8",
  };

  // --- Articoli blog (dinamici) ---
  const posts = await getCollection("blog");
  const blogPosts: SitemapEntry[] = posts.map((post) => ({
    loc: `${SITE_URL}/blog/${post.id}/`,
    lastmod: toDateString(post.data.date),
    changefreq: "monthly",
    priority: "0.6",
  }));

  // --- Genera XML ---
  const allEntries = [...staticPages, blogIndex, ...blogPosts];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allEntries
  .map(
    (entry) => `
  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${
      entry.alternates
        ? entry.alternates
            .map(
              (alt) =>
                `\n    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`
            )
            .join("")
        : ""
    }
  </url>`
  )
  .join("")}
</urlset>`;

  return new Response(xml.trim(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
