# 戈珊珊 · UX/UI Designer

个人作品集网站，包含首页及三个作品详情页：E-Booking 促销、HT 任务、Hotel Solution。

## 在线地址

GitHub Pages：https://GraceGit123.github.io/Portfolio/

首次发布请在 Settings → Pages → Build and deployment 将 Source 设为 **GitHub Actions**，随后运行 Actions 中的 **Deploy portfolio to GitHub Pages**。

## 文件说明

- `docs/`：完整可直接部署的网站，包含首页、三份作品、字体、图片及原画质视频
- `project-details-source/`：三个作品详情页的 React + Vite 源码
- `.github/workflows/deploy-pages.yml`：推送 main 分支后自动部署

## 本地预览

在仓库目录执行 `python3 scripts/preview.py`，访问 `http://127.0.0.1:4175/Portfolio/`。

## 修改及构建

首页直接编辑 `docs/index.html`、`docs/style.css` 和 `docs/script.js`。
详情页在 `project-details-source/` 中运行 `npm install`，修改 `src/` 后运行 `npm run build`。
构建会更新 `docs/projects/` 并保留现有资源文件。视频为原始 MP4 的两段二进制数据，页面会自动拼接并在滚动进入可视区域后播放。
