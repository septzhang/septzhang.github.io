import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("build does not depend on Google Fonts or dynamic font-backed OG routes", async () => {
  const [astroConfig, layout, theme] = await Promise.all([
    readFile(new URL("../astro.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/layouts/Layout.astro", import.meta.url), "utf8"),
    readFile(new URL("../src/styles/theme.css", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(astroConfig, /fontProviders|fonts:\s*\[/);
  assert.doesNotMatch(layout, /from "astro:assets"|<Font/);
  assert.match(theme, /--font-app:\s*system-ui/);

  await assert.rejects(access(new URL("../src/pages/og.png.ts", import.meta.url)));
  await assert.rejects(
    access(new URL("../src/pages/posts/[...slug]/index.png.ts", import.meta.url))
  );
});
