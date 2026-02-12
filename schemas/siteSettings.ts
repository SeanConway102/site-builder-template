import { defineField, defineType } from "sanity"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "page" }],
        },
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({
          name: "copyrightText",
          title: "Copyright Text",
          type: "string",
        }),
        defineField({
          name: "socialLinks",
          title: "Social Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "platform",
                  title: "Platform",
                  type: "string",
                }),
                defineField({
                  name: "url",
                  title: "URL",
                  type: "url",
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Info",
      type: "object",
      fields: [
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "string",
        }),
      ],
    }),
  ],
})
