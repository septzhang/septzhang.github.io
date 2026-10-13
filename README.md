# Sept Zhang

个人成长与思考博客：https://septzhang.github.io/

本站基于 [Hexo](https://hexo.io/) 与 [AnHeYu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu) 主题构建，记录思考、复盘、阅读与随笔。

## 本地开发

```bash
npm ci
npm run server
```

本地预览默认地址为 `http://localhost:4000/`。

## 构建与发布

```bash
npm run build
```

GitHub Actions 会在 `master` 分支推送后构建 `public/` 并发布到 GitHub Pages。

## 写文章

文章位于 `source/_posts/`。使用下列命令创建文章：

```bash
npx hexo new "文章标题"
```

## 更新主题

AnHeYu 主题以 Git 子模块保存，站点定制只写在 `_config.anzhiyu.yml`。更新主题后请检查官方更新说明并重新构建：

```bash
git submodule update --remote themes/anzhiyu
npm ci
npm run build
```
