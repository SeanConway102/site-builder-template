import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { sanityFetch } from "@/lib/sanity"
import { siteSettingsQuery } from "@/lib/queries"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { VisualEditing } from "@/components/visual-editing"

import "./globals.css"

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
  const settings = await sanityFetch<SiteSettings>(siteSettingsQuery)

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
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
