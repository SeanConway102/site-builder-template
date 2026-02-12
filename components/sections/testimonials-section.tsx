import Image from "next/image"
import type { SectionData } from "@/app/[[...slug]]/page"
import { urlFor } from "@/lib/sanity.image"

export function TestimonialsSection({ section }: { section: SectionData }) {
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
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, i) => (
            <blockquote
              key={item._key || i}
              className="flex flex-col gap-4 rounded-lg border border-[var(--site-border,hsl(var(--border)))] p-6"
            >
              {item.description && (
                <p className="flex-1 text-sm italic leading-relaxed opacity-80">
                  {`"${item.description}"`}
                </p>
              )}
              <div className="flex items-center gap-3">
                {item.image && (
                  <Image
                    src={urlFor(item.image).width(80).height(80).url()}
                    alt={item.title || ""}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                {item.title && (
                  <cite className="not-italic">
                    <span className="block text-sm font-semibold">{item.title}</span>
                    {item.value && (
                      <span className="block text-xs opacity-50">{item.value}</span>
                    )}
                  </cite>
                )}
              </div>
            </blockquote>
          ))}
        </div>
      )}
    </div>
  )
}
