import type { SectionData } from "@/app/[[...slug]]/page"

export function StatsSection({ section }: { section: SectionData }) {
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
              {item.value && (
                <p
                  className="text-4xl font-bold"
                  style={{
                    fontFamily: "var(--font-heading, inherit)",
                    color: "var(--site-primary, hsl(var(--primary)))",
                  }}
                >
                  {item.value}
                </p>
              )}
              {item.title && (
                <p className="mt-2 text-sm font-medium opacity-80">{item.title}</p>
              )}
              {item.description && (
                <p className="mt-1 text-xs opacity-50">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
