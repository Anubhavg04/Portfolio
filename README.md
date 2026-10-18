# Anubhav Gupta Portfolio

A tactile, fast, and highly-styled developer portfolio built with Next.js, Tailwind CSS, GSAP, and a custom ink-bleed theme engine.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Vanilla CSS (for complex animations and theme tokens)
- **Animations:** GSAP (ScrollTrigger for pinning/reveal), View Transitions API (for the ink-bleed theme swap)
- **Icons:** Lucide React
- **Typography:** Fraunces, Instrument Sans, JetBrains Mono, Caveat

## Getting Started

First, install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure & Content Editing

The entire site's content is abstracted into a single data file for easy editing. You rarely need to touch the `.tsx` component files unless you want to change the layout or animations.

### Editing Content
Open `data/content.ts` to modify:
- **Hero:** Name, role, tagline, location, and availability.
- **Projects:** Add, remove, or edit featured and non-featured projects. Note the `isFeatured` boolean determines whether a project gets a full pinned sheet or goes into the Index Drawer.
- **Stack:** Modify the tools listed in the backend, data, and frontend columns.
- **About:** Edit your bio paragraphs and education details.
- **Contact:** Update your email address, social links, and footer text.

### Adding a New Project
1. Open `data/content.ts`
2. Add a new object to the `projects` array:
```typescript
{
  id: "07",
  title: "New Project",
  pitch: "A brief description of what this is.",
  cover: "/assets/projects/new-project.jpg", // Path to your image
  coverCaption: "a cool caption for the taped photo",
  tags: ["Next.js", "Tailwind"],
  isFeatured: true, // true for full sheet, false for Index Drawer
  hasUi: true,
  bullets: ["Key feature 1", "Key feature 2"],
  live: "https://example.com",
  github: "https://github.com/Anubhavg04/repo"
}
```
3. Place your cover image inside the `public/assets/projects/` directory.

### Where Assets Live
- **Images:** All images (portrait, project covers) go in `public/assets/` and `public/assets/projects/`.
- **Favicon & OG Image:** Replace `public/favicon.ico`, `public/apple-touch-icon.png`, and `public/og-image.jpg` with your own assets for proper SEO and sharing metadata.

## Theme Engine (Ink-Bleed)

The site features a highly customized light/dark theme swap called the "ink-bleed". 
- Located in `src/lib/ink.ts` and triggered by `src/components/Inkwell.tsx`.
- Uses the native CSS **View Transitions API** to draw an organic, noise-edged circle that expands across the screen.
- Has a robust Canvas-based fallback for browsers that don't support `document.startViewTransition`.

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push this repository to GitHub.
2. Go to Vercel and create a new project, selecting this repository.
3. Vercel will automatically detect that it's a Next.js project and configure the build settings.
4. Click **Deploy**.

## Performance & SEO
- The site achieves high Lighthouse scores by lazy-loading heavy effects, strictly optimizing images via `next/image`, and using `suppressHydrationWarning` for DOM elements modified by GSAP.
- A comprehensive `layout.tsx` file provides robust OpenGraph and Twitter card metadata, as well as JSON-LD Schema.org structured data.
