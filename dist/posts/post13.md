---
title: 用 VS Code 部署網站的真實流程 來解釋每一個指令
date: 2026-08-21
tags: [網站, 心得, vs code]
author: Kai, copilot
---

# 用 VS Code 部署網站的真實流程 來解釋每一個指令

我用 你在 VS Code → GitHub → Vercel 部署網站的真實流程 來解釋每一個指令的「作用」、「什麼時候用」、「背後發生什麼事」，讓你完全理解整個 pipeline。

## 🎯 總結一句話

這些指令的目的就是：

在本機建立專案 → 安裝套件 → 建置 → 建立 Git 儲存庫 → 推送到 GitHub → 讓 Vercel 自動部署。

## 🧩 逐行解釋每個指令的意思（最清楚版本）

### 1️⃣ npm install

作用：安裝專案需要的所有套件（dependencies）。

- VS Code 專案通常有一個 package.json

- 裡面列出你專案需要的套件（例如 Next.js、React、MDX 等）

- npm install 會把它們全部下載到 node_modules/

👉 沒有這一步，專案不能執行，也不能 build。

### 2️⃣ npm run build

作用：把你的網站「編譯成可部署的版本」。

- Next.js → 產生 .next/

- Astro → 產生 dist/

- Vite → 產生 dist/

- 靜態網站 → 產生 HTML/CSS/JS

👉 Vercel 會自動做這一步，但你本機測試時也會用到。

### 3️⃣ git init

作用：在你的資料夾裡建立一個新的 Git 儲存庫。

- 讓 Git 開始追蹤你的檔案變化

- 會建立 .git/ 隱藏資料夾

👉 這是把你的專案變成「可推送到 GitHub」的第一步。














