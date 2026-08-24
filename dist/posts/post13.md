---
title: 用 VS Code 部署網站的真實流程 來解釋每一個指令
date: 2026-08-21
tags: [網站, 心得]
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





