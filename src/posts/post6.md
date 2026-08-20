---
title: Day 03 建立多篇文章與動態目錄
date: 2026-08-11
tags: [程式, JavaScript, 心得]
author: Kai、deepseek
---

# Day 03 建立多篇文章與動態目錄

今天的目標是：

1. 建立多個 Markdown 文章檔案

2. 建立一個「文章清單」（用 JSON 檔案管理）

3. 讓首頁動態顯示所有文章標題

4. 點擊標題時，載入並顯示對應文章


## Step 1：建立文章資料夾與多篇內容

在你的 my-markdown-site 資料夾中，建立一個新資料夾叫 posts。

在 posts 資料夾中，建立三篇文章：

posts/post1.md

posts/post2.md

posts/post3.md


## Step 2：建立文章清單 JSON 檔案

在 my-markdown-site 資料夾根目錄，建立一個 posts.json 檔案：

```
json
[
    {
        "id": "post1",
        "title": "我的第一篇文章",
        "date": "2026-08-10",
        "filename": "posts/post1.md"
    },
    {
        "id": "post2",
        "title": "學習 JavaScript 的筆記",
        "date": "2026-08-11",
        "filename": "posts/post2.md"
    },
    {
        "id": "post3",
        "title": "Markdown 語法小抄",
        "date": "2026-08-12",
        "filename": "posts/post3.md"
    }
]
```

## Step 3：建立全新的 index.html

現在我們要重新設計頁面，加入「文章列表」和「文章內容」兩個區塊。


## Step 4：測試成果

用 Live Server 打開 index.html，你應該會看到：

1. 左側：顯示三篇文章標題，按日期排序（最新的在最上面）

2. 右側：自動顯示第一篇文章的完整內容

3. 點擊任何文章標題，右側內容會切換為對應文章

4. 目前閱讀的文章在左側會高亮顯示（藍色背景）



## 今天學到的關鍵觀念

1. JSON 作為資料管理

  - JSON 是 JavaScript 物件表示法

  - 用來儲存結構化資料（文章標題、日期、檔案路徑）

  - `response.json()` 可以把 JSON 字串轉換成 JavaScript 物件

2. 動態渲染（Dynamic Rendering）

  - 用 JavaScript 根據資料「產生」HTML 元素

  - 不再是寫死 HTML，而是根據資料內容動態生成

  - `document.querySelectorAll()` + `forEach()` 批量處理元素

3. 事件委派（Event Delegation）

  - 在每個 li 上綁定 click 事件

  - 點擊時讀取 data-filename 屬性，決定要載入哪篇文章

4. 狀態管理（簡單版）

  - postsData 變數儲存所有文章資料

  - 點擊文章時，更新「目前選中的文章」狀態（用 active class 標示）





## 今天的作業（Day 3 完成標準）

- 成功建立 3 篇以上 Markdown 文章
- 成功建立 posts.json 文章清單
- 側邊欄正確顯示所有文章標題和日期
- 點擊文章標題能切換顯示內容
- 新增第 4 篇文章，更新 posts.json，確認自動出現在列表中



> md檔我使用記事本開啟後，有時每行的行首第一次元會出現 “/”。更改了原先的內容。為什麼要怎麼解決？

這是個非常經典的問題！這不是 Markdown 或你的程式碼有問題，而是 Windows 記事本的編碼設定 造成的。

## 問題原因

Windows 記事本在儲存檔案時，預設使用 UTF-8 with BOM（位元組順序標記），會在檔案開頭加入一個看不見的 U+FEFF 字元。

當你用瀏覽器讀取這個檔案時，這個隱藏字元可能會被顯示成：

- 在某些情況下顯示為 ﻿（在網頁開頭）

- 在你的情況可能顯示為 /（因為記事本轉換時的顯示問題）

- 或者造成第一行開頭出現亂碼


## 解決方法

### 改用 VS Code 編輯

既然你已經在用 VS Code，直接用 VS Code 開啟和編輯 .md 檔案，不要用記事本。

1. 在 VS Code 中，點擊左側的「檔案總管」

2. 找到你的 .md 檔案，點擊打開

3. 編輯完後按 Ctrl+S 儲存

4. VS Code 預設使用 UTF-8 without BOM，不會有這個問題


