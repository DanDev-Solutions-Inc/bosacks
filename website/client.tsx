import { createClient } from "@sanity/client";

console.log(process.env)

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2022-01-12",
  useCdn: false,
});
