(() => {
    const projectsPage = document.querySelector('.projects-page');
    const projectCards = [...document.querySelectorAll('.projects-page .project-card')].slice(0, 4);
    if (!projectsPage || projectCards.length < 4) return;

    const overlay = document.createElement('div');
    overlay.className = 'project-feather-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
        <div class="project-feather-overlay__drift">
            <img
                class="project-feather-overlay__image"
                src="feather-overlay/feather.svg?v=20261011-2"
                alt=""
                draggable="false"
            >
        </div>`;
    projectsPage.append(overlay);

    let frame = 0;
    const updateBounds = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            const pageBounds = projectsPage.getBoundingClientRect();
            const firstBounds = projectCards[0].getBoundingClientRect();
            const fourthBounds = projectCards[3].getBoundingClientRect();
            const top = firstBounds.top - pageBounds.top + firstBounds.height / 2;
            const height = fourthBounds.bottom - firstBounds.top;

            overlay.style.setProperty('--project-feather-top', `${Math.round(top)}px`);
            overlay.style.setProperty('--project-feather-height', `${Math.round(height)}px`);
            frame = 0;
        });
    };

    updateBounds();
    window.addEventListener('load', updateBounds, { once: true });
    window.addEventListener('resize', updateBounds, { passive: true });
    document.fonts?.ready.then(updateBounds);

    if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(updateBounds);
        projectCards.forEach(card => observer.observe(card));
    }
})();
