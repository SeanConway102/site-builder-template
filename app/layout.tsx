import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { sanityFetch } from "@/lib/sanity"
import { siteSettingsQuery, stylingSystemQuery } from "@/lib/queries"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { VisualEditing } from "@/components/visual-editing"

import "./globals.css"

// Type definitions for Sanity data
interface StylingSystem {
  colors?: Record<string, string>
  darkMode?: Record<string, string>
  typography?: {
    headingFont?: string
    bodyFont?: string
    baseSize?: number
    scaleRatio?: number
    lineHeight?: number
    headingWeight?: string
  }
  cssVars?: {
    root?: string
    dark?: string
  }
}

interface SiteSettings {
  businessName?: string
  tagline?: string
  logo?: unknown
  navigation?: { title: string; slug: string; pageType?: string }[]
  footer?: {
    copyrightText?: string
    socialLinks?: { platform?: string; url?: string }[]
  }
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
  }
}

function buildCssVars(stylingSystem: StylingSystem | null): string {
  if (!stylingSystem) return ""

  let css = ":root {\n"

  // Map Sanity color fields to CSS custom properties
  if (stylingSystem.colors) {
    const colorMap: Record<string, string> = {
      primary: "--site-primary",
      secondary: "--site-secondary",
      accent: "--site-accent",
      background: "--site-background",
      foreground: "--site-foreground",
      muted: "--site-muted",
      border: "--site-border",
      ring: "--site-ring",
    }
    for (const [key, varName] of Object.entries(colorMap)) {
      if (stylingSystem.colors[key]) {
        css += `  ${varName}: ${stylingSystem.colors[key]};\n`
      }
    }
  }

  // Typography
  if (stylingSystem.typography) {
    const t = stylingSystem.typography
    if (t.headingFont) css += `  --font-heading: '${t.headingFont}', sans-serif;\n`
    if (t.bodyFont) css += `  --font-body: '${t.bodyFont}', sans-serif;\n`
    if (t.baseSize) css += `  --font-base-size: ${t.baseSize}px;\n`
    if (t.scaleRatio) css += `  --font-scale-ratio: ${t.scaleRatio};\n`
    if (t.lineHeight) css += `  --font-line-height: ${t.lineHeight};\n`
    if (t.headingWeight) css += `  --font-heading-weight: ${t.headingWeight};\n`
  }

  // Raw CSS vars from Sanity
  if (stylingSystem.cssVars?.root) {
    css += `  ${stylingSystem.cssVars.root}\n`
  }

  css += "}\n"

  // Dark mode
  if (stylingSystem.darkMode || stylingSystem.cssVars?.dark) {
    css += ".dark {\n"
    if (stylingSystem.darkMode) {
      const colorMap: Record<string, string> = {
        primary: "--site-primary",
        secondary: "--site-secondary",
        accent: "--site-accent",
        background: "--site-background",
        foreground: "--site-foreground",
        muted: "--site-muted",
        border: "--site-border",
        ring: "--site-ring",
      }
      for (const [key, varName] of Object.entries(colorMap)) {
        if (stylingSystem.darkMode[key]) {
          css += `  ${varName}: ${stylingSystem.darkMode[key]};\n`
        }
      }
    }
    if (stylingSystem.cssVars?.dark) {
      css += `  ${stylingSystem.cssVars.dark}\n`
    }
    css += "}\n"
  }

  return css
}

function buildGoogleFontsUrl(stylingSystem: StylingSystem | null): string | null {
  if (!stylingSystem?.typography) return null
  const fonts: string[] = []
  const { headingFont, bodyFont } = stylingSystem.typography

  if (headingFont) {
    fonts.push(headingFont.replace(/ /g, "+") + ":wght@400;500;600;700;800;900")
  }
  if (bodyFont && bodyFont !== headingFont) {
    fonts.push(bodyFont.replace(/ /g, "+") + ":wght@400;500;600;700")
  }

  if (fonts.length === 0) return null
  return `https://fonts.googleapis.com/css2?${fonts.map((f) => `family=${f}`).join("&")}&display=swap`
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings>(siteSettingsQuery)

  return {
    title: settings?.businessName || "Website",
    description: settings?.tagline || "A website powered by Sanity CMS",
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const dm = await draftMode()

  const [settings, stylingSystem] = await Promise.all([
    sanityFetch<SiteSettings>(siteSettingsQuery),
    sanityFetch<StylingSystem>(stylingSystemQuery),
  ])

  const cssVars = buildCssVars(stylingSystem)
  const googleFontsUrl = buildGoogleFontsUrl(stylingSystem)

  return (
    <html lang="en">
      <head>
        {googleFontsUrl && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="stylesheet" href={googleFontsUrl} />
          </>
        )}
        {cssVars && <style dangerouslySetInnerHTML={{ __html: cssVars }} />}
      </head>
      <body
        className="min-h-screen antialiased"
        style={{
          fontFamily: "var(--font-body, var(--font-sans, system-ui, sans-serif))",
          fontSize: "var(--font-base-size, 16px)",
          lineHeight: "var(--font-line-height, 1.5)",
          backgroundColor: "var(--site-background, hsl(var(--background)))",
          color: "var(--site-foreground, hsl(var(--foreground)))",
        }}
      >
        <SiteHeader
          businessName={settings?.businessName}
          logo={settings?.logo}
          navigation={settings?.navigation}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter
          businessName={settings?.businessName}
          copyrightText={settings?.footer?.copyrightText}
          socialLinks={settings?.footer?.socialLinks}
          contactInfo={settings?.contactInfo}
          navigation={settings?.navigation}
        />
        {dm.isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
