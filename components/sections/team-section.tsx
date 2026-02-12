import Image from "next/image"
import type { SectionData } from "@/app/[[...slug]]/page"
import { urlFor } from "@/lib/sanity.image"

export function TeamSection({ section }: { section: SectionData }) {
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
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {section.items.map((item, i) => (
            <div key={item._key || i} className="text-center">
              {item.image && (
                <Image
                  src={urlFor(item.image).width(400).height(400).url()}
                  alt={item.title || ""}
                  width={200}
                  height={200}
                  className="mx-auto h-40 w-40 rounded-full object-cover"
                />
              )}
              {item.title && (
                <h3
                  className="mt-4 text-base font-semibold"
                  style={{ fontFamily: "var(--font-heading, inherit)" }}
                >
                  {item.title}
                </h3>
              )}
              {item.value && (
                <p className="text-sm opacity-60">{item.value}</p>
              )}
              {item.description && (
                <p className="mt-2 text-sm leading-relaxed opacity-70">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
