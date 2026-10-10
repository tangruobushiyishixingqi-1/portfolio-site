(() => {
    const returnStateKey = 'portfolioProjectReturn';
    const returnLink = document.querySelector('.project-return-link');
    if (!returnLink) return;

    returnLink.addEventListener('click', event => {
        try {
            const returnState = JSON.parse(sessionStorage.getItem(returnStateKey) || 'null');
            const isFresh = returnState && Date.now() - returnState.savedAt < 4 * 60 * 60 * 1000;
            if (!isFresh || returnState.projectId !== returnLink.dataset.projectId) return;

            returnState.restoreRequested = true;
            sessionStorage.setItem(returnStateKey, JSON.stringify(returnState));
            if (window.history.length > 1) {
                event.preventDefault();
                window.history.back();
            }
        } catch (error) {
            // The link's project hash is the fallback when session storage is unavailable.
        }
    });
})();
