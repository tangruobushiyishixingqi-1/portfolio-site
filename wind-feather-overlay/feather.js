(() => {
    const details = document.querySelector('.details');
    const projectFive = document.querySelector('.projects-page .project-card:nth-child(5)');
    const interestsPage = document.querySelector('.interests-page');
    if (!details || !projectFive || !interestsPage) return;

    const overlay = document.createElement('div');
    overlay.className = 'wind-feather-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
        <div class="wind-feather-overlay__drift">
            <img
                class="wind-feather-overlay__image"
                src="wind-feather-overlay/feather.svg?v=20261011-5"
                alt=""
                draggable="false"
            >
        </div>`;
    details.append(overlay);

    let frame = 0;
    const updateBounds = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            const detailsBounds = details.getBoundingClientRect();
            const projectBounds = projectFive.getBoundingClientRect();
            const interestsBounds = interestsPage.getBoundingClientRect();
            const top = projectBounds.top - detailsBounds.top;
            const end = interestsBounds.top - detailsBounds.top + interestsBounds.height / 2;
            const height = Math.max(end - top, projectBounds.height * 2);

            overlay.style.setProperty('--wind-feather-top', `${Math.round(top)}px`);
            overlay.style.setProperty('--wind-feather-height', `${Math.round(height)}px`);
            frame = 0;
        });
    };

    updateBounds();
    window.addEventListener('load', updateBounds, { once: true });
    window.addEventListener('resize', updateBounds, { passive: true });
    document.fonts?.ready.then(updateBounds);

    if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(updateBounds);
        observer.observe(projectFive);
        observer.observe(interestsPage);
    }
})();
