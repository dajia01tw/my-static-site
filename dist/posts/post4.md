---
title: Day 01 你的第一個 Markdown 轉 HTML 頁面
date: 2026-08-10
tags: [程式, 工具, vs code, 心得]
author: Kai
---

# Day 01 你的第一個 Markdown 轉 HTML 頁面

我們從最簡單的開始，目標是讓瀏覽器把 Markdown 文字變成漂亮的網頁標題。


## Step 1：建立專案資料夾

在你的電腦桌面新增一個資料夾，命名為 my-markdown-site，然後用 VS Code 打開它。


## Step 2：建立 index.html

在資料夾中新增 index.html。


## Step 3：寫 JavaScript 把 Markdown 轉成 HTML

在 `<script>` 標籤內（marked.js 的下面），加入以下程式碼：

```
// 1. 定義你的 Markdown 內容（先寫死，之後再從檔案讀取）
const markdownContent = `
# 你好，世界！

這是我用 **Markdown** 寫的第一段內容。

- 清單項目 1
- 清單項目 2
- 清單項目 3

> 這是一段引用文字。
`;

// 2. 使用 marked.js 將 Markdown 轉換成 HTML
const htmlContent = marked.parse(markdownContent);

// 3. 找到頁面上的 #content 元素，把轉換好的 HTML 放進去
document.getElementById('content').innerHTML = htmlContent;
```


## Step 4：用 Live Server 打開網頁

重要：不要直接雙擊 index.html 用瀏覽器打開（雖然現在還不會有問題，但之後讀取 .md 檔案時會遇到 CORS 錯誤）。

### 正確做法：
1. 在 VS Code 中，對著 index.html 按右鍵
2. 選擇 「Open with Live Server」
3. 瀏覽器會自動打開 http://127.0.0.1:5500/index.html


## Step 5：檢查成果

你應該會看到：
- 標題「📝 我的第一篇 Markdown 文章」
- 下方顯示轉換後的內容：
  - 「你好，世界！」（變成 `<h1>` 大標題）
  - 一段普通文字
  - 一個有 3 個項目的清單
  - 一段引用文字（灰色區塊）


## 今天的作業（Day 1 完成標準）
- 成功用 marked.js 把 Markdown 字串轉成 HTML
- 修改 markdownContent 的內容，加入 ## 二級標題 和 [連結](https://example.com)，確認都能正確轉換
- 試著把 markdownContent 的內容改成你自己的自我介紹


> 今日問題：在 STEP4 中 對著 index.html 按右鍵。選單中沒有 “Open with Live Server” 。


我看到你的截圖了！選單中確實沒有「Open with Live Server」，這表示你還沒有安裝 Live Server 擴充功能。

## 解決方法：安裝 Live Server 擴充功能

### 1.安裝 Live Server

1. 在 VS Code 左側，點擊 「擴充功能」圖示（就是四個方塊疊在一起的圖示，或按快捷鍵 Ctrl+Shift+X）
2. 在搜尋框中輸入 Live Server
3. 找到由 Ritwick Dey 開發的 Live Server（應該會是第一個）
4. 點擊右邊的藍色 「安裝」 按鈕

### 2.重新啟動 VS Code（可選但建議）

安裝完成後，建議關閉 VS Code 再重新打開，確保擴充功能正常運作。

### 3.再次嘗試

重新打開 VS Code 後：

1. 在 index.html 上按右鍵
2. 你現在應該會看到 「Open with Live Server」 選項
3. 點擊它，瀏覽器就會自動打開

