# Decap CMS 示範站 — 11ty（build-time 版）

跟隔壁 `decap-cms-sample`（動態版）**內容一樣、後台一樣**，差別只在：這版用 **Eleventy（11ty）** 在 build 時把 Markdown 編譯成純 HTML，每篇文章有獨立頁面 → **SEO 好、載入快、可用 private repo、不吃 GitHub API 限額**。

```
push → Cloudflare 跑 `npm run build` → 11ty 把 src/news/*.md 變成 HTML → 部署
```

## 檔案結構

```
decap-cms-sample-11ty/
├── package.json            相依套件與指令（dev / build）
├── eleventy.config.js      11ty 設定：輸入 src、輸出 _site、用 Liquid 引擎
├── .gitignore             排除 node_modules / _site
└── src/
    ├── index.liquid        首頁：build 時列出所有文章卡片
    ├── _includes/
    │   ├── base.liquid     全站外框 + CSS
    │   └── post.liquid     單篇文章版型
    ├── news/
    │   ├── news.json       目錄設定：套 post 版型 + 產生 /news/xxx/ 網址
    │   └── *.md            文章（Decap 讀寫這裡）
    ├── admin/              Decap 後台（index.html + config.yml）
    └── assets/uploads/     圖片上傳位置
```

## 本地開發

```bash
npm install
npm run dev      # 開 http://localhost:8080，改檔即時重整
# 或
npm run build    # 產出到 _site/
```

想連後台測登入：在 `src/admin/config.yml` 打開 `local_backend: true`，另開終端跑 `npx decap-server`。

## 部署到 Cloudflare Pages

跟動態版流程相同（建 repo → OAuth App → 部署 Worker），**只有 build 設定不一樣**：

| 設定 | 值 |
|------|-----|
| Framework preset | **Eleventy** |
| Build command | `npm run build` |
| Build output directory | **`_site`** |

`src/admin/config.yml` 記得改成你的 repo，`base_url` 可沿用動態版那個 Worker。OAuth Worker 完全不用改。

## 跟動態版的對照

| | 動態版 (`decap-cms-sample`) | 這版 (11ty) |
|---|---|---|
| md → HTML 時機 | 瀏覽器每次開網頁現算 | push 後 build 時算好 |
| Cloudflare build | 無（直接丟原始檔） | `npm run build` → `_site` |
| SEO | 差（內容是 JS 生的） | 好（純 HTML） |
| 更新速度 | 幾乎即時 | 等 build 約 10–30 秒 |
| Repo | 需 public | public / private 都行 |
| 文章頁 | 只有首頁 + 彈窗 | 每篇獨立網址 `/news/xxx/` |

## 加欄位 / 改外觀

- **加欄位**：改 `src/admin/config.yml` 的 `fields`，再到 `index.liquid` / `post.liquid` 用 `{{ post.data.欄位名 }}` 顯示。
- **改外觀**：改 `src/_includes/base.liquid` 裡的 `<style>`（改最上面 `:root` 變數最省事）。
