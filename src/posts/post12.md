---
title: Day 00 「內容與版型分離」的網站製作學習大綱
date: 2026-08-10
tags: [網站, 心得]
author: Kai, deepseek
---

# 「內容與版型分離」的網站製作學習大綱

> 我有基礎的 html . javascript 知識，我想學習「內容與版型分離」的網站製作：也就是把文章內容集中管理使用 Markdown 方式。我該如何開始，例如給我學習大綱。

太棒了！你有基礎的 HTML 和 JavaScript，這正是學習「內容與版型分離」最好的起點。你不需要先學會 React 或 Vue，用純前端技術就能做到。

這套做法的核心精神是：內容（Markdown） + 樣板（HTML/CSS） + 邏輯（JavaScript）。

以下為你量身打造一份 為期 4 週的學習大綱，跟著做，你就能建立自己的輕量級 CMS（內容管理系統）。

____

## 第一週：觀念建立與靜態轉換（從 HTML 到 Markdown）

**目標**：理解為什麼要分離，並學會將「固定文字」從 HTML 中抽離。

- Day 1-2：觀念釐清

  - 什麼是「耦合」與「分離」？

  - 實作對照：複製貼上 10 篇文章的 HTML 檔案 vs. 1 個模板檔案。

  - 認識 Markdown 語法（標題、清單、連結、圖片）。

- Day 3-4：前端解析器入門

  - 學習使用 marked.js 或 showdown.js（純 JS 套件）。

  - 練習：寫一個 index.html，裡面包一個 `<div id="content">`，用 JavaScript 把 `# 你好` 轉換成 `<h1>`你好`</h1>` 渲染出來。

- Day 5-7：第一個分離練習

  - 把你的個人簡介寫成 about.md。

  - 寫死 JavaScript 去抓取這個 .md 檔案（使用 fetch），並渲染到網頁上。

  - 挫折排除：學會使用 VS Code 的 Live Server 啟動網頁（否則 fetch 讀本地檔案會被 CORS 政策阻擋）。

____

## 第二週：動態載入與路由概念（SPA 單頁應用入門）

**目標**：做出「點擊導航列，內容改變，但網頁不重新整理」的效果。

- Day 8-10：Hash 路由（URL 的 # 符號）

  - 學習監聽 window.addEventListener('hashchange', ...)。

  - 實作：網址為 #home 時載入 home.md，#about 時載入 about.md。

- Day 11-14：文章列表動態產生

  - 建立一個 posts/ 資料夾，放入 post1.md, post2.md。

  - 建立一個 posts.json 或 posts.js，用來記錄「文章檔名」與「標題」。

  - 練習：首頁自動讀取 JSON，動態產生文章標題的按鈕列表，點擊按鈕則載入對應的 .md 檔案內容。

____

## 第三週：樣板引擎思維（解決重複的 HTML）

**目標**：解決「頁首、頁尾、側邊欄」每次都要複製貼上的問題。

- Day 15-18：JavaScript 樣板函數

  - 撰寫一個 TemplateRenderer 函數。

  - 例如：`renderPage('about', { title: '關於我', content: htmlContent })`，這個函數會自動把 content 塞進中間的 main，並加上共用的 Header 和 Footer。

- Day 19-21：引入 Front Matter（元資料）

  - 學習在 Markdown 最上方加入 --- 區塊（如 title: 我的文章, date: 2026-08-12）。

  - 使用 gray-matter.js 套件解析，讓你的文章除了內文，還能帶有「標籤」、「日期」、「作者」等屬性。

  - 實作：依照日期排序文章列表。

____

## 第四週：現代化工具與部署（告別手動更新）

**目標**：從「執行時期渲染」進階到「建構時期渲染」，並發佈到網路。

- Day 22-25：引入 Vite 或簡單的 Node.js 腳本

  - 雖然你只會基礎 JS，但試著看教學安裝 Vite。

  - 寫一個簡單的 build.js，在「編譯時」就把所有 .md 轉成 .html 靜態檔案輸出到 dist 資料夾。

  - 這樣做的好處：使用者打開網頁時，看到的是純 HTML，速度極快且利於 SEO（搜尋引擎優化）。

- Day 26-28：最終整合與部署

  - 將你的專案上傳至 GitHub。

  - 使用 Vercel 或 Netlify 部署（它們支援自動監聽 GitHub 更新，推送即上線）。



