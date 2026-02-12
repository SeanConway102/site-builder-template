import { defineField, defineType } from "sanity"

export default defineType({
  name: "section",
  title: "Section",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
    }),
    defineField({
      name: "sectionType",
      title: "Section Type",
      type: "string",
      options: {
        list: [
          { title: "Features", value: "features" },
          { title: "Services", value: "services" },
          { title: "About", value: "about" },
          { title: "Testimonials", value: "testimonials" },
          { title: "FAQ", value: "faq" },
          { title: "CTA", value: "cta" },
          { title: "Stats", value: "stats" },
          { title: "Team", value: "team" },
          { title: "Process", value: "process" },
          { title: "Pricing", value: "pricing" },
          { title: "Contact", value: "contact" },
          { title: "Gallery", value: "gallery" },
          { title: "Blog", value: "blog" },
        ],
      },
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "string",
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: "Used for stats, pricing, etc.",
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
            },
          },
        },
      ],
    }),
    defineField({
      name: "backgroundVariant",
      title: "Background Variant",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Muted", value: "muted" },
          { title: "Primary", value: "primary" },
          { title: "Dark", value: "dark" },
        ],
      },
      initialValue: "default",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "sectionType",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Section",
        subtitle: subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : "No type",
      }
    },
  },
})
