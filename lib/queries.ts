// All pages for navigation
export const allPagesQuery = `*[_type == "page"] | order(title asc) {
  title,
  "slug": slug.current,
  pageType
}`

// Single page by slug
export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0] {
  ...,
  sections[] {
    ...,
    items[] {
      ...,
      image {
        ...,
        asset->
      }
    }
  },
  hero {
    ...,
    backgroundImage {
      ...,
      asset->
    }
  }
}`

// Homepage
export const homepageQuery = `*[_type == "page" && pageType == "home"][0] {
  ...,
  sections[] {
    ...,
    items[] {
      ...,
      image {
        ...,
        asset->
      }
    }
  },
  hero {
    ...,
    backgroundImage {
      ...,
      asset->
    }
  }
}`

// Site settings
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  ...,
  logo {
    ...,
    asset->
  },
  navigation[]-> {
    title,
    "slug": slug.current,
    pageType
  }
}`

// Styling system
export const stylingSystemQuery = `*[_type == "stylingSystem"][0]`

// Blog posts
export const allBlogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  author,
  publishedAt,
  excerpt,
  coverImage {
    ...,
    asset->
  },
  categories
}`

// Single blog post
export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  ...,
  coverImage {
    ...,
    asset->
  }
}`
