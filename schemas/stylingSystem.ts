import { defineField, defineType } from "sanity"

const colorField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "string",
    description: "Color value in any CSS format (hex, OKLCH, HSL, etc.)",
  })

export default defineType({
  name: "stylingSystem",
  title: "Styling System",
  type: "document",
  fields: [
    defineField({
      name: "colors",
      title: "Light Mode Colors",
      type: "object",
      fields: [
        colorField("primary", "Primary"),
        colorField("secondary", "Secondary"),
        colorField("accent", "Accent"),
        colorField("background", "Background"),
        colorField("foreground", "Foreground"),
        colorField("muted", "Muted"),
        colorField("border", "Border"),
        colorField("ring", "Ring"),
      ],
    }),
    defineField({
      name: "darkMode",
      title: "Dark Mode Colors",
      type: "object",
      fields: [
        colorField("primary", "Primary"),
        colorField("secondary", "Secondary"),
        colorField("accent", "Accent"),
        colorField("background", "Background"),
        colorField("foreground", "Foreground"),
        colorField("muted", "Muted"),
        colorField("border", "Border"),
        colorField("ring", "Ring"),
      ],
    }),
    defineField({
      name: "typography",
      title: "Typography",
      type: "object",
      fields: [
        defineField({
          name: "headingFont",
          title: "Heading Font",
          type: "string",
          description: "Google Font name, e.g. 'Inter', 'Playfair Display'",
        }),
        defineField({
          name: "bodyFont",
          title: "Body Font",
          type: "string",
          description: "Google Font name, e.g. 'Inter', 'Open Sans'",
        }),
        defineField({
          name: "baseSize",
          title: "Base Size (px)",
          type: "number",
          initialValue: 16,
        }),
        defineField({
          name: "scaleRatio",
          title: "Scale Ratio",
          type: "number",
          description: "Type scale ratio, e.g. 1.25 for Major Third",
          initialValue: 1.25,
        }),
        defineField({
          name: "lineHeight",
          title: "Line Height",
          type: "number",
          initialValue: 1.5,
        }),
        defineField({
          name: "headingWeight",
          title: "Heading Weight",
          type: "string",
          options: {
            list: ["400", "500", "600", "700", "800", "900"],
          },
          initialValue: "700",
        }),
      ],
    }),
    defineField({
      name: "wcagLevel",
      title: "WCAG Level",
      type: "string",
      options: {
        list: [
          { title: "AA", value: "AA" },
          { title: "AAA", value: "AAA" },
        ],
      },
      initialValue: "AA",
    }),
    defineField({
      name: "cssVars",
      title: "CSS Custom Properties",
      type: "object",
      description: "Raw CSS custom property overrides as JSON-like key-value pairs",
      fields: [
        defineField({
          name: "root",
          title: "Root (:root)",
          type: "text",
          description: "CSS custom properties for light mode, one per line: --key: value;",
        }),
        defineField({
          name: "dark",
          title: "Dark (.dark)",
          type: "text",
          description: "CSS custom properties for dark mode, one per line: --key: value;",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Styling System" }
    },
  },
})
