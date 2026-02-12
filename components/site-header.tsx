"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { urlFor } from "@/lib/sanity.image"

interface NavItem {
  title: string
  slug: string
  pageType?: string
}

interface SiteHeaderProps {
  businessName?: string
  logo?: unknown
  navigation?: NavItem[]
}

export function SiteHeader({ businessName, logo, navigation }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--site-border,hsl(var(--border)))] bg-[var(--site-background,hsl(var(--background)))]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--site-background,hsl(var(--background)))]/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          {logo ? (
            <Image
              src={urlFor(logo).width(140).height(40).url()}
              alt={businessName || "Logo"}
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
          ) : businessName ? (
            <span className="text-xl font-bold text-[var(--site-foreground,hsl(var(--foreground)))]">
              {businessName}
            </span>
          ) : (
            <span className="text-xl font-bold text-[var(--site-foreground,hsl(var(--foreground)))]">
              Site Name
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        {navigation && navigation.length > 0 && (
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {navigation.map((item) => {
              const href = item.pageType === "home" ? "/" : `/${item.slug}`
              return (
                <Link
                  key={item.slug}
                  href={href}
                  className="text-sm font-medium text-[var(--site-foreground,hsl(var(--foreground)))]/70 transition-colors hover:text-[var(--site-foreground,hsl(var(--foreground)))]"
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        )}

        {/* Mobile Menu Button */}
        {navigation && navigation.length > 0 && (
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-[var(--site-foreground,hsl(var(--foreground)))] md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && navigation && navigation.length > 0 && (
        <nav
          className="border-t border-[var(--site-border,hsl(var(--border)))] bg-[var(--site-background,hsl(var(--background)))] md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            {navigation.map((item) => {
              const href = item.pageType === "home" ? "/" : `/${item.slug}`
              return (
                <Link
                  key={item.slug}
                  href={href}
                  className="block py-2 text-sm font-medium text-[var(--site-foreground,hsl(var(--foreground)))]/70 transition-colors hover:text-[var(--site-foreground,hsl(var(--foreground)))]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
