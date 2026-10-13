import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("..", import.meta.url);
const file = relative => readFile(new URL(relative, root), "utf8");

test("configures the root-domain Hexo site and AnHeYu theme", async () => {
  const [config, themeConfig, gitmodules] = await Promise.all([
    file("_config.yml"),
    file("_config.anzhiyu.yml"),
    file(".gitmodules"),
  ]);

  assert.match(config, /^url: https:\/\/septzhang\.github\.io$/m);
  assert.match(config, /^root: \/$/m);
  assert.match(config, /^theme: anzhiyu$/m);
  assert.match(config, /^title: Sept Zhang$/m);
  assert.match(config, /^language: zh-CN$/m);
  assert.match(config, /^timezone: Asia\/Shanghai$/m);
  assert.match(await file("package.json"), /"hexo": \{/);
  assert.match(await file("package.json"), /"build": "hexo clean && hexo generate"/);
  assert.match(gitmodules, /\[submodule "themes\/anzhiyu"\]/);
  assert.match(gitmodules, /path = themes\/anzhiyu/);
  assert.match(gitmodules, /url = https:\/\/github\.com\/anzhiyu-c\/hexo-theme-anzhiyu\.git/);
  assert.match(themeConfig, /subtitle:[\s\S]*sub:[\s\S]*- 记录成长与思考/);
  assert.match(themeConfig, /GitHub: https:\/\/github\.com\/septzhang/);
});

test("keeps the agreed starting content and topic directions", async () => {
  const post = await file("source/_posts/重新开始.md");

  assert.match(post, /title: 重新开始/);
  assert.match(post, /categories:\n  - 思考/);

  for (const topic of ["思考", "复盘", "阅读", "随笔"]) {
    await access(new URL(`source/categories/${topic}/index.md`, root));
  }

  const about = await file("source/about/index.md");
  assert.match(about, /个人成长与思考/);
  assert.match(about, /https:\/\/github\.com\/septzhang/);
});

test("keeps first release integrations private and minimal", async () => {
  const [config, themeConfig, packageJson] = await Promise.all([
    file("_config.yml"),
    file("_config.anzhiyu.yml"),
    file("package.json"),
  ]);

  assert.match(packageJson, /hexo-generator-feed/);
  assert.match(packageJson, /hexo-generator-search/);
  assert.match(config, /feed:\n  type: rss2/);
  assert.match(config, /search:\n  path: search\.xml/);
  assert.match(themeConfig, /comments:\n  use: \[\]/);
  assert.match(themeConfig, /nav_music:\n  enable: false/);
  assert.match(themeConfig, /^chat_btn: false$/m);
  assert.match(themeConfig, /pwa:\n  enable: false/);
  assert.match(themeConfig, /linkPageTop:\n  enable: false/);
});
