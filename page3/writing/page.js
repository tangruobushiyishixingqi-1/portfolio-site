const source = window.NOVELS_MARKDOWN || '';

const escapeHtml = value => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const blocks = source.split(/^## 文章[一二三]\s*$/m).slice(1);
const articleTypes = ['史同小说', '现实小说', '童话改写'];

const articles = blocks.map((block, index) => {
    const title = block.match(/### 名称\s*\n([^\n]+)/)?.[1]?.trim() || `文章${index + 1}`;
    const intro = block.match(/### 简介\s*\n([\s\S]*?)\n### 内容/)?.[1]
        ?.split('\n')
        .map(line => line.trim())
        .filter(Boolean) || [];
    const body = block.match(/### 内容\s*\n([\s\S]*)/)?.[1]?.trim() || '';

    return {
        id: `article-${index + 1}`,
        number: String(index + 1).padStart(2, '0'),
        title,
        type: articleTypes[index],
        intro,
        body,
        warning: index === 1 ? '内容提示：本文涉及网暴、自杀及死亡描写。' : ''
    };
});

const articleNav = document.getElementById('article-nav');
const articleReader = document.getElementById('article-reader');

const renderBody = body => body
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
        const content = escapeHtml(line);
        if (/^Chapter \d+\.$/.test(line) || /^[一二三][．.、].+/.test(line)) {
            return `<h3>${content}</h3>`;
        }
        return `<p>${content}</p>`;
    })
    .join('');

articleNav.innerHTML = `
    ${articles.map(article => `
        <a href="#${article.id}" data-article="${article.id}">
            <span>${article.number}</span>
            <span class="nav-copy">
                <strong>${escapeHtml(article.title)}</strong>
                <small>${article.intro.map(escapeHtml).join(' · ')}</small>
            </span>
        </a>
    `).join('')}
    <p class="more-writing">
        <span>04</span>
        <strong>更多内容欢迎去小说阅读网站寻觅</strong>
    </p>
`;

const navLinks = [...articleNav.querySelectorAll('a')];

const renderArticle = article => {
    articleReader.innerHTML = `
        <article class="article-content" id="${article.id}">
            <header class="article-heading">
                <p class="article-eyebrow">MY WRITING</p>
                <div class="article-meta">
                    <span>${article.number}</span>
                    <span>${escapeHtml(article.type)}</span>
                </div>
                <h2>${escapeHtml(article.title)}</h2>
                <div class="article-intro">
                    ${article.intro.map(line => `<p>${escapeHtml(line)}</p>`).join('')}
                </div>
                ${article.warning ? `<p class="content-warning">${escapeHtml(article.warning)}</p>` : ''}
            </header>
            <div class="article-body">${renderBody(article.body)}</div>
        </article>
    `;

    navLinks.forEach(link => {
        const isActive = link.dataset.article === article.id;
        link.classList.toggle('is-active', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
};

const selectArticle = articleId => {
    const article = articles.find(item => item.id === articleId) || articles[0];
    if (!article) return;
    renderArticle(article);
};

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const articleId = link.dataset.article;
        history.replaceState(null, '', `#${articleId}`);
        selectArticle(articleId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

window.addEventListener('hashchange', () => selectArticle(location.hash.slice(1)));
selectArticle(location.hash.slice(1));
