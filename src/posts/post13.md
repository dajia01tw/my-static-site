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

### 1️⃣ `npm install`

作用：安裝專案需要的所有套件（dependencies）。

- VS Code 專案通常有一個 `package.json`

- 裡面列出你專案需要的套件（例如 Next.js、React、MDX 等）

- `npm install` 會把它們全部下載到 `node_modules/`

👉 沒有這一步，專案不能執行，也不能 build。

____

### 2️⃣ `npm run build`

作用：把你的網站「編譯成可部署的版本」。

- Next.js → 產生 `.next/`

- Astro → 產生 `dist/`

- Vite → 產生 `dist/`

- 靜態網站 → 產生 HTML/CSS/JS

👉 Vercel 會自動做這一步，但你本機測試時也會用到。

____

### 3️⃣ `git init`

作用：在你的資料夾裡建立一個新的 Git 儲存庫。

- 讓 Git 開始追蹤你的檔案變化

- 會建立 `.git/` 隱藏資料夾

👉 這是把你的專案變成「可推送到 GitHub」的第一步。

____

### 4️⃣ `git add .`

作用：把所有檔案加入「暫存區」（staging area）。

意思是：

「Git，請準備好這些檔案，等一下要一起提交。」

`.` 代表「全部檔案」。

____

### 5️⃣ `git commit -m "Initial commit"`

作用：把暫存區的檔案正式記錄成一個版本（commit）。

#### 🔍 那 `""` 裡面的文字是什麼意思？

它是 這次版本的說明文字（commit message）。

例如：

- `"Initial commit"` → 第一次提交

- `"Add homepage"` → 新增首頁

- `"Fix table style"` → 修正表格樣式

👉 這是給你自己或團隊看的版本紀錄。

____

### 6️⃣ `git remote add origin https://github.com/YOUR_USERNAME/my-static-site.git`

作用：告訴 Git：你的遠端儲存庫（GitHub）在哪裡。

- `origin` 是遠端的名字（慣例）

- 後面是 GitHub 的網址

意思是：

「Git，等一下推送到這個 GitHub 儲存庫。」

> 有時執行 `git remote add origin ...` 時會出現這個錯誤訊息 error: remote origin already exists. 這表示在你的本地 Git 專案中，已經存在一個名為 origin 的遠端倉庫連結了。

#### 為什麼會這樣？

最常見的原因是，你的這個專案資料夾可能已經透過 git clone 或其他方式，與一個遠端倉庫建立了關聯。當你再次執行 git remote add origin ... 試圖建立同名連結時，Git 就會拒絕並報錯。

#### 如何解決？

要解決這個問題很簡單，有兩種方法可以選擇：

方法一：直接更新現有的遠端連結 (最推薦)

既然 origin 已經存在，與其刪除再重建，不如直接用新的網址覆蓋它。這樣更乾淨俐落。

執行以下指令，將 origin 的遠端倉庫網址更新為你第二個 GitHub 倉庫的正確網址：

```
git remote set-url origin https://github.com/dajia01tw/dajia-demo-source.git
```

方法二：先刪除再重新新增

如果你偏好「先刪除、再新增」的明確步驟，可以這樣操作：

1. 刪除現有的 origin 遠端連結：

```
git remote remove origin
```

或

```
git remote rm origin
```

2. 重新新增正確的遠端連結：

```
git remote add origin https://github.com/dajia01tw/dajia-demo-source.git
```

#### 驗證與後續步驟

完成上述任一方法後，建議先用以下指令查看遠端連結是否已正確指向你的新倉庫：

```
git remote -v
```

確認無誤後，就可以繼續進行推送了：

```
git branch -M main
git push -u origin main
```

____

### 7️⃣ `git branch -M main`

作用：把目前的分支改名為 `main`。

- Git 以前預設是 `master`

- 現在 GitHub 改成 `main`

- 這行指令確保你本機的分支名稱跟 GitHub 一樣

👉 避免推不上去的問題。

____

### 8️⃣ git push -u origin main

作用：把你的本機專案推送到 GitHub 的 main 分支。

- `origin` → 遠端（GitHub）

- `main` → 分支名稱

- `-u` → 讓 Git 記住這個設定，之後可以直接用 `git push`

👉 這是第一次推送。

____

### 9️⃣ `git push`

作用：把後續的更新推送到 GitHub。

因為你之前用了 `-u`，Git 已經記住：

「推到 origin 的 main 分支」

所以你之後只要打：

```
git push
```

就能推上 GitHub。

____

## 🚀 整個流程串起來（你在 VS Code → GitHub → Vercel 的完整部署流程）

1. VS Code 建專案

2. `npm install` → 安裝套件

3. `npm run build` → 測試能不能建置

4. `git init` → 建 Git 儲存庫

5. `git add .` → 加入所有檔案

6. `git commit -m "Initial commit"` → 建立版本

7. `git remote add origin ...` → 連接 GitHub

8. `git branch -M main` → 確保分支名稱一致

9. `git push -u origin main` → 推到 GitHub

10. `Vercel 會自動偵測 GitHub` → 自動部署


