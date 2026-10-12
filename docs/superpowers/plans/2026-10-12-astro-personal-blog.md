# Astro Personal Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy GitHub Pages output with a Chinese AstroPaper personal blog that deploys automatically from `master`.

**Architecture:** AstroPaper owns rendering, its Markdown/MDX content collection, search, tags, RSS, sitemap, and accessibility defaults. Site-specific identity and content stay in configuration and content files; GitHub Actions builds `dist` and publishes it as the Pages artifact.

**Tech Stack:** Astro, AstroPaper, TypeScript, Markdown/MDX, pnpm, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-12-astro-personal-blog-design.md`

## Global Constraints

- Preserve the legacy Pages commit through branch `legacy-static-2026-10-12` before replacing generated files.
- Use public `septzhang/septzhang.github.io`, branch `master`, and canonical URL `https://septzhang.github.io`.
- Use AstroPaper without adding comments, analytics, newsletter, CMS, portfolio, custom domain, or old technical posts.
- Use Simplified Chinese, `Asia/Shanghai`, `YYYY-MM-DD`, and only `https://github.com/septzhang` as an external profile.
- Use Node 22+ and pnpm; the final check is the theme's validation command plus a production build.

## Review Focus

- Root-site links must not include a repository `base` path.
- The workflow must trigger from `master` and use GitHub Pages artifact deployment rather than committing generated output.
- All visible starter content must be replaced or removed before publication.
- The first post must be discoverable from the home page and carry exactly one of the approved topic tags.
- A failed build must not alter the active Pages deployment.

---

### Task 1: Preserve the legacy deployment and import the AstroPaper source

**Files:**
- Delete: legacy generated site files at repository root, after the backup branch exists
- Create: AstroPaper template source and lockfile at repository root

**Interfaces:**
- Consumes: current `master` deployment commit `5143401`
- Produces: an AstroPaper project that runs with pnpm and targets the root domain

- [ ] Create `legacy-static-2026-10-12` at current `master` and verify it resolves to `5143401`.
- [ ] Replace generated static output with the current AstroPaper template source, preserving no legacy generated assets.
- [ ] Install dependencies with pnpm on Node 22+ and run the template validation command.
- [ ] Commit the imported, buildable template.

### Task 2: Configure the site identity and first-release content

**Files:**
- Modify: AstroPaper's site configuration module
- Modify: AstroPaper's home-page content or page component
- Create: the first Markdown post in AstroPaper's blog collection
- Modify: template content files that contain visible starter posts or placeholder identity

**Interfaces:**
- Consumes: AstroPaper's documented configuration and content-collection schema
- Produces: Chinese site metadata, root-domain URLs, GitHub profile link, four topic entry points, and one published post

- [ ] Configure `Sept Zhang`, `记录成长与思考`, `https://septzhang.github.io`, Simplified Chinese, and the GitHub profile URL.
- [ ] Remove all starter posts and create `重新开始` tagged `思考`, with valid required frontmatter.
- [ ] Add the short introduction, featured entry point, and links for `思考`、`复盘`、`阅读`、`随笔` to the homepage using the template's minimal extension points.
- [ ] Run the content/type check and assert the home page and post route build successfully.
- [ ] Commit the configured first release.

### Task 3: Add automated GitHub Pages delivery

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: Astro configuration only if required for root-domain deployment

**Interfaces:**
- Consumes: `pnpm-lock.yaml` and a passing `pnpm build`
- Produces: a `master`-triggered Pages deployment that uploads the Astro build artifact

- [ ] Add the official Astro Action build step and GitHub Pages deploy step, granting only `contents: read`, `pages: write`, and `id-token: write`.
- [ ] Configure the workflow to run on pushes to `master` and manual dispatch, with Node 22 and pnpm lockfile detection.
- [ ] Validate workflow YAML and run the equivalent local production build.
- [ ] Commit the deployment workflow.

### Task 4: Publish and verify the release

**Files:**
- Modify: Git history and GitHub Pages settings only

**Interfaces:**
- Consumes: passing local verification and the deployment workflow
- Produces: a live Pages deployment at `https://septzhang.github.io`

- [ ] Push `master` and enable GitHub Pages to use GitHub Actions as its build source.
- [ ] Check the Actions run succeeds and obtain its published deployment URL.
- [ ] Open the public home page and first-post URL; verify title, Chinese metadata, GitHub link, and topic link behavior.
- [ ] Commit any narrowly scoped deployment correction only if verification reveals one.
