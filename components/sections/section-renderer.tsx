import type { SectionData } from "@/app/[[...slug]]/page"
import { FeaturesSection } from "./features-section"
import { ServicesSection } from "./services-section"
import { AboutSection } from "./about-section"
import { TestimonialsSection } from "./testimonials-section"
import { FaqSection } from "./faq-section"
import { CtaSection } from "./cta-section"
import { StatsSection } from "./stats-section"
import { TeamSection } from "./team-section"
import { ProcessSection } from "./process-section"
import { PricingSection } from "./pricing-section"
import { ContactSection } from "./contact-section"
import { GallerySection } from "./gallery-section"
import { BlogSection } from "./blog-section"

const sectionComponents: Record<string, React.ComponentType<{ section: SectionData }>> = {
  features: FeaturesSection,
  services: ServicesSection,
  about: AboutSection,
  testimonials: TestimonialsSection,
  faq: FaqSection,
  cta: CtaSection,
  stats: StatsSection,
  team: TeamSection,
  process: ProcessSection,
  pricing: PricingSection,
  contact: ContactSection,
  gallery: GallerySection,
  blog: BlogSection,
}

function getBackgroundStyles(variant?: string): React.CSSProperties {
  switch (variant) {
    case "muted":
      return { backgroundColor: "var(--site-muted, var(--muted))" }
    case "primary":
      return {
        backgroundColor: "var(--site-primary, var(--primary))",
        color: "#ffffff",
      }
    case "dark":
      return {
        backgroundColor: "hsl(0 0% 8%)",
        color: "#ffffff",
      }
    default:
      return {}
  }
}

export function SectionRenderer({ section }: { section: SectionData }) {
  const Component = section.sectionType ? sectionComponents[section.sectionType] : null

  if (!Component) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm opacity-50">
          Unknown section type: {section.sectionType || "none"}
        </p>
      </section>
    )
  }

  return (
    <section
      id={section.sectionId || undefined}
      style={getBackgroundStyles(section.backgroundVariant)}
    >
      <Component section={section} />
    </section>
  )
}
