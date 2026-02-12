import { PortableText } from "@portabletext/react"

interface PortableTextRendererProps {
  value: unknown[]
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || value.length === 0) return null

  return (
    <div className="prose prose-lg max-w-none">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={value as any} />
    </div>
  )
}
