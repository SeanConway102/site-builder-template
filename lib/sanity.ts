import type { SanityClient } from "next-sanity"

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ""
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
export const apiVersion = "2024-01-01"

export const isSanityConfigured = Boolean(projectId)

let _client: SanityClient | null = null
let _previewClient: SanityClient | null = null

async function loadCreateClient() {
  const { createClient } = await import("next-sanity")
  return createClient
}

export async function getClient(preview = false): Promise<SanityClient> {
  if (!isSanityConfigured) {
    throw new Error(
      "Sanity is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID."
    )
  }

  const createClient = await loadCreateClient()

  if (preview) {
    if (!_previewClient) {
      _previewClient = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: process.env.SANITY_API_TOKEN,
        stega: { enabled: true, studioUrl: "/studio" },
      })
    }
    return _previewClient
  }

  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      stega: {
        enabled: process.env.NEXT_PUBLIC_SANITY_STEGA_ENABLED === "true",
        studioUrl: "/studio",
      },
    })
  }
  return _client
}

/**
 * Helper to fetch from Sanity — returns null when Sanity is not configured
 * so pages can fall back to placeholder content.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!isSanityConfigured) return null
  try {
    const c = await getClient()
    return await c.fetch<T>(query, params)
  } catch {
    return null
  }
}
