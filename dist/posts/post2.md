---
title: 學習 JavaScript 的筆記
date: 2026-08-11
tags: [程式, JavaScript]
author: Alex
---

# 學習 JavaScript 的筆記

今天學到了 `fetch()` 和 `Promise`。

## 重點整理

1. **fetch()** 用來讀取外部資源
2. **.then()** 處理成功的情況
3. **.catch()** 處理錯誤的情況

### 範例程式碼

```javascript
fetch('about.md')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));