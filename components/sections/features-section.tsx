import Image from "next/image"
import type { SectionData } from "@/app/[[...slug]]/page"
import { urlFor } from "@/lib/sanity.image"
import { PortableTextRenderer } from "./portable-text-renderer"

export function FeaturesSection({ section }: { section: SectionData }) {
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
      {section.body && (
        <div className="mx-auto mt-8 max-w-3xl">
          <PortableTextRenderer value={section.body as unknown[]} />
        </div>
      )}
      {section.items && section.items.length > 0 && (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, i) => (
            <div key={item._key || i} className="flex flex-col items-start gap-4 rounded-lg border border-[var(--site-border,hsl(var(--border)))] p-6">
              {item.image && (
                <Image
                  src={urlFor(item.image).width(400).height(300).url()}
                  alt={item.title || ""}
                  width={400}
                  height={300}
                  className="w-full rounded-md object-cover"
                />
              )}
              {item.icon && (
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
              )}
              {item.title && (
                <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: "var(--font-heading, inherit)" }}
                >
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="text-sm leading-relaxed opacity-70">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
