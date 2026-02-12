import type { SectionData } from "@/app/[[...slug]]/page"

export function ProcessSection({ section }: { section: SectionData }) {
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
        <div className="mt-12 flex flex-col gap-12">
          {section.items.map((item, i) => (
            <div
              key={item._key || i}
              className="flex items-start gap-6"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                {i + 1}
              </div>
              <div>
                {item.title && (
                  <h3
                    className="text-lg font-semibold"
                    style={{ fontFamily: "var(--font-heading, inherit)" }}
                  >
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="mt-1 text-sm leading-relaxed opacity-70">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
