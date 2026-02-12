import Link from "next/link"
import type { SectionData } from "@/app/[[...slug]]/page"

export function CtaSection({ section }: { section: SectionData }) {
  const ctaItem = section.items?.[0]

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
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
        <p className="mx-auto mt-4 max-w-2xl text-lg opacity-70">{section.subheading}</p>
      )}
      {ctaItem?.link && (
        <div className="mt-8">
          <Link
            href={ctaItem.link}
            className="inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            {ctaItem.title || "Get Started"}
          </Link>
        </div>
      )}
    </div>
  )
}
