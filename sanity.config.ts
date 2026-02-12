"use client"

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { presentationTool } from "sanity/presentation"
import { schemaTypes } from "./schemas"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ""
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

const config = projectId
  ? defineConfig({
      name: "default",
      title: "Site Builder",
      projectId,
      dataset,
      plugins: [
        structureTool(),
        presentationTool({
          previewUrl: {
            draftMode: {
              enable: "/api/draft",
            },
          },
        }),
      ],
      schema: {
        types: schemaTypes,
      },
    })
  : defineConfig({
      name: "default",
      title: "Site Builder (Not Configured)",
      projectId: "placeholder",
      dataset: "production",
      schema: {
        types: schemaTypes,
      },
    })

export default config
