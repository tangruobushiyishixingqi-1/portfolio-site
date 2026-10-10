(() => {
    const page = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = document.querySelectorAll(
        '.destination-heading, .interest-card, .next-page-link'
    );
    const feather = variant => `
        <svg class="section-feather section-feather--${variant}" viewBox="0 0 120 260" fill="none" aria-hidden="true">
            <path d="M99 12C45 44 17 105 23 170c4 42 30 69 42 78 2-35 11-62 28-91 22-38 28-91 6-145Z" fill="currentColor" fill-opacity=".13"/>
            <path d="M24 244c16-73 43-137 78-232M39 196l-24-32m37 1-31-35m45 1L42 91m57 6L72 67m34 1L83 38" stroke="currentColor" stroke-opacity=".4" stroke-width="1.1" stroke-linecap="round"/>
        </svg>`;

    document.querySelectorAll('.projects-page, .interests-page').forEach(section => {
        const type = section.classList.contains('projects-page') ? 'projects' : 'interests';
        const ornaments = document.createElement('div');
        ornaments.className = `section-ornaments section-ornaments--${type}`;
        ornaments.setAttribute('aria-hidden', 'true');
        ornaments.innerHTML = `<div class="section-sparkles">${'<i></i>'.repeat(8)}</div>${[1, 2, 3].map(feather).join('')}`;
        section.prepend(ornaments);
    });

    page.classList.add('motion-ready');
    requestAnimationFrame(() => requestAnimationFrame(() => page.classList.add('motion-active')));

    revealTargets.forEach(target => target.classList.add('motion-reveal'));

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach(target => target.classList.add('is-motion-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-motion-visible');
            currentObserver.unobserve(entry.target);
        });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

    revealTargets.forEach(target => observer.observe(target));

    const home = document.querySelector('.home');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!home || !finePointer) return;

    let frame = 0;
    const moveSky = event => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            const x = ((event.clientX / window.innerWidth) - 0.5) * 10;
            const y = ((event.clientY / window.innerHeight) - 0.5) * 8;
            home.style.setProperty('--motion-x', `${x.toFixed(2)}px`);
            home.style.setProperty('--motion-y', `${y.toFixed(2)}px`);
        });
    };

    home.addEventListener('pointermove', moveSky, { passive: true });
    home.addEventListener('pointerleave', () => {
        home.style.setProperty('--motion-x', '0px');
        home.style.setProperty('--motion-y', '0px');
    });
})();
