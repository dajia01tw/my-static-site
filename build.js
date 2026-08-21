const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// ============================================================
// 自製 Front Matter 解析器
// ============================================================
function parseFrontMatter(content) {
    // 檢查是否以 --- 開頭
    if (!content.trim().startsWith('---')) {
        return { data: {}, content: content };
    }

    const lines = content.split('\n');
    let frontMatterEnd = -1;
    let dashCount = 0;

    // 尋找第二個 ---
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
            dashCount++;
            if (dashCount === 2) {
                frontMatterEnd = i;
                break;
            }
        }
    }

    // 若格式錯誤，直接回傳
    if (frontMatterEnd === -1) {
        return { data: {}, content: content };
    }

    const frontMatterLines = lines.slice(1, frontMatterEnd);
    const contentLines = lines.slice(frontMatterEnd + 1);

    // 解析 key: value
    const data = {};
    for (const line of frontMatterLines) {
        const trimmedLine = line.trim();
        if (trimmedLine === '') continue;

        const colonIndex = trimmedLine.indexOf(':');
        if (colonIndex === -1) continue;

        const key = trimmedLine.substring(0, colonIndex).trim();
        let value = trimmedLine.substring(colonIndex + 1).trim();

        // 處理陣列 (例如 tags: [生活, 心得])
        if (value.startsWith('[') && value.endsWith(']')) {
            const arrayContent = value.substring(1, value.length - 1);
            value = arrayContent.split(',').map(item => item.trim());
        }
        // 移除字串引號
        else if ((value.startsWith('"') && value.endsWith('"')) ||
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
// 建立輸出資料夾（清空 dist）
// ============================================================
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir);

// ============================================================
// 工具函數：產生側邊欄文章列表（僅顯示前 10 篇，超過則加「查看更多」）
// ============================================================
function generateSidebarList(currentPostFile = null) {
    let html = '';
    // 只顯示前 10 篇
    const displayPosts = posts.slice(0, 10);
    for (const post of displayPosts) {
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

    // 如果總文章數超過 10 篇，加入「查看更多」連結
    if (posts.length > 10) {
        html += `<li style="text-align: center; margin-top: 10px;">
                    <a href="page-2.html" style="color: #3498db; font-weight: bold;">查看更多文章 →</a>
                </li>`;
    }

    // 加入搜尋功能（僅在首頁）
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
// 🆕 工具函數：取得相關文章（相同標籤，最多 3 篇）
// ============================================================
function getRelatedPosts(currentPost, limit = 3) {
    const tags = currentPost.tags || [];
    if (tags.length === 0) return [];

    return posts
        .filter(p => p.filename !== currentPost.filename) // 排除自己
        .filter(p => p.tags && p.tags.some(t => tags.includes(t))) // 至少一個相同標籤
        .slice(0, limit);
}

// ============================================================
// 產生所有文章頁面（包含相關文章）
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

    // ---- 相關文章區塊 ----
    const relatedPosts = getRelatedPosts(post);
    let relatedHtml = '';
    if (relatedPosts.length > 0) {
        relatedHtml = `
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #ecf0f1;">
                <h3 style="color: #2c3e50;">📖 相關文章</h3>
                <ul style="list-style: none; padding: 0;">
        `;
        for (const rel of relatedPosts) {
            const link = rel.filename.replace('.md', '.html');
            relatedHtml += `
                <li style="padding: 5px 0;">
                    <a href="${link}" style="color: #3498db; text-decoration: none;">
                        ${rel.title}
                    </a>
                    <span style="font-size: 12px; color: #7f8c8d;"> (${rel.date})</span>
                </li>
            `;
        }
        relatedHtml += `</ul></div>`;
    }

    // 組裝內容
    const contentHtml = `
        <div class="post-header">
            <h1>${post.title}</h1>
            <div class="post-date">📅 ${post.date} · ✍️ ${post.author}</div>
            ${tagsHtml ? `<div class="post-tags">${tagsHtml}</div>` : ''}
        </div>
        ${post.html}
        ${relatedHtml}
    `;

    // 側邊欄列表（當前文章高亮）
    const sidebarHtml = generateSidebarList(post.filename);

    const finalHtml = layoutTemplate
        .replace(/{{title}}/g, post.title)
        .replace('{{postList}}', sidebarHtml)
        .replace('{{content}}', contentHtml);

    const outputFile = post.filename.replace('.md', '.html');
    const outputPath = path.join(distDir, outputFile);
    fs.writeFileSync(outputPath, finalHtml);
    console.log(`  ✅ ${outputFile}`);
}

// ============================================================
// 🆕 統一產生首頁與分頁（將首頁視為第 1 頁）
// ============================================================
const postsPerPage = 10;
const totalPages = Math.ceil(posts.length / postsPerPage);

console.log(`📑 產生 ${totalPages} 個分頁（每頁 ${postsPerPage} 篇）...`);

for (let page = 1; page <= totalPages; page++) {
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    // 產生該頁的文章列表（純文章標題，不含側邊欄樣式）
    let pagePostListHtml = '';
    for (const post of pagePosts) {
        const link = post.filename.replace('.md', '.html');
        let tagsHtml = '';
        if (post.tags && post.tags.length > 0) {
            tagsHtml = post.tags.map(tag =>
                `<span class="post-tag">#${tag}</span>`
            ).join(' ');
        }

        pagePostListHtml += `
            <li style="padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
                <a href="${link}" style="font-size: 16px; color: #2c3e50; text-decoration: none;">
                    ${post.title}
                </a>
                <span style="display: block; font-size: 12px; color: #7f8c8d; margin-top: 2px;">
                    ${post.date} ${tagsHtml}
                </span>
            </li>
        `;
    }

    // 分頁導航
    let paginationHtml = '<div style="margin-top: 30px; text-align: center; padding: 15px 0;">';
    if (page > 1) {
        const prevPage = page === 2 ? 'index.html' : `page-${page-1}.html`;
        paginationHtml += `<a href="${prevPage}" style="margin-right: 20px;">⬅ 上一頁</a>`;
    }
    paginationHtml += `<span style="margin: 0 15px; color: #7f8c8d;">第 ${page} / ${totalPages} 頁</span>`;
    if (page < totalPages) {
        paginationHtml += `<a href="page-${page+1}.html" style="margin-left: 20px;">下一頁 ➡</a>`;
    }
    paginationHtml += '</div>';

    // 組裝內容
    const pageContentHtml = `
        <div class="post-header">
            <h1>📄 文章列表 - 第 ${page} 頁</h1>
        </div>
        <ul style="list-style: none; padding: 0;">
            ${pagePostListHtml}
        </ul>
        ${paginationHtml}
    `;

    // 側邊欄（分頁頁面不需要搜尋框，且不需要高亮，傳入 null 表示不特別標示）
    const sidebarHtml = generateSidebarList(null);

    // 頁面標題
    const pageTitle = page === 1 ? '我的部落格' : `文章列表 - 第 ${page} 頁`;

    const pageHtml = layoutTemplate
        .replace(/{{title}}/g, pageTitle)
        .replace('{{postList}}', sidebarHtml)
        .replace('{{content}}', pageContentHtml);

    // 檔案名稱：首頁為 index.html，其餘為 page-{page}.html
    const pageFileName = page === 1 ? 'index.html' : `page-${page}.html`;
    fs.writeFileSync(path.join(distDir, pageFileName), pageHtml);
    console.log(`  ✅ ${pageFileName}`);
}

// ============================================================
// 複製原始 .md 檔案到 dist（方便查看原始碼）
// ============================================================
const postsDistDir = path.join(distDir, 'posts');
fs.mkdirSync(postsDistDir);
for (const post of posts) {
    const srcPath = path.join(postsDir, post.filename);
    const destPath = path.join(postsDistDir, post.filename);
    fs.copyFileSync(srcPath, destPath);
}
console.log(`📊 複製 .md 檔案到 dist/posts/`);

// ============================================================
// 完成！
// ============================================================
console.log('🎉 建構完成！');
console.log(`📁 輸出目錄: ${distDir}`);
console.log('🚀 可以用 Live Server 開啟 dist/index.html 預覽');