import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("deploy workflow builds master with the official Astro and Pages actions", async () => {
  const workflow = await readFile(
    new URL("../.github/workflows/deploy.yml", import.meta.url),
    "utf8"
  );

  assert.match(workflow, /branches: \[master\]/);
  assert.match(workflow, /contents: read/);
  assert.match(workflow, /pages: write/);
  assert.match(workflow, /id-token: write/);
  assert.match(workflow, /uses: withastro\/action@v6/);
  assert.match(workflow, /node-version: 22/);
  assert.match(workflow, /uses: actions\/deploy-pages@v5/);
});
