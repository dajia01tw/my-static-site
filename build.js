const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// ============================================================
// 自製 Front Matter 解析器
// ============================================================
function parseFrontMatter(content) {
    if (!content.trim().startsWith('---')) {
        return { data: {}, content: content };
    }

    const lines = content.split('\n');
    let frontMatterEnd = -1;
    let dashCount = 0;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
            dashCount++;
            if (dashCount === 2) {
                frontMatterEnd = i;
                break;
            }
        }
    }

    if (frontMatterEnd === -1) {
        return { data: {}, content: content };
    }

    const frontMatterLines = lines.slice(1, frontMatterEnd);
    const contentLines = lines.slice(frontMatterEnd + 1);

    const data = {};
    for (const line of frontMatterLines) {
        const trimmedLine = line.trim();
        if (trimmedLine === '') continue;

        const colonIndex = trimmedLine.indexOf(':');
        if (colonIndex === -1) continue;

        const key = trimmedLine.substring(0, colonIndex).trim();
        let value = trimmedLine.substring(colonIndex + 1).trim();

        if (value.startsWith('[') && value.endsWith(']')) {
            const arrayContent = value.substring(1, value.length - 1);
            value = arrayContent.split(',').map(item => item.trim());
        } else if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.substring(1, value.length - 1);
        }

        data[key] = value;
    }

    return {
        data: data,
        content: contentLines.join('\n')
    };
}


// ============================================================
// 產生 RSS
// ============================================================
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

// ============================================================
// 讀取模板
// ============================================================
const layoutTemplate = fs.readFileSync(
    path.join(__dirname, 'src', 'templates', 'layout.html'),
    'utf-8'
);

// ============================================================
// 讀取所有文章
// ============================================================
const postsDir = path.join(__dirname, 'src', 'posts');
const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

console.log(`📄 找到 ${postFiles.length} 篇文章`);

const posts = [];
for (const file of postFiles) {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = parseFrontMatter(content);

    posts.push({
        filename: file,
        title: parsed.data.title || '無標題',
        date: parsed.data.date || '1970-01-01',
        tags: parsed.data.tags || [],
        author: parsed.data.author || '匿名',
        content: parsed.content,
        html: marked.parse(parsed.content)
    });
}

// 依照日期排序（最新在前）
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

console.log(`✅ 載入 ${posts.length} 篇文章`);

// ============================================================
// 建立輸出資料夾
// ============================================================
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir);

// ============================================================
// 產生文章列表 HTML（包含搜尋功能）
// ============================================================
function generatePostList(currentPostFile = null) {
    let html = '';
    for (const post of posts) {
        const isActive = post.filename === currentPostFile;
        const activeClass = isActive ? 'active' : '';

        let tagsHtml = '';
        if (post.tags && post.tags.length > 0) {
            tagsHtml = post.tags.map(tag =>
                `<span class="post-tag">#${tag}</span>`
            ).join(' ');
        }

        const link = post.filename.replace('.md', '.html');

        html += `
            <li class="${activeClass}">
                <a href="${link}">
                    ${post.title}
                    <span class="post-meta">
                        ${post.date} ${tagsHtml}
                    </span>
                </a>
            </li>
        `;
    }
    
    // ✅ 加入搜尋功能的 JavaScript（只加在 index.html）
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

// ============================================================
// 產生每一篇文章的 HTML
// ============================================================
console.log('📝 產生文章頁面...');

for (const post of posts) {
    // 產生文章內容 HTML
    let tagsHtml = '';
    if (post.tags && post.tags.length > 0) {
        tagsHtml = post.tags.map(tag =>
            `<span>#${tag}</span>`
        ).join(' ');
    }

    const contentHtml = `
        <div class="post-header">
            <h1>${post.title}</h1>
            <div class="post-date">📅 ${post.date} · ✍️ ${post.author}</div>
            ${tagsHtml ? `<div class="post-tags">${tagsHtml}</div>` : ''}
        </div>
        ${post.html}
    `;

    // 產生文章列表（當前文章會被標示為 active）
    const postListHtml = generatePostList(post.filename);

    // 替換模板中的佔位符
    const finalHtml = layoutTemplate
        .replace(/{{title}}/g, post.title)
        .replace('{{postList}}', postListHtml)
        .replace('{{content}}', contentHtml);

    // 寫入檔案
    const outputFile = post.filename.replace('.md', '.html');
    const outputPath = path.join(distDir, outputFile);
    fs.writeFileSync(outputPath, finalHtml);
    console.log(`  ✅ ${outputFile}`);
}


// ============================================================
// 產生首頁（顯示最新文章）
// ============================================================
console.log('🏠 產生首頁...');


// 在 posts 載入完成後加入
// 先在這裡定義 generateTagCloud 函數
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

// 然後在這邊使用它 tagCloudHtml = generateTagCloud();
const tagCloudHtml = generateTagCloud();

// 在 build 流程中加入
generateRSS();

const firstPost = posts[0];
let homeContent = '';

if (firstPost) {
    let tagsHtml = '';
    if (firstPost.tags && firstPost.tags.length > 0) {
        tagsHtml = firstPost.tags.map(tag =>
            `<span>#${tag}</span>`
        ).join(' ');
    }

    homeContent = `
        <div class="post-header">
            <h1>${firstPost.title}</h1>
            <div class="post-date">📅 ${firstPost.date} · ✍️ ${firstPost.author}</div>
            ${tagsHtml ? `<div class="post-tags">${tagsHtml}</div>` : ''}
        </div>
        ${firstPost.html}
    `;
} else {
    homeContent = `
        <div class="welcome">
            <h1>👋 歡迎來到我的部落格</h1>
            <p>目前沒有文章</p>
        </div>
    `;
}

// ✅ 傳入 null 表示正在產生首頁，會在文章列表後加入搜尋功能
const postListHtml = generatePostList(null);
const finalHtml = layoutTemplate
    .replace(/{{title}}/g, '我的部落格')
    .replace('{{postList}}', postListHtml + tagCloudHtml)  // ← 這裡加了 tagCloudHtml
    .replace('{{content}}', homeContent);

fs.writeFileSync(path.join(distDir, 'index.html'), finalHtml);
console.log('  ✅ index.html');


// ============================================================
// 如果文章超過 5 篇，加入分頁功能
// ============================================================

const postsPerPage = 5;
const totalPages = Math.ceil(posts.length / postsPerPage);

for (let page = 1; page <= totalPages; page++) {
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);
    // 產生 page-${page}.html
}

// ============================================================
// 複製文章 .md 檔案到 dist（可選，方便查看原始碼）
// ============================================================
const postsDistDir = path.join(distDir, 'posts');
fs.mkdirSync(postsDistDir);
for (const post of posts) {
    const srcPath = path.join(postsDir, post.filename);
    const destPath = path.join(postsDistDir, post.filename);
    fs.copyFileSync(srcPath, destPath);
}

console.log('📊 複製 .md 檔案到 dist/posts/');

// ============================================================
// 完成！
// ============================================================
console.log('🎉 建構完成！');
console.log(`📁 輸出目錄: ${distDir}`);
console.log('🚀 可以用 Live Server 開啟 dist/index.html 預覽');