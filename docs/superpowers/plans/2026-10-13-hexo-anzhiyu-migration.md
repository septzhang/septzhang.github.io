# Hexo AnHeYu Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the published Astro implementation with a minimal, Chinese Hexo 7 blog using the official AnHeYu theme and GitHub Pages deployment.

**Architecture:** The repository becomes a standard Hexo source tree. The AnHeYu theme is a pinned Git submodule under `themes/anzhiyu`; Hexo and site content live at the repository root; theme overrides live in `_config.anzhiyu.yml`. GitHub Actions builds `public/` and publishes it to Pages.

**Tech Stack:** Node.js 22, npm, Hexo 7, AnHeYu stable theme, `hexo-generator-search`, `hexo-generator-feed`, GitHub Actions Pages.

**Spec:** `docs/superpowers/specs/2026-10-13-hexo-anzhiyu-migration-design.md`

## Global Constraints

- Deploy only at `https://septzhang.github.io/` with `root: /`.
- Use the official AnHeYu `main` branch as the `themes/anzhiyu` Git submodule.
- Keep all personal theme changes in `_config.anzhiyu.yml`; never edit the submodule theme source.
- Preserve `Sept Zhang`, `记录成长与思考`, zh-CN, Asia/Shanghai, and only the GitHub profile link.
- Keep one post, `重新开始`, categorized as `思考`; expose 思考、复盘、阅读、随笔 as category directions.
- Disable comments, analytics, music, chat, PWA, friend links, and third-party credentials.
- Preserve the design and implementation-plan documents; remove the superseded Astro source and dependencies.

## Review Focus

- The Pages base URL is root (`/`), so generated links and feed URLs must not contain an unintended project subpath.
- Submodule initialization must happen before dependency installation/build in GitHub Actions.
- A checkout without pre-existing `public/` must generate all deploy artifacts from source.
- No optional theme integration may silently enable a tracker, comment system, music player, or chat widget.
- Unicode filename and category links for `重新开始` and `思考` must survive static generation.

### Task 1: Establish the Hexo and AnHeYu source tree

**Files:**
- Create: `_config.yml`
- Create: `_config.anzhiyu.yml`
- Create: `package.json`
- Create: `source/_posts/重新开始.md`
- Create: `source/about/index.md`
- Create: `source/categories/思考/index.md`
- Create: `source/categories/复盘/index.md`
- Create: `source/categories/阅读/index.md`
- Create: `source/categories/随笔/index.md`
- Create: `tests/site-content.test.mjs`
- Delete: Astro application source, Astro configuration, Astro dependency lockfile, and Astro-specific tests
- Add submodule: `themes/anzhiyu`

**Interfaces:**
- Consumes: official `anzhiyu-c/hexo-theme-anzhiyu` repository at `main`.
- Produces: a root Hexo project whose `npm run build` generates `public/`.

- [ ] **Step 1: Write failing source-contract tests**

Create Node tests that require Hexo configuration values `url: https://septzhang.github.io`, `root: /`, `theme: anzhiyu`, a registered AnHeYu submodule, the four category pages, the post title/category, and disabled optional integrations.

- [ ] **Step 2: Run the source-contract test before implementation**

Run: `node --test tests/site-content.test.mjs`

Expected: FAIL because the Astro implementation has no Hexo configuration or AnHeYu submodule.

- [ ] **Step 3: Replace Astro sources with minimal Hexo sources and add the theme submodule**

Set `package.json` scripts to `hexo clean`, `hexo server`, and `hexo generate`; install only Hexo, the required renderers, feed generator, sitemap generator, and local search generator. Add the theme at `themes/anzhiyu` from the official `main` branch. Set all site text and menu entries to the approved Chinese identity, and explicitly disable optional theme integrations.

- [ ] **Step 4: Run the source-contract test and build**

Run: `npm ci && node --test tests/site-content.test.mjs && npm run build`

Expected: PASS; `public/index.html`, `public/archives/index.html`, `public/rss2.xml`, category pages, and the post page exist.

- [ ] **Step 5: Commit the self-contained migration**

```bash
git add -A
git commit -m "feat: replace Astro with Hexo AnHeYu blog"
```

### Task 2: Replace the GitHub Pages workflow

**Files:**
- Modify: `.github/workflows/deploy.yml`
- Create: `tests/deploy-workflow.test.mjs`

**Interfaces:**
- Consumes: Task 1 `npm run build`, which writes static output to `public/`.
- Produces: a GitHub Pages Action workflow that uploads `public/` after generating Hexo content.

- [ ] **Step 1: Write the failing deployment-workflow test**

Create a Node test requiring checkout with submodules, Node 22 setup, `npm ci`, `npm run build`, `actions/upload-pages-artifact` with `path: ./public`, and `actions/deploy-pages`.

- [ ] **Step 2: Run the workflow test before editing the workflow**

Run: `node --test tests/deploy-workflow.test.mjs`

Expected: FAIL because the existing workflow invokes Astro-specific tooling.

- [ ] **Step 3: Update the deployment workflow**

Keep the existing required Pages permissions and deployment job. Replace Astro setup with Node/npm commands; configure checkout to initialize the theme submodule and upload `./public`.

- [ ] **Step 4: Verify the workflow contract and build output**

Run: `node --test tests/deploy-workflow.test.mjs && npm run build && test -f public/index.html && test -f public/rss2.xml`

Expected: PASS.

- [ ] **Step 5: Commit the workflow change**

```bash
git add .github/workflows/deploy.yml tests/deploy-workflow.test.mjs
git commit -m "ci: deploy Hexo site to GitHub Pages"
```

### Task 3: Release and verify the live site

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: Task 1 static site and Task 2 Pages workflow.
- Produces: an auditable release pointing at the root-domain site.

- [ ] **Step 1: Write a README check that captures the project usage**

Add a test that requires concise commands for `npm ci`, `npm run server`, and `npm run build`, plus the site URL and AnHeYu attribution.

- [ ] **Step 2: Run the README test before changing documentation**

Run: `node --test tests/site-content.test.mjs`

Expected: FAIL because the AstroPaper README remains.

- [ ] **Step 3: Replace the template README with repository-specific instructions**

Document local commands, the deployment workflow, the theme submodule update command, and the active blog URL without copying theme documentation into the repository.

- [ ] **Step 4: Run the full verification suite, push, and inspect the deployment**

Run: `npm ci && node --test tests/*.test.mjs && npm run build`

Then push `master`, wait for the GitHub Pages workflow, and verify the live home page, post page, archive page, RSS feed, and category page with `curl --fail --location`.

- [ ] **Step 5: Commit documentation and record release evidence**

```bash
git add README.md tests/site-content.test.mjs
git commit -m "docs: document Hexo blog workflow"
```

## Self-Review

- Spec coverage: Tasks 1–3 cover framework replacement, theme isolation, content, optional-feature disabling, deployment, and live validation.
- Step scan: Every task has an explicit failing test, implementation step, passing verification, and commit.
- Interface consistency: Task 1 produces `npm run build` and `public/`; Tasks 2 and 3 consume exactly those outputs.
- Review focus coverage: Task 1 covers canonical root URLs, content, integrations, and Unicode; Task 2 covers submodules and deploy artifact path; Task 3 checks generated and live routes.
- Proportion: Three tasks correspond to source migration, deployment, and release documentation without restating implementation bodies.
