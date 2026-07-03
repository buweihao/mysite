import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

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

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

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

export interface SiteSettings {
  title?: string;
  description?: string;
  heroTitle?: string;
  heroDescription?: string;
  contactIntro?: string;
  email?: string;
  socialUrl?: string;
}

export function urlFor(source: unknown) {
  return builder && source ? builder.image(source) : null;
}

export async function getSanitySettings(): Promise<SiteSettings | null> {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch<SiteSettings | null>(`
    *[_type == "siteSettings" && _id == "siteSettings"][0] {
      title,
      description,
      heroTitle,
      heroDescription,
      contactIntro,
      email,
      socialUrl
    }
  `);
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
      "tags": coalesce(tags, []),
      "body": coalesce(body, [])
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
        "tags": coalesce(tags, []),
        "body": coalesce(body, [])
      }
    `,
    { slug },
  );
}
