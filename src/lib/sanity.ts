import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || "2026-07-03";

export const isSanityConfigured = Boolean(projectId && dataset);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export interface PortfolioWork {
  slug: string;
  title: string;
  description: string;
  category: "视觉" | "软件" | "硬件";
  year: number;
  cover: string;
  featured?: boolean;
  tags: string[];
  body?: unknown[];
}

export function urlFor(source: unknown) {
  return builder && source ? builder.image(source) : null;
}

export async function getSanityWorks(): Promise<PortfolioWork[]> {
  if (!sanityClient) {
    return [];
  }

  return sanityClient.fetch<PortfolioWork[]>(`
    *[_type == "work"] | order(year desc, _createdAt desc) {
      "slug": slug.current,
      title,
      description,
      category,
      year,
      "cover": coalesce(cover.asset->url, "/images/image-placeholder.png"),
      featured,
      tags,
      body
    }
  `);
}

export async function getSanityWork(slug: string): Promise<PortfolioWork | null> {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch<PortfolioWork | null>(
    `
      *[_type == "work" && slug.current == $slug][0] {
        "slug": slug.current,
        title,
        description,
        category,
        year,
        "cover": coalesce(cover.asset->url, "/images/image-placeholder.png"),
        featured,
        tags,
        body
      }
    `,
    { slug },
  );
}
