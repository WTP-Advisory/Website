<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SEO: meta descriptions

Page content lives in `app/_data/pages/*.json`; each file's `metaDescription` is rendered into the `<meta name="description">` tag by `generateMetadata` in `app/[...slug]/page.tsx`.

When creating or editing a page:

- Every page JSON **must** have a `metaDescription`. Never omit it and never leave it empty.
- Each `metaDescription` **must be unique** across all files in `app/_data/pages/`. Duplicate (exact-match) descriptions hurt SEO — Google flags them and it's better to differentiate than to repeat.
- Write a description specific to that page's actual content (~120–160 characters). For "parent overview" vs "child service" pages that share a topic, give the child a description focused on its specific service, not a copy of the parent's.
- Beware duplication when cloning an existing page JSON as a template — rewrite `title` and `metaDescription`, don't carry them over.

To check before committing, scan for exact-match duplicates and missing fields across `app/_data/pages/*.json`.

Routes without an authored JSON (e.g. `/privacy`, `/terms`, or any unknown slug) fall through to the placeholder in `app/[...slug]/page.tsx`, which returns `robots: { index: false }` so these thin pages aren't indexed or flagged for duplicate meta descriptions. To make such a route a real, indexable page, add an `app/_data/pages/<slug>.json` with its own `title` and unique `metaDescription` — it then enters the sitemap (`app/sitemap.ts`) and is indexed automatically.
# Images

Always use `<Image>` from `next/image`. Never use plain `<img>` tags — the ESLint rule `@next/next/no-img-element` enforces this and the build will warn on violations.

**Choosing the right variant:**

- **`fill` + positioned wrapper** — use when the image fills a container whose size is set by CSS (aspect ratio, fixed height, responsive). The wrapper must have `position: relative` (or absolute/fixed) and `overflow: hidden`.
  ```tsx
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
    <Image src={src} alt={alt} fill className="object-cover" sizes="..." />
  </div>
  ```
- **Explicit `width` / `height`** — use for fixed-size images where dimensions are known (avatars, icons, logos with fixed height). CSS classes can still override the rendered size.
  ```tsx
  <Image src={src} alt={alt} width={64} height={64} className="rounded-full object-cover" />
  ```

**Always set `sizes`** when using `fill` or when the image width varies across breakpoints — it drives the srcset and prevents the browser downloading oversized images. Omit only for images that are always the same pixel width (e.g. a fixed 64×64 avatar).

**Use `priority`** (not `loading="eager"`) for images that are above the fold on initial load: page hero backgrounds, the first hero slider slide, and event banners. All other images get lazy loading by default.

**AVIF/WebP** are enabled in `next.config.ts` (`formats: ["image/avif", "image/webp"]`). Vercel's image optimization serves the best format automatically — no manual conversion needed.
