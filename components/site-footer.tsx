import Link from "next/link"

interface SocialLink {
  platform?: string
  url?: string
}

interface SiteFooterProps {
  businessName?: string
  copyrightText?: string
  socialLinks?: SocialLink[]
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
  }
  navigation?: {
    title: string
    slug: string
    pageType?: string
  }[]
}

export function SiteFooter({
  businessName,
  copyrightText,
  socialLinks,
  contactInfo,
  navigation,
}: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--site-border,hsl(var(--border)))] bg-[var(--site-muted,hsl(var(--muted)))]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Copyright */}
          <div>
            <p className="text-lg font-bold text-[var(--site-foreground,hsl(var(--foreground)))]">
              {businessName || "Site Name"}
            </p>
            <p className="mt-2 text-sm text-[var(--site-foreground,hsl(var(--foreground)))]/60">
              {copyrightText || `\u00A9 ${year} ${businessName || "Company"}. All rights reserved.`}
            </p>
          </div>

          {/* Navigation */}
          {navigation && navigation.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--site-foreground,hsl(var(--foreground)))]">
                Pages
              </h3>
              <nav className="mt-4 flex flex-col gap-2" aria-label="Footer navigation">
                {navigation.map((item) => {
                  const href = item.pageType === "home" ? "/" : `/${item.slug}`
                  return (
                    <Link
                      key={item.slug}
                      href={href}
                      className="text-sm text-[var(--site-foreground,hsl(var(--foreground)))]/60 transition-colors hover:text-[var(--site-foreground,hsl(var(--foreground)))]"
                    >
                      {item.title}
                    </Link>
                  )
                })}
              </nav>
            </div>
          )}

          {/* Contact Info */}
          {contactInfo && (contactInfo.phone || contactInfo.email || contactInfo.address) && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--site-foreground,hsl(var(--foreground)))]">
                Contact
              </h3>
              <div className="mt-4 flex flex-col gap-2 text-sm text-[var(--site-foreground,hsl(var(--foreground)))]/60">
                {contactInfo.phone && <p>{contactInfo.phone}</p>}
                {contactInfo.email && (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="transition-colors hover:text-[var(--site-foreground,hsl(var(--foreground)))]"
                  >
                    {contactInfo.email}
                  </a>
                )}
                {contactInfo.address && <p>{contactInfo.address}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Social Links */}
        {socialLinks && socialLinks.length > 0 && (
          <div className="mt-8 flex items-center gap-4 border-t border-[var(--site-border,hsl(var(--border)))] pt-8">
            {socialLinks.map((link, index) => (
              link.url && (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--site-foreground,hsl(var(--foreground)))]/60 transition-colors hover:text-[var(--site-foreground,hsl(var(--foreground)))]"
                  aria-label={`Visit us on ${link.platform || "social media"}`}
                >
                  {link.platform || "Link"}
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
