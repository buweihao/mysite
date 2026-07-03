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
