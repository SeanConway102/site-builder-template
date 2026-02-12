import Link from "next/link"
import { urlFor } from "@/lib/sanity.image"

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: unknown
}

export function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  backgroundImage,
}: HeroSectionProps) {
  const bgUrl = backgroundImage
    ? urlFor(backgroundImage).width(1920).height(800).url()
    : null

  return (
    <section
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-4 py-24 text-center"
      style={
        bgUrl
          ? {
              backgroundImage: `url(${bgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {bgUrl && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 mx-auto max-w-4xl">
        {headline && (
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-heading, inherit)",
              fontWeight: "var(--font-heading-weight, 700)",
              color: bgUrl
                ? "#ffffff"
                : "var(--site-foreground, hsl(var(--foreground)))",
            }}
          >
            {headline}
          </h1>
        )}
        {subheadline && (
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl"
            style={{
              color: bgUrl
                ? "rgba(255,255,255,0.85)"
                : "var(--site-foreground, hsl(var(--foreground)))",
              opacity: bgUrl ? 1 : 0.7,
            }}
          >
            {subheadline}
          </p>
        )}
        {ctaText && ctaLink && (
          <div className="mt-10">
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--site-primary, hsl(var(--primary)))",
                color: bgUrl ? "#ffffff" : "var(--site-background, hsl(var(--primary-foreground)))",
              }}
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
