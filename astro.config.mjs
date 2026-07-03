import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import gtm from "astro-gtm-lite";
import { defineConfig } from "astro/config";
import { readFileSync } from "node:fs";

const config = JSON.parse(readFileSync(new URL("./src/config/config.json", import.meta.url), "utf-8"));
const sanityProjectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.PUBLIC_SANITY_DATASET || "production";
const sanityApiVersion = process.env.PUBLIC_SANITY_API_VERSION || "2026-07-03";
const sanityIntegration = sanityProjectId
  ? [
      sanity({
        projectId: sanityProjectId,
        dataset: sanityDataset,
        apiVersion: sanityApiVersion,
        useCdn: false,
        studioBasePath: "/admin",
        studioRouterHistory: "hash",
      }),
    ]
  : [];

export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  output: "static",
  vite: { plugins: [tailwindcss()] },
  integrations: [
    ...sanityIntegration,
    react(),
    sitemap(),
    mdx(),
    gtm({
      enable: config.google_tag_manager.enable,
      id: config.google_tag_manager.gtm_id,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
