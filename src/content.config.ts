import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().nullish(),
    date: z.coerce.date(),
    categoria: z.string(),
    image: z.string().nullish(),
    author: z.string().nullish(),
  }),
});

export const collections = { blog };
