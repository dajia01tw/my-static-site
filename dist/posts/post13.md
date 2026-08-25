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

### 8️⃣ `git push -u origin main`

作用：把你的本機專案推送到 GitHub 的 main 分支。

- `origin` → 遠端（GitHub）

- `main` → 分支名稱

- `-u` → 讓 Git 記住這個設定，之後可以直接用 `git push`

👉 這是第一次推送。

> 有時執行 `git push -u origin main` 出現：被拒絕的錯誤訊息。

#### ❌ 結果：被拒絕（rejected）

```
! [rejected] main -> main (fetch first)
Updates were rejected because the remote contains work that you do not have locally.
```

意思是：

GitHub 的 main 分支裡已經有東西，而你本機的 main 是空的或不同步，所以 Git 不讓你覆蓋遠端。

這通常發生在：

- 你先在 GitHub 建了 README.md

- 或你之前推過東西

- 或你在 GitHub 上按過「Add file」

總之：遠端不是空的，而本機是空的 → 推不上去。

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

> 有時執行 `git push` 出現：錯誤訊息。

> fatal: The current branch main has no upstream branch.
> To push the current branch and set the remote as upstream, use
> 
>     git push --set-upstream origin main
> 
> To have this happen automatically for branches without a tracking
> upstream, see 'push.autoSetupRemote' in 'git help config'.

錯誤訊息：

```
fatal: The current branch main has no upstream branch.
```

意思是：

你還沒有設定「本機 main 要推到哪裡」，所以 Git 不知道要推去哪裡。

Git 建議你：

```
git push --set-upstream origin main
```

但如果你照做，還是會失敗，因為 遠端有內容，本機沒有同步。

#### 🧩 為什麼會這樣？

你的本機專案（demo-site）是新的，但 GitHub 上的 repo（dajia-demo-source）不是空的。

Git 的規則是：

不能把本機空的 main 推上去覆蓋遠端已有內容。

所以 Git 要求你：

先把 GitHub 的內容拉回來（pull），再推送。

#### ✅ 正確處理方式（一步一步）

✔ 步驟 1：先拉取遠端內容

在你的專案資料夾執行：

```
git pull origin main --allow-unrelated-histories
```

為什麼要加 `--allow-unrelated-histories`？

因為：

- 本機是新的 Git 專案

- 遠端也有自己的歷史

- Git 會認為兩邊「沒有共同祖先」

- 所以需要允許合併兩個不相關的歷史

✔ 步驟 2：解決可能的合併衝突（如果有）

如果 GitHub 上有 README.md，而你本機也有 README.md，可能會出現衝突。

你只要：

1. 打開 VS Code

2. 看有沒有衝突標記

3. 手動選擇保留哪一段

4. 然後：

```
git add .
git commit -m "Merge remote main"
```

✔ 步驟 3：再推送一次

```
git push -u origin main
```

這次就會成功。

#### 🟦 如果你不想合併，只想覆蓋 GitHub（危險）

如果你確定 GitHub 上的內容可以刪掉，你可以強制覆蓋：

```
git push -u origin main --force
```

⚠️ 這會刪掉 GitHub 上的所有歷史與檔案。

請小心使用。

#### 🎉 最終總結（最重要的三句話）

- 你推不上去，是因為 GitHub 有內容，本機沒有同步

- 解法是：先 pull，再 push

- 如果你想覆蓋 GitHub：git push --force

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


