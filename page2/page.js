(() => {
    const root = document.getElementById('page2-root');
    if (!root) return;

    const projects = [...(window.portfolioProjects || [])].sort((a, b) => a.order - b.order);
    root.innerHTML = `
        <section class="destination-page projects-page" id="projects" aria-labelledby="projects-title">
            <header class="destination-heading">
                <a class="back-home" href="#top">↑ <span>回到首页</span></a>
                <h2 id="projects-title">项目</h2>
                <p class="page-kicker">WHAT  I  MAKE</p>
            </header>
            <div class="project-list">${projects.map(project => project.html).join('')}</div>
            <a class="next-page-link" href="#interests">继续去爱好页 <span>↓</span></a>
        </section>`;

    const cards = root.querySelectorAll('.project-card');
    const returnStateKey = 'portfolioProjectReturn';

    root.addEventListener('click', event => {
        const storyToggle = event.target.closest('#project-smart-stamp [data-story-toggle]');
        if (storyToggle) {
            const story = document.getElementById(storyToggle.getAttribute('aria-controls'));
            if (!story) return;

            const willExpand = storyToggle.getAttribute('aria-expanded') !== 'true';
            storyToggle.setAttribute('aria-expanded', String(willExpand));
            storyToggle.textContent = `一则极其抽象的产品叙事（${willExpand ? '收起' : '展开'}）`;
            story.hidden = !willExpand;
            return;
        }

        const projectLink = event.target.closest('.project-card a[href^="page2/"]');
        if (!projectLink) return;

        const card = projectLink.closest('.project-card');
        if (!card?.id) return;

        try {
            sessionStorage.setItem(returnStateKey, JSON.stringify({
                projectId: card.id,
                scrollY: window.scrollY,
                restoreRequested: false,
                savedAt: Date.now()
            }));
        } catch (error) {
            // The hash fallback still works when session storage is unavailable.
        }
    });

    try {
        const returnState = JSON.parse(sessionStorage.getItem(returnStateKey) || 'null');
        const isFresh = returnState && Date.now() - returnState.savedAt < 4 * 60 * 60 * 1000;
        if (isFresh && returnState.restoreRequested && Number.isFinite(returnState.scrollY)) {
            const restorePosition = () => window.scrollTo(0, returnState.scrollY);
            requestAnimationFrame(() => requestAnimationFrame(restorePosition));
            window.addEventListener('load', restorePosition, { once: true });
            document.fonts?.ready.then(restorePosition);
            sessionStorage.removeItem(returnStateKey);
        }
    } catch (error) {
        sessionStorage.removeItem(returnStateKey);
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduceMotion) {
        cards.forEach(card => card.classList.add('is-visible'));
        return;
    }

    document.documentElement.classList.add('project-reveal-ready');
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    cards.forEach(card => observer.observe(card));
})();
