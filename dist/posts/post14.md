---
title: Git 常用指令速查表（Cheat Sheet）
date: 2026-08-21
tags: [網站, 心得, Git]
author: Kai, copilot
---

# Git 常用指令速查表（Cheat Sheet）

這份速查表整理了日常開發、版本控制、推送、分支管理等最常用的 Git 指令，適用 VS Code、GitHub、Vercel 的工作流程。

____

## 📦 初始化與設定

### 建立新的 Git 儲存庫

```
git init
```


### 查看目前 Git 設定

```
git config --list
```


### 設定使用者名稱與 Email（提交紀錄會用到）

```
git config --global user.name "你的名字"
git config --global user.email "你的Email"
```

____

## 📥 加入與提交（Add & Commit）


### 將所有檔案加入暫存區

```
git add .
```


### 加入單一檔案

```
git add filename.txt
```


### 建立提交（commit）

```
git commit -m "提交說明"
```


### 修改上一個 commit 的訊息

```
git commit --amend -m "新的提交說明"
```

____

## 📤 推送到 GitHub（Push）

### 第一次推送到遠端（設定 upstream）

```
git push -u origin main
```

### 之後的推送

```
git push
```

____

## 📥 從 GitHub 拉取更新（Pull）

### 拉取最新版本

```
git pull
```

____

## 🔗 連接遠端儲存庫（Remote）

### 新增遠端儲存庫

```
git remote add origin https://github.com/USERNAME/REPO.git
```

### 查看遠端設定

```
git remote -v
```

### 移除遠端

```
git remote remove origin
```

____

## 🌿 分支管理（Branch）

### 查看所有分支

```
git branch
```

### 建立新分支

```
git branch feature-login
```

### 切換分支

```
git checkout feature-login
```

### 建立並切換分支（常用）

```
git checkout -b feature-login
```

### 刪除分支

```
git branch -d feature-login
```

### 強制刪除分支

```
git branch -D feature-login
```

____

## 🔀 合併（Merge）

### 將某分支合併到目前分支

```
git merge feature-login
```

____

## 📜 查看紀錄（Log & Status）

### 查看目前狀態

```
git status
```

### 查看提交紀錄（簡潔版）

```
git log --oneline
```

### 查看提交紀錄（完整）

```
git log
```

____

## ♻️ 回復與還原（Reset & Restore）

### 還原暫存區的檔案

```
git restore --staged filename.txt
```

### 還原工作區的檔案

```
git restore filename.txt
```

### 回到某個 commit（危險操作）

```
git reset --hard <commit-id>
```

____

## 🧹 清除（Clean）

### 清除未追蹤的檔案

```
git clean -f
```



