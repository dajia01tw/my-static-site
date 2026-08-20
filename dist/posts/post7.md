---
title: Day 04 從文章中自動提取 Front Matter
date: 2026-08-12
tags: [程式, JavaScript, 心得]
author: Kai、deepseek
---

# Day 04 從文章中自動提取 Front Matter

今天的目標是：

1. 學習什麼是 Front Matter（文章前面的元資料區塊）

2. 從 .md 檔案中自動提取標題、日期等資訊

3. 完全擺脫 posts.json，讓系統自動掃描文章

4. 實現真正的「內容與資料分離」


## 為什麼需要 Front Matter？

在 Day 3 中，我們用 posts.json 來管理文章清單，但這樣有幾個問題：

- 新增文章時，要同時修改 posts.json，容易忘記

- 標題和日期儲存在兩個地方（JSON 和 Markdown），可能不同步

- 不夠「自動化」

Front Matter 解決了這個問題：把文章的所有「元資料」（標題、日期、標籤等）直接寫在 Markdown 檔案的最前面！


## Step 1：更新所有文章，加入 Front Matter

修改你的文章檔案，在最前面加入 --- 區塊：

posts/post1.md

posts/post2.md

posts/post3.md

## Step 2：安裝 Front Matter 解析套件

我們需要一個套件來解析 Front Matter。這次用 gray-matter。

在 index.html 中加入（放在 marked.js 之後）：

```
html

<!-- 引入 Front Matter 解析套件 -->
<script src="https://cdn.jsdelivr.net/npm/gray-matter@4.0.3/dist/gray-matter.min.js"></script>
```

> Step 2：安裝 Front Matter 解析套件。這是一個程式的安裝？或只是在 index.html 中插入  <!-- 引入 Front Matter 解析套件 --><script src="https://cdn.jsdelivr.net/npm/gray-matter@4.0.3/dist/gray-matter.min.js"></script>

非常好的問題！這正是很多初學者會混淆的地方。讓我詳細解釋：

直接回答
這不是傳統意義的「安裝軟體」，而是在你的網頁中「引入一個外部的 JavaScript 程式庫」。

你做的完全正確——就是在 index.html 中插入那行 <script> 標籤！

> 如果我直接下載gray-matter.min.js檔, 並置於根目錄。並在適當的位置插入  <script src="./gray-matter.min.js"></script> 。是不是可行？

完全可行！而且這是非常好的想法！ 👍

這樣做不僅可行，還有幾個優點。讓我詳細說明：

直接回答
是的，完全可行！ 而且這正是「將依賴下載到本地」的標準做法。


## Step 3：建立全新的 index.html（自動掃描版本）

這次我們完全移除 posts.json，改成「動態掃描」文章。

## Step 4：測試成果

用 Live Server 打開 index.html，你應該會看到：

1. 文章列表顯示所有文章標題、日期和標籤

2. 文章內容自動顯示標題、作者、日期和標籤

3. 新增文章時，只需：

  - 在 posts/ 資料夾新增 .md 檔案

  - 在 postFiles 陣列中加入檔名

  - 不需要再維護 posts.json



## 今天學到的關鍵觀念

1. Front Matter

  - 用 --- 分隔的 YAML 格式區塊

  - 放在 Markdown 檔案最前面

  - 用來儲存文章的「元資料」（標題、日期、標籤等）

2. gray-matter 套件

  - 解析 Front Matter 區塊

  - 回傳 `{ data: {...}, content: '...' }`

  - data 是解析後的資料，content 是純 Markdown 內容

3. Promise.all()

  - 同時載入多個檔案

  - 等待所有檔案都載入完成後才繼續

  - 提高載入效率

4. 資料驅動 UI

  - 文章資料儲存在 postsData 陣列中

  - UI 根據資料動態渲染

  - 資料變更時，UI 自動更新





## 今天的作業（Day 4 完成標準）

- 所有文章都加上 Front Matter（標題、日期、標籤、作者）
- 成功安裝並使用 gray-matter
- 文章列表顯示標題、日期和標籤
- 文章內容顯示標題、作者、日期和標籤
- 新增第 4 篇文章，只需在 postFiles 加入檔名，不需要修改 JSON




> 今天經過了無數次的失敗。失敗的原因為以下：
> 1. deepseek 提供之 CDN 引入失敗。
> 2. 提供之 js 檔無法下載。
>
> 最終已經成功。經過這一段時間的失敗,我們嘗試了三種方案。以下是我的理解,請幫我看看是否正確。
> 1. 外部CDN：網頁html只會加入一行較為簡潔,外部CDN可能會自行升級我方不必理會；但有外部失聯間接造成我方網站癱瘓的可能。
> 2. 下載js到根目錄：最穩定,但程式碼過長。
> 3. 目前成功的方案：我不太理解,請簡單說明。

恭喜你成功！🎉 你的理解非常正確，而且能歸納出這三個方案的重點，代表你已經掌握核心觀念了。我來幫你補充和確認：

### 方案 1：外部 CDN

```
html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

你說的都對：

- ✅ 程式碼簡潔（一行搞定）

- ✅ 會自動升級（但可能造成版本不相容）

- ✅ 外部失聯會讓網站癱瘓

補充一點：

- CDN 還有「速度快」的優點，因為全球都有伺服器

- 適合用於大型專案或學習階段（方便快速）

### 方案 2：下載到本地

```
html
<script src="./gray-matter.min.js"></script>
```

你說的都對：

- ✅ 最穩定（完全自給自足）

- ✅ 程式碼過長（下載的 .js 檔案可能很大）

補充一點：

- 下載一次後，永遠不需要網路就能運作

- 適合用於正式上線的網站或內部系統


### 方案 3：自製解析器（你目前成功的方案）

這是我幫你寫的這段程式碼：

```
javascript
function parseFrontMatter(content) {
    // 檢查是否以 --- 開頭
    if (!content.trim().startsWith('---')) {
        return { data: {}, content: content };
    }
    // ... 後續解析邏輯
}
```

### 方案 3 的簡單說明（白話版）

#### 這到底是什麼？

就是「我自己寫一個小工具，來代替 gray-matter.js 的功能」。

就像：

- 原本你要喝果汁，需要買一台果汁機（gray-matter.js）

- 但果汁機缺貨（CDN 失效）

- 於是你用手和濾網把果汁擠出來（自己寫解析器）

#### 它是怎麼運作的？

1. 讀取 Markdown 檔案內容（例如 post1.md）

2. 找 --- 標記：

```
text
---          ← 第一個 ---
title: 我的第一篇文章
date: 2026-08-10
tags: [生活, 心得]
---          ← 第二個 ---
# 我的第一篇文章    ← 真正的文章內容
```

3. 把中間的部分抓出來（title、date、tags）

4. 解析成 JavaScript 物件：

```
javascript
{
    title: '我的第一篇文章',
    date: '2026-08-10',
    tags: ['生活', '心得']
}
```

5. 剩下的內容（# 我的第一篇文章...）就交給 marked.js 轉成 HTML



