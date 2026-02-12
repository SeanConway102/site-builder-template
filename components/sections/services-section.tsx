import Image from "next/image"
import Link from "next/link"
import type { SectionData } from "@/app/[[...slug]]/page"
import { urlFor } from "@/lib/sanity.image"

export function ServicesSection({ section }: { section: SectionData }) {
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
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, i) => (
            <div
              key={item._key || i}
              className="group flex flex-col overflow-hidden rounded-lg border border-[var(--border)] transition-shadow hover:shadow-lg"
            >
              {item.image && (
                <Image
                  src={urlFor(item.image).width(600).height(400).url()}
                  alt={item.title || ""}
                  width={600}
                  height={400}
                  className="aspect-[3/2] w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col gap-2 p-6">
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
                {item.link && (
                  <Link
                    href={item.link}
                    className="mt-auto pt-4 text-sm font-medium underline-offset-4 hover:underline"
                    style={{ color: "var(--primary)" }}
                  >
                    Learn more
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
