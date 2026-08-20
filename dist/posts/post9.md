---
title: Day 06 進階功能與自動化
date: 2026-08-15
tags: [工具, GitHub, Vercel, 心得]
author: Kai、deepseek
---

# Day 06 進階功能與自動化

今天的目標是：

## Day 6 的目標

1. 加入文章搜尋功能

2. 加入標籤雲（Tag Cloud）

3. 自動產生 RSS 訂閱

4. 設定自動部署（GitHub + Vercel）

___

## Step 1：加入文章搜尋功能

在 src/templates/layout.html 中，在側邊欄加入搜尋框：

```
html
<aside class="sidebar">
    <h2>📚 文章列表</h2>
    
    <!-- 新增搜尋框 -->
    <div style="margin-bottom: 15px;">
        <input type="text" id="searchInput" placeholder="🔍 搜尋文章..." 
               style="width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
    </div>
    
    <ul class="post-list" id="postList">
        {{postList}}
    </ul>
</aside>
```

然後在 build.js 中，在 generatePostList 函數中加入搜尋功能的 JavaScript：

```
javascript
function generatePostList(currentPostFile = null) {
    let html = '';
    for (const post of posts) {
        // ... 原本的程式碼 ...
    }
    
    // 加入搜尋功能的 JavaScript（只加在 index.html）
    if (currentPostFile === null) {
        html += `
        <script>
            document.getElementById('searchInput').addEventListener('input', function() {
                const query = this.value.toLowerCase();
                const items = document.querySelectorAll('#postList li');
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(query) ? '' : 'none';
                });
            });
        </script>
        `;
    }
    
    return html;
}
```

___

## Step 2：加入標籤雲

在 build.js 中，加入標籤統計功能：

```
javascript
// 在 posts 載入完成後加入
function generateTagCloud() {
    const tagCount = {};
    for (const post of posts) {
        if (post.tags) {
            for (const tag of post.tags) {
                tagCount[tag] = (tagCount[tag] || 0) + 1;
            }
        }
    }
    
    let html = '<div class="tag-cloud">';
    for (const [tag, count] of Object.entries(tagCount)) {
        const size = 12 + count * 4; // 根據文章數量調整字體大小
        html += `<span style="font-size: ${size}px; margin: 4px; display: inline-block; background: #ecf0f1; padding: 2px 10px; border-radius: 12px;">#${tag} (${count})</span>`;
    }
    html += '</div>';
    return html;
}

// 在 index.html 生成時加入
const tagCloudHtml = generateTagCloud();
const finalHtml = layoutTemplate
    .replace(/{{title}}/g, '我的部落格')
    .replace('{{postList}}', postListHtml + tagCloudHtml)
    .replace('{{content}}', homeContent);
```

___

## Step 3：自動產生 RSS 訂閱

建立一個新的模板檔案 src/templates/rss.xml：

```
xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>我的部落格</title>
        <link>https://your-site.vercel.app</link>
        <description>使用 Markdown 生成的靜態部落格</description>
        <language>zh-tw</language>
        <lastBuildDate>{{lastBuildDate}}</lastBuildDate>
        <atom:link href="https://your-site.vercel.app/rss.xml" rel="self" type="application/rss+xml"/>
        
        {{items}}
    </channel>
</rss>
```

在 build.js 中產生 RSS：

```
javascript
// 產生 RSS
function generateRSS() {
    const now = new Date().toUTCString();
    let itemsHtml = '';
    
    for (const post of posts.slice(0, 10)) { // 只顯示最近10篇
        const pubDate = new Date(post.date).toUTCString();
        const link = `https://your-site.vercel.app/${post.filename.replace('.md', '.html')}`;
        
        itemsHtml += `
        <item>
            <title>${post.title}</title>
            <link>${link}</link>
            <guid>${link}</guid>
            <pubDate>${pubDate}</pubDate>
            <description><![CDATA[${post.html.substring(0, 200)}...]]></description>
        </item>
        `;
    }
    
    const rssContent = fs.readFileSync(
        path.join(__dirname, 'src', 'templates', 'rss.xml'),
        'utf-8'
    ).replace('{{lastBuildDate}}', now).replace('{{items}}', itemsHtml);
    
    fs.writeFileSync(path.join(distDir, 'rss.xml'), rssContent);
    console.log('  ✅ rss.xml');
}

// 在 build 流程中加入
generateRSS();
```

___

## Step 4：設定自動部署（GitHub + Vercel）

### 4.1 建立 GitHub 倉庫

1. 前往 https://github.com/new

2. 倉庫名稱輸入 my-static-site

3. 選擇「Public」（公開）

4. 點擊「Create repository」

### 4.2 上傳程式碼到 GitHub

在 VS Code 終端機中執行：

```
bash
# 初始化 Git
git init

# 加入所有檔案
git add .

# 提交
git commit -m "Initial commit"

# 連結到 GitHub（把 YOUR_USERNAME 換成你的帳號）
git remote add origin https://github.com/YOUR_USERNAME/my-static-site.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 4.3 連結 Vercel 與 GitHub

1. 回到 Vercel 儀表板

2. 點擊 「Add New...」→「Project」

3. 選擇 「GitHub」

4. 找到 my-static-site 倉庫

5. 點擊 「Import」

6. 設定：

  1. Framework Preset：Other

  2. Build Command：npm run build

  3. Output Directory：dist

7. 點擊 「Deploy」

從現在開始，每次你修改程式碼並推送到 GitHub，Vercel 就會自動重新部署你的網站！


___

## Step 5：進階挑戰（選擇性）

### 5.1 加入文章分頁

如果文章超過 10 篇，加入分頁功能：

```
javascript
const postsPerPage = 10;
const totalPages = Math.ceil(posts.length / postsPerPage);

for (let page = 1; page <= totalPages; page++) {
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);
    // 產生 page-${page}.html
}
```

### 5.2 加入「相關文章」

在文章底部顯示相同標籤的文章：

```
javascript
function getRelatedPosts(currentPost, limit = 3) {
    const tags = currentPost.tags || [];
    return posts
        .filter(p => p.filename !== currentPost.filename)
        .filter(p => p.tags && p.tags.some(t => tags.includes(t)))
        .slice(0, limit);
}
```

___


## Day 6 完成標準

- 側邊欄有搜尋框，輸入文字能過濾文章

- □ 標籤雲正常顯示，字體大小根據文章數量變化

- □ rss.xml 成功產生，內容正確

- □ （進階）成功連結 GitHub 和 Vercel，實現自動部署

___

## 你現在的技能樹

<table border="1">
  <tr>
    <th>階段</th>
    <th>技能</th>
  </tr>
  <tr>
    <td> **Day 1-2** </td>
    <td> HTML + JavaScript + Markdown 基礎 </td>
  </tr>
  <tr>
    <td> **Day 3-4** </td>
    <td> 動態載入、Front Matter、自製解析器 </td>
  </tr>
  <tr>
    <td> **Day 5** </td>
    <td> Node.js 靜態網站生成、部署 </td>
  </tr>
  <tr>
    <td> **Day 6** </td>
    <td> 進階功能、自動化部署 </td>
  </tr>
</table>

　.

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

table, th, td {
  border: 1px solid #ccc;
}

th, td {
  padding: 8px;
}
</style>


| 階段 | 技能 |
| ---- | ---- |
| Day 1-2 | HTML + JavaScript + Markdown 基礎 |
| Day 3-4 | 動態載入、Front Matter、自製解析器 |
| Day 5 | Node.js 靜態網站生成、部署 |
| Day 6 | 進階功能、自動化部署 |

___



## 下一步還可以學什麼？

- 加入 CSS 框架：例如 Tailwind CSS，讓樣式更漂亮

- 加入留言功能：使用 Disqus 或 Giscus

- 加入 Google Analytics：追蹤網站流量

- 加入圖片優化：自動壓縮圖片、產生 WebP 格式

- 加入深色模式：根據使用者偏好自動切換




