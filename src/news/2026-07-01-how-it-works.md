---
title: 11ty 版是怎麼運作的？
date: 2026-07-01
thumbnail: ""
summary: 客戶 Publish → commit 進 GitHub → Cloudflare 跑 `npm run build` → 11ty 產出純 HTML → 部署。
---

流程比動態版多了一個「build」步驟：

1. 客戶在 `/admin` 用 GitHub 登入編輯
2. 按 **Publish**，Decap 把 Markdown commit 進 repo
3. Cloudflare Pages 偵測到 commit，執行 `npm run build`
4. **11ty 把 `src/news/*.md` 全部編譯成 HTML**（每篇一頁 + 首頁列表）
5. 部署完成

代價是每次改要等 build 約 10–30 秒，換來 SEO、速度，並且不依賴 GitHub API。
