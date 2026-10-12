# Astro Personal Blog Design

## Goal

Replace the legacy generated Hexo site at `septzhang.github.io` with a low-maintenance Astro personal blog for growth and reflection, while preserving the former site in a separate private archive repository.

## Repository and deployment

The public `septzhang/septzhang.github.io` repository remains on its existing `master` branch. Before the replacement, create a `legacy-static-2026-10-12` branch pointing to the current static-site commit. GitHub Actions builds the Astro source and deploys the Pages artifact after each push to `master`. The initial canonical URL is `https://septzhang.github.io`; do not configure `septzhang.xyz` or a `CNAME` file.

## Site and content

Use the AstroPaper template with its maintained Markdown/MDX content collection, static search, tag/archive pages, RSS, sitemap, dark mode, and SEO defaults. Set the site identity to `Sept Zhang` and `记录成长与思考`; use Simplified Chinese, `Asia/Shanghai`, and `YYYY-MM-DD` dates. Show only the GitHub profile `https://github.com/septzhang` as an external profile.

The home page contains a short introduction, a featured entry point, latest posts, and four topic entry points: `思考`, `复盘`, `阅读`, and `随笔`. Posts use the template's tag system to represent these four topics, avoiding a custom category subsystem. The first release contains only a short `重新开始` post. No old technical posts move into the new site.

## Scope boundaries

Do not add comments, analytics, newsletters, a CMS, a portfolio, or a custom domain in the first release. Keep template customizations confined to configuration, content, and small theme overrides needed for Chinese labels and the home-page topic links.

## Quality bar

Use Node 22 or newer and pnpm. Before push, run the project's type/content check and production build. The deployment workflow must use the official Astro GitHub Action and GitHub Pages deployment action with the minimal permissions required. A failed Action must leave the previously published deployment intact.
