# Hexo AnHeYu Blog Migration Design

## Goal

Replace the AstroPaper implementation at `septzhang.github.io` with a Hexo 7 static blog using the official AnHeYu theme, while preserving the new blog's agreed identity and GitHub Pages root-domain deployment.

## Scope

- Use Hexo 7 and the official stable `main` branch of `anzhiyu-c/hexo-theme-anzhiyu` as a Git submodule at `themes/anzhiyu`.
- Keep all personal settings outside the theme in `_config.anzhiyu.yml` so theme updates do not overwrite site customizations.
- Publish at `https://septzhang.github.io/` with `root: /` and `url: https://septzhang.github.io`.
- Keep the site identity: `Sept Zhang`, subtitle `记录成长与思考`, Simplified Chinese, and Asia/Shanghai dates.
- Keep the four visible content directions: 思考、复盘、阅读、随笔.
- Start with the single post `重新开始`; do not copy legacy Hexo articles from the archive repository.
- Provide posts, categories/tags, archives, local search, RSS, dark mode, and the GitHub profile link.
- Disable comments, analytics, music, chat, PWA, friend links, and other optional integrations for the first release.

## Architecture

The repository becomes a conventional Hexo site. Hexo site configuration lives in `_config.yml`; only AnHeYu overrides live in `_config.anzhiyu.yml`; all authored content resides in `source/_posts` and `source/*` pages. The theme stays isolated as a pinned Git submodule to make upstream updates explicit and reversible.

GitHub Actions installs dependencies with a locked package manager, initializes submodules, runs `hexo generate`, and deploys the generated `public` directory using the existing GitHub Pages artifact workflow. A failed build leaves the most recent successful deployment untouched.

## Content and Navigation

The home page uses AnHeYu's native recent-post experience and a concise site subtitle. Navigation contains 首页、归档、分类、标签、关于; the four directions are represented by categories and are reachable through the category index. The initial post belongs to `思考` and preserves the previous Chinese title and fresh-start message.

An `about` page identifies the site as a place for growth and reflection and links only to `https://github.com/septzhang`. No legacy technical articles, comments, analytics, newsletter, portfolio, or custom domain are introduced.

## Configuration Boundaries

`_config.yml` owns Hexo behavior, canonical URL, permalink and supported plugins. `_config.anzhiyu.yml` owns menu labels, Chinese presentation, color/mode choices, social link, subtitle, search UI and disabled optional integrations. Theme source files are not customized directly.

Theme-generated external integrations remain disabled by default. Assets included in the theme may be used, but no third-party credentials, tracking identifiers, or remote content APIs are configured.

## Verification

Automated checks will assert the Hexo configuration, the AnHeYu submodule, the agreed content and disabled integrations, and a GitHub Pages workflow that builds `public`. The release check runs dependency installation, static generation, and a local inspection of generated homepage, post, archive, RSS, category/tag pages. After push, the GitHub Actions run and `https://septzhang.github.io/` will be checked.

## Risks and Decisions

- The theme is a large Hexo theme with many optional modules. We deliberately use the minimal first-release configuration to avoid accidental analytics, chat, comments, music, or externally fetched content.
- The theme is a Git submodule rather than copied files. Updating it later requires an explicit submodule update and review, but preserves clean ownership boundaries.
- Existing Astro source is replaced on `master`, while the prior Astro implementation remains recoverable from the existing Git history and the legacy static deployment remains on `legacy-static-2026-10-12`.
