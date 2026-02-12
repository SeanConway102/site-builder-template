import Image from "next/image"
import type { SectionData } from "@/app/[[...slug]]/page"
import { urlFor } from "@/lib/sanity.image"

export function GallerySection({ section }: { section: SectionData }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {section.heading && (
        <div className="text-center">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{
              fontFamily: "var(--font-heading, inherit)",
              fontWeight: "var(--font-heading-weight, 700)",
            }}
          >
            {section.heading}
          </h2>
          {section.subheading && (
            <p className="mx-auto mt-4 max-w-2xl text-lg opacity-60">{section.subheading}</p>
          )}
        </div>
      )}
      {section.items && section.items.length > 0 && (
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, i) =>
            item.image ? (
              <div
                key={item._key || i}
                className="group relative overflow-hidden rounded-lg"
              >
                <Image
                  src={urlFor(item.image).width(600).height(600).url()}
                  alt={item.title || "Gallery image"}
                  width={600}
                  height={600}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {item.title && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                  </div>
                )}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  )
}
