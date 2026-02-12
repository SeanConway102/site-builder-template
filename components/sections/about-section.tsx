import Image from "next/image"
import type { SectionData } from "@/app/[[...slug]]/page"
import { urlFor } from "@/lib/sanity.image"
import { PortableTextRenderer } from "./portable-text-renderer"

export function AboutSection({ section }: { section: SectionData }) {
  const hasImage = section.items?.[0]?.image

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className={`flex flex-col gap-12 ${hasImage ? "lg:flex-row lg:items-center" : ""}`}>
        {hasImage && (
          <div className="lg:w-1/2">
            <Image
              src={urlFor(section.items![0].image!).width(800).height(600).url()}
              alt={section.heading || "About"}
              width={800}
              height={600}
              className="rounded-lg object-cover"
            />
          </div>
        )}
        <div className={hasImage ? "lg:w-1/2" : "mx-auto max-w-3xl text-center"}>
          {section.heading && (
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{
                fontFamily: "var(--font-heading, inherit)",
                fontWeight: "var(--font-heading-weight, 700)",
              }}
            >
              {section.heading}
            </h2>
          )}
          {section.subheading && (
            <p className="mt-4 text-lg opacity-60">{section.subheading}</p>
          )}
          {section.body && (
            <div className="mt-6">
              <PortableTextRenderer value={section.body as unknown[]} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
