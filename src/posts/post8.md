---
title: Day 05 靜態網站生成器（Static Site Generator）與部署
date: 2026-08-14
tags: [工具, Node, vercel, 心得]
author: Kai、deepseek
---

# Day 05 靜態網站生成器（Static Site Generator）與部署

今天是最令人興奮的一天！我們要把你開發的動態網站，變成真正的靜態網站，然後部署到網路上，讓全世界都能看到！

## 為什麼要做靜態網站生成？

### 你目前的運作方式（Client-Side Rendering）：

```
text
使用者打開網頁 → JavaScript 執行 → fetch 讀取 .md 檔案 → marked.js 轉換成 HTML → 顯示
```

缺點：

- ❌ SEO 不好（搜尋引擎爬蟲抓不到內容）

- ❌ 第一次載入較慢（需要下載並執行 JavaScript）

- ❌ 需要 JavaScript 才能運作

### 靜態網站生成（Static Site Generation）：

```
text
建構時：讀取 .md 檔案 → 轉換成 HTML → 產生 .html 檔案
部署後：使用者直接看到完整的 HTML 內容
```

優點：

- ✅ SEO 完美（爬蟲直接看到內容）

- ✅ 載入飛快（純 HTML，不需要 JavaScript）

- ✅ 不需要 JavaScript 也能看（除非需要互動功能）

- ✅ 可以放在任何靜態主機上（GitHub Pages、Vercel、Netlify）


## Day 5 的目標

1. 建立一個 Node.js 建構腳本，把 .md 檔案轉換成 .html

2. 自動產生文章列表和文章頁面

3. 部署到 Vercel（免費、超簡單）

___

## Step 1：安裝 Node.js

如果你還沒有安裝 Node.js，請先安裝：

1. 前往 https://nodejs.org

2. 下載 LTS 版本（長期支援版本）

3. 安裝（一直按下一步即可）

4. 安裝完成後，打開 VS Code 的終端機（Terminal），輸入：

```
bash
node --version
```

如果顯示版本號（例如 v18.x.x），表示安裝成功！

___

## Step 2：建立專案結構

為了避免與現有檔案衝突，我們建立一個新的資料夾：

在 VS Code 中，建立以下結構：

```
text
my-static-site/
├── src/
│   ├── templates/
│   │   ├── layout.html      (頁面模板)
│   │   └── post.html        (文章模板)
│   ├── posts/
│   │   ├── post1.md
│   │   ├── post2.md
│   │   └── post3.md
│   └── index.md             (首頁內容)
├── build.js                 (建構腳本)
├── package.json             (Node.js 設定檔)
└── dist/                    (建構後的輸出資料夾，自動產生)
```

___

## Step 3：建立 package.json

在 my-static-site 資料夾中，建立 package.json 檔案：

```
json
{
  "name": "my-static-site",
  "version": "1.0.0",
  "description": "靜態網站生成器練習",
  "main": "build.js",
  "scripts": {
    "build": "node build.js"
  },
  "dependencies": {
    "marked": "^9.0.0"
  }
}
```

___

## Step 4：安裝相依套件

在 VS Code 終端機中（確保路徑在 my-static-site 資料夾），輸入：

```
bash
npm install
```

> Step 4：安裝相依套件    這一步我失敗了, 為什麼？該如何做？

這是一個很常見的 Windows 系統安全性問題！錯誤訊息說得很清楚：「因為這個系統上已停用指令碼執行，所以無法載入 npm.ps1」。

這是 Windows 的 PowerShell 執行政策（Execution Policy）預設禁止執行腳本檔案造成的。

### 解決方法：使用 CMD（命令提示字元）代替 PowerShell（最簡單）✅

這是最快、最簡單的方法，不需要修改任何系統設定：

1. 在 VS Code 中，點擊終端機右上角的 下拉選單（通常顯示「PowerShell」）

2. 選擇 「Command Prompt」 或 「cmd」

3. 然後輸入：

```
bash
npm install
```

這樣就成功了！


___

## Step 5：建立模板檔案

`src/templates/layout.html`

這是整個網站的外框（Header、Footer、Sidebar）：

___

## Step 6：建立建構腳本 build.js

這是核心程式碼！它會：

1. 讀取所有 Markdown 檔案

2. 解析 Front Matter

3. 轉換成 HTML

4. 套用模板

5. 輸出到 dist/ 資料夾

___

## Step 7：將文章複製到 src/posts/

把 Day 4 的三篇文章複製到 src/posts/ 資料夾中：

- post1.md

- post2.md

- post3.md

___

## Step 8：執行建構

在 VS Code 終端機中（路徑在 my-static-site），輸入：

```
bash
npm run build
```

你應該會看到類似這樣的輸出：

```
text
📄 找到 3 篇文章
✅ 載入 3 篇文章
📝 產生文章頁面...
  ✅ post1.html
  ✅ post2.html
  ✅ post3.html
🏠 產生首頁...
  ✅ index.html
📊 複製 .md 檔案到 dist/posts/
🎉 建構完成！
📁 輸出目錄: C:\Users\...\my-static-site\dist
🚀 可以用 Live Server 開啟 dist/index.html 預覽
```

___

## Step 9：預覽靜態網站

1. 在 VS Code 中，打開 dist 資料夾

2. 對著 index.html 按右鍵

3. 選擇 「Open with Live Server」

4. 你會看到和之前一樣的部落格，但這次完全不需要 JavaScript 就能運作！

___
## Step 10：部署到 Vercel（免費）

### 註冊 Vercel

1. 前往 https://vercel.com

2. 點擊 「Sign Up」

3. 使用 GitHub、Google 或 Email 註冊（推薦用 GitHub）

### 部署

1. 在 Vercel 首頁，點擊 「Add New...」→「Project」

2. 選擇 「Deploy」

3. 如果看到 my-static-site，點擊 「Import」

4. 在設定頁面：

  - Framework Preset：選擇 Other

  - Root Directory：留空

  - Build Command：輸入 npm run build

  - Output Directory：輸入 dist

5. 點擊 「Deploy」

6. 等待幾秒鐘，你就會看到一個網址（例如 my-static-site.vercel.app）

🎉 恭喜！你的部落格已經上線了！

> Step 10：註冊 Vercel（完成）。部署1.（完成）
> 不過沒有看到「Deploy」。是直接拖拉dist資料夾到“You can also drag and drop your project, or choose a file or a folder.”這個區塊嗎？

對的！你完全正確！ 🎉

在 Vercel 的這個畫面中，「You can also drag and drop your project, or choose a file or a folder」 這個區塊，就是讓你直接上傳 dist 資料夾的地方！

### 部署方式：拖曳上傳（你目前看到的）✅ 最簡單

1. 找到你的 dist 資料夾（在 my-static-site 裡面）

2. 直接用滑鼠拖曳 dist 資料夾到 Vercel 頁面的虛線框內

3. 放開滑鼠，Vercel 會自動上傳並部署

4. 等待幾秒鐘，你就會得到一個網址！
___

## Day 5 完成標準

- □ 成功安裝 Node.js

- □ 成功執行 npm run build 產生 dist/ 資料夾

- □ dist/ 中有 index.html 和 post1.html、post2.html、post3.html

- □ 用 Live Server 開啟 dist/index.html 正常顯示

- □ （進階）成功部署到 Vercel
___

## 你學到了什麼？

| 概念 | 說明 |
| ---- | ---- |
| **靜態網站生成** | 在建構時就把內容轉成 HTML，不是執行時 |
| **Node.js 腳本** | 用 JavaScript 寫伺服器端程式 |
| **檔案系統操作** | `fs.readFileSync`、`fs.writeFileSync` |
| **模板引擎** | 用 `{{變數}}` 佔位符，動態填入內容 |
| **部署** | 把靜態檔案放到雲端主機上 |





## 你達成的里程碑

回顧這五天的學習，你已經做到了：

- 理解核心概念：內容與版型分離、靜態網站生成。

- 掌握實作工具：使用 Markdown 管理內容、marked.js 解析語法、Node.js 腳本自動化建構。

- 解決實際問題：獨立處理了 CDN 失效、Windows 執行政策、Vercel 部署等真實開發會遇到的挑戰。

- 產出最終成果：將你的部落格成功部署到全球網路。

這是非常紮實的進步，恭喜你！等網站穩定上線後，你就可以開始用這個流程自由地寫作和發布了。有任何後續問題，隨時可以再問我。



