import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || "replace-with-project-id";
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "buweihao-portfolio",
  title: "buweihao Portfolio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
