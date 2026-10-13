import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("..", import.meta.url);
const file = relative => readFile(new URL(relative, root), "utf8");

test("publishes the agreed Chinese identity and one fresh-start post", async () => {
  const [config, astroConfig, home, datetime, posts] = await Promise.all([
    file("astro-paper.config.ts"),
    file("astro.config.ts"),
    file("src/pages/index.astro"),
    file("src/components/Datetime.astro"),
    readdir(new URL("src/content/posts/", root)),
  ]);

  assert.match(config, /url: "https:\/\/septzhang\.github\.io"/);
  assert.match(config, /title: "Sept Zhang"/);
  assert.match(config, /description: "记录成长与思考"/);
  assert.match(config, /lang: "zh-CN"/);
  assert.match(config, /timezone: "Asia\/Shanghai"/);
  assert.match(config, /ogImage: "og\.png"/);
  assert.match(config, /url: "https:\/\/github\.com\/septzhang"/);
  assert.match(astroConfig, /locales: \["zh-CN"\]/);
  assert.match(datetime, /format\("YYYY-MM-DD"\)/);
  assert.deepEqual(posts, ["重新开始.md"]);

  const firstPost = await file("src/content/posts/重新开始.md");
  assert.match(firstPost, /title: "重新开始"/);
  assert.match(firstPost, /- 思考/);

  for (const topic of ["思考", "复盘", "阅读", "随笔"]) {
    assert.match(home, new RegExp(topic));
  }
});

test("creates a stable topic route for each agreed topic", async () => {
  const topicRoute = await file("src/pages/topics/[topic].astro");

  for (const topic of ["思考", "复盘", "阅读", "随笔"]) {
    assert.match(topicRoute, new RegExp(topic));
  }
  assert.match(topicRoute, /getStaticPaths/);
  assert.match(topicRoute, /getStaticPaths[\s\S]*\["思考", "复盘", "阅读", "随笔"\]/);
  assert.match(topicRoute, /Astro\.props as \{ topic: string \}/);
});

test("uses a site-owned social preview image instead of the theme default", async () => {
  await access(new URL("public/og.png", root));
  await assert.rejects(access(new URL("public/default-og.jpg", root)));
});
