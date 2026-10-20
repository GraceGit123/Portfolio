# 作品详情页源码

此目录为三个作品详情页的 React + Vite 源码，完整静态网站位于 `../docs/`。

运行 `npm ci` 安装依赖，修改 `src/` 后运行 `npm run build`。
构建路径固定为 `/Portfolio/projects/`，结果输出到 `../docs/projects/`，保留其中的图片、字体和视频资源。
首页直接编辑 `../docs/index.html`、`../docs/style.css`、`../docs/script.js`。
本地预览请在仓库根目录执行 `python3 scripts/preview.py`。

兼容构建：JavaScript 目标为 Safari 13；构建插件展开 Tailwind 层叠层、转换现代颜色并生成旧版 transform 回退。共享 compat.js 提供旧 Safari 的弹窗与 Flex 间距回退。

手机促销页直接复用 ProjectPage 的文案节点与图表，六项设计方案、方法论、AI 工作流及后续拓展保留完整内容。CaseImage 同时为缺少原生 lazy loading 的 Safari 提供基于 IntersectionObserver 的延迟加载。
