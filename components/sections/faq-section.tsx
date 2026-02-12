import type { SectionData } from "@/app/[[...slug]]/page"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqSection({ section }: { section: SectionData }) {
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
      {section.items && section.items.length > 0 && (
        <Accordion type="single" collapsible className="mt-12 w-full">
          {section.items.map((item, i) => (
            <AccordionItem key={item._key || i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed opacity-70">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
