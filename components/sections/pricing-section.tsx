import Link from "next/link"
import type { SectionData } from "@/app/[[...slug]]/page"

export function PricingSection({ section }: { section: SectionData }) {
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
            <div
              key={item._key || i}
              className="flex flex-col rounded-lg border border-[var(--site-border,hsl(var(--border)))] p-8"
            >
              {item.title && (
                <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: "var(--font-heading, inherit)" }}
                >
                  {item.title}
                </h3>
              )}
              {item.value && (
                <p
                  className="mt-4 text-4xl font-bold"
                  style={{
                    fontFamily: "var(--font-heading, inherit)",
                    color: "var(--site-primary, hsl(var(--primary)))",
                  }}
                >
                  {item.value}
                </p>
              )}
              {item.description && (
                <p className="mt-4 flex-1 text-sm leading-relaxed opacity-70">
                  {item.description}
                </p>
              )}
              {item.link && (
                <Link
                  href={item.link}
                  className="mt-6 inline-flex items-center justify-center rounded-md px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: "var(--site-primary, hsl(var(--primary)))",
                    color: "var(--site-background, hsl(var(--primary-foreground)))",
                  }}
                >
                  Choose Plan
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
