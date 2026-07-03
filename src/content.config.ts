import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { aboutCollection } from "./types/pages/aboutCollection";
import { contactCollection } from "./types/pages/contactCollection";
import { ctaSectionCollection } from "./types/sections/ctaSectionCollection";
import { paymentCollection } from "./types/sections/paymentCollection";

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const worksCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/works" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(["视觉", "软件", "硬件"]),
    year: z.number(),
    cover: z.string(),
    featured: z.boolean().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  pages: pagesCollection,
  works: worksCollection,
  about: aboutCollection,
  contact: contactCollection,
  ctaSection: ctaSectionCollection,
  paymentSection: paymentCollection,
};
