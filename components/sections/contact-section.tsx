import type { SectionData } from "@/app/[[...slug]]/page"
import { PortableTextRenderer } from "./portable-text-renderer"

export function ContactSection({ section }: { section: SectionData }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
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
        <div className="mt-8">
          <PortableTextRenderer value={section.body as unknown[]} />
        </div>
      )}
      {section.items && section.items.length > 0 && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {section.items.map((item, i) => (
            <div
              key={item._key || i}
              className="rounded-lg border border-[var(--site-border,var(--border))] p-6"
            >
              {item.icon && (
                <span className="text-xl" aria-hidden="true">{item.icon}</span>
              )}
              {item.title && (
                <h3
                  className="mt-2 text-base font-semibold"
                  style={{ fontFamily: "var(--font-heading, inherit)" }}
                >
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="mt-1 text-sm opacity-70">{item.description}</p>
              )}
              {item.link && (
                <a
                  href={item.link}
                  className="mt-2 inline-block text-sm font-medium underline-offset-4 hover:underline"
                  style={{ color: "var(--site-primary, var(--primary))" }}
                >
                  {item.value || item.link}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
