import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { sanityFetch, isSanityConfigured } from "@/lib/sanity"
import { pageBySlugQuery, homepageQuery, allPagesQuery } from "@/lib/queries"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionRenderer } from "@/components/sections/section-renderer"

interface PageData {
  _id: string
  title: string
  slug: { current: string }
  pageType?: string
  hero?: {
    headline?: string
    subheadline?: string
    ctaText?: string
    ctaLink?: string
    backgroundImage?: unknown
  }
  sections?: SectionData[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    focusKeyword?: string
    keywords?: string[]
  }
}

export interface SectionData {
  _key?: string
  sectionId?: string
  sectionType?: string
  heading?: string
  subheading?: string
  body?: unknown[]
  items?: SectionItem[]
  backgroundVariant?: string
}

export interface SectionItem {
  _key?: string
  title?: string
  description?: string
  icon?: string
  image?: unknown
  link?: string
  value?: string
}

export async function generateStaticParams() {
  const pages = await sanityFetch<{ slug: string; pageType: string }[]>(allPagesQuery)
  if (!pages) return []
  return pages
    .filter((page) => page.pageType !== "home")
    .map((page) => ({
      slug: [page.slug],
    }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const slugStr = slug?.join("/") || null

  const page: PageData | null = slugStr
    ? await sanityFetch<PageData>(pageBySlugQuery, { slug: slugStr })
    : await sanityFetch<PageData>(homepageQuery)

  if (!page) return { title: slugStr ? "Page Not Found" : "Website" }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    keywords: page.seo?.keywords,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const slugStr = slug?.join("/") || null

  const page: PageData | null = slugStr
    ? await sanityFetch<PageData>(pageBySlugQuery, { slug: slugStr })
    : await sanityFetch<PageData>(homepageQuery)

  if (!page) {
    // If requesting homepage and no page found, show placeholder
    if (!slugStr) return <PlaceholderPage />
    notFound()
  }

  return (
    <article>
      {page.hero && (
        <HeroSection
          headline={page.hero.headline}
          subheadline={page.hero.subheadline}
          ctaText={page.hero.ctaText}
          ctaLink={page.hero.ctaLink}
          backgroundImage={page.hero.backgroundImage}
        />
      )}
      {page.sections && page.sections.length > 0 && (
        <div>
          {page.sections.map((section, index) => (
            <SectionRenderer key={section._key || index} section={section} />
          ))}
        </div>
      )}
      {!page.hero && (!page.sections || page.sections.length === 0) && (
        <div className="mx-auto max-w-4xl px-4 py-24 text-center">
          <h1
            className="text-4xl font-bold"
            style={{
              fontFamily: "var(--font-heading, inherit)",
              fontWeight: "var(--font-heading-weight, 700)",
            }}
          >
            {page.title}
          </h1>
          <p className="mt-4 text-lg opacity-60">
            This page has no content sections yet. Add content in Sanity Studio.
          </p>
        </div>
      )}
    </article>
  )
}

function PlaceholderPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Welcome to Your Website</h1>
      <p className="mt-4 max-w-lg text-lg opacity-60">
        Connect your Sanity CMS to start building. Set your environment variables and create content
        in Sanity Studio at{" "}
        <code className="rounded bg-[var(--muted)] px-1.5 py-0.5 text-sm font-mono">
          /studio
        </code>
        .
      </p>
      <div className="mt-8 flex flex-col gap-3 text-sm opacity-40">
        <p>NEXT_PUBLIC_SANITY_PROJECT_ID</p>
        <p>NEXT_PUBLIC_SANITY_DATASET</p>
        <p>SANITY_API_TOKEN (optional, for preview)</p>
      </div>
    </div>
  )
}
