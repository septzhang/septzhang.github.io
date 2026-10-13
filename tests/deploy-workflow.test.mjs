import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("..", import.meta.url);

test("deploy workflow builds Hexo with its theme submodule and publishes public", async () => {
  const workflow = await readFile(
    new URL(".github/workflows/deploy.yml", root),
    "utf8"
  );

  assert.match(workflow, /actions\/checkout@v7/);
  assert.match(workflow, /submodules: recursive/);
  assert.match(workflow, /actions\/setup-node@v4/);
  assert.match(workflow, /node-version: 22/);
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /actions\/upload-pages-artifact@v3/);
  assert.match(workflow, /path: \.\/public/);
  assert.match(workflow, /actions\/deploy-pages@v5/);
  assert.doesNotMatch(workflow, /withastro\/action/);
});
