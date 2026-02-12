import { projectId, dataset } from "./sanity"

/**
 * Zero-dep Sanity image URL builder.
 * Replaces @sanity/image-url which has deep import issues in v0's build.
 */
export function urlFor(ref: { _ref?: string; asset?: { _ref?: string } }) {
  const assetRef = ref?._ref || ref?.asset?._ref
  if (!assetRef) return ""
  // Sanity asset ref format: image-{id}-{width}x{height}-{format}
  const [, id, dimensions, format] = assetRef.split("-")
  if (!id || !dimensions || !format) return ""
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}
