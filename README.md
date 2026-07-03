# buweihao Portfolio

Personal portfolio website based on `zeon-studio/storeplate`, adapted for Cloudflare Pages static deployment.

## Pages

- Home: `/`
- Works: `/works`
- About: `/about`
- Contact: `/contact`

## Content

Portfolio entries live in `src/content/works/*.md` and support the categories `视觉`, `软件`, and `硬件`.

## Deploy

Cloudflare Pages settings:

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `master`
- Production domain: `mysite.weihaobu.cn`

No admin backend or OAuth setup is required.

## Sanity CMS

This site can use Sanity for client-editable portfolio content.

1. Create a Sanity project at `https://sanity.io/manage`.
2. Set these Cloudflare Pages environment variables:
   - `PUBLIC_SANITY_PROJECT_ID`
   - `PUBLIC_SANITY_DATASET=production`
   - `PUBLIC_SANITY_API_VERSION=2026-07-03`
3. Add CORS origins in Sanity Manage:
   - `http://localhost:4321`
   - `https://mysite.weihaobu.cn`
   Enable credentials for both.
4. Rebuild the Cloudflare Pages project.
5. Visit `/admin` to edit content with Sanity Studio.

If Sanity environment variables are not set, the site falls back to the local Markdown files in `src/content/works`.
