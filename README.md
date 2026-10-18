# Margin Signals

An independent personal blog about writing, worlds, and games. The working name,
author bio, and sample articles are editable. No DFI-specific branding remains.

## Cloudflare Pages

For immediate drag-and-drop deployment, upload the enclosed `cloudflare-upload.zip`
in Cloudflare Pages. Do not upload this entire project ZIP.

For Git-based publishing, put this source folder in your repository and use:
- Framework: Eleventy (or None)
- Build command: npm run build
- Output directory: _site
- Node.js: 22 or newer

Before launch, set your actual domain in `src/_data/site.json`. It currently uses
https://your-project.pages.dev as an obvious placeholder. Rebuild after changing
it so canonical links and the Atom feed use your real address. Set author and
site title there too; update the display copy in the templates if you rename it.

## Run locally

    npm ci
    npm run start

For a production build:

    npm run build

The resulting `_site` folder is your deployable site. To update a Direct Upload
project after edits, upload that folder or a ZIP of its contents.

## Write an entry

Add a Markdown file in `src/posts`. The filename becomes the URL.

    ---
    title: Your post title
    deck: A short introduction for the article and listing.
    date: 2026-10-18
    category: Writing
    ---

    Your article here.

Use Writing, At the table, or Notebook for category; add further categories to
the archive template and homepage selector if desired. Set `draft: true` to
exclude a post from publishing. Sample articles use `sample: true`, which displays
a sample label; replace their text and remove that setting when ready.

Markdown supports headings, images, links, lists, tables, quotes, and code. Put
images in `src/assets/images` and reference `/assets/images/your-image.jpg`.

## Customize

- Identity: src/_data/site.json
- Homepage and sidebar: src/index.njk
- About page: src/about.njk
- Archive: src/archive.njk
- Article layout: src/_includes/layouts/post.njk
- Header and footer: src/_includes/partials/
- Colors, type, layout: src/assets/css/site.css
- Search and topic filter: src/assets/js/journal.js

Search matches titles, excerpts, and categories. Article pages and navigation
work without JavaScript; homepage filtering requires JavaScript. RSS is an Atom
feed at `/feed.xml`. There is no newsletter account, CMS, or comments backend.
All fonts and artwork are self-hosted. Font licenses are included.

Validation: production build and internal links checked. The in-conversation
preview embeds the actual generated pages. No live Cloudflare deployment or
browser screenshot validation was performed.
