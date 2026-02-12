import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { projectId, dataset } from "./sanity"

let _builder: ReturnType<typeof imageUrlBuilder> | null = null

function getBuilder() {
  if (!_builder) {
    _builder = imageUrlBuilder({ projectId, dataset })
  }
  return _builder
}

export function urlFor(source: SanityImageSource) {
  return getBuilder().image(source)
}
