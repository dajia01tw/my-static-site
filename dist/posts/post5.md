---
title: Day 02 把 Markdown 內容分離到獨立檔案
date: 2026-08-10
tags: [程式, JavaScript, 心得]
author: Kai
---

# Day 02 把 Markdown 內容分離到獨立檔案

今天的目標是：

1. 建立一個獨立的 .md 檔案

2. 用 JavaScript 的 fetch() 去讀取它

3. 再把讀到的內容用 marked.parse() 轉換成 HTML


## Step 1：建立 about.md 檔案

在你的 my-markdown-site 資料夾中，建立一個新檔案，命名為 about.md。


## Step 2：修改 index.html

現在我們要修改 JavaScript，讓它不再寫死 Markdown 內容，而是從外部讀取。


## Step 3：用 Live Server 測試

重要提醒：這次一定要用 Live Server 打開！

1. 在 VS Code 中對著 index.html 按右鍵

2. 選擇 「Open with Live Server」

3. 瀏覽器會打開 http://127.0.0.1:5500/index.html

你應該會看到 about.md 的內容被漂亮地渲染出來！


## Step 4：試試看不同的內容

修改 about.md 的內容，例如：

```

markdown
# 今天學到的新東西

今天學到了 **fetch()** 這個 JavaScript 內建函式，它可以：

1. 讀取外部檔案
2. 發送網路請求
3. 取得遠端資料

## 我理解的重點

- `fetch()` 是**非同步**的，所以要搭配 `.then()`
- 要用 `.text()` 把回應轉成文字
- 記得用 `.catch()` 處理錯誤

---

[回到首頁](index.html)

```

儲存 about.md 後，重新整理瀏覽器（不需要重新啟動 Live Server），內容就會更新！



## 今天學到的關鍵觀念

1. fetch() 是 JavaScript 內建函式

  - 用來讀取網路資源或本地檔案

  - 回傳一個 Promise（Promise 是 JavaScript 處理非同步的方式）

2. 非同步程式碼（Asynchronous）

  - fetch() 不會馬上回傳結果，需要等待檔案讀取完成

  - 用 .then() 來處理「讀取完成後要做的事」

  - 用 .catch() 來處理「如果出錯怎麼辦」

3. 檔案路徑

  - fetch('about.md') 表示在同一層資料夾找 about.md

  - 如果檔案在子資料夾，要寫 fetch('content/about.md')





## 今天的作業（Day 2 完成標準）
- 成功用 fetch() 讀取 about.md
- 成功用 marked.parse() 轉換並顯示內容
- 修改 about.md 內容，加入至少 3 種 Markdown 語法（標題、清單、引用、連結等）
- 故意把 about.md 改名（例如改成 about2.md），看看錯誤訊息是否正常顯示



> 今天很成功。
