(() => {
  const nativePetSelector = '.mobile-pet-dock, .pet-window-root';
  const messages = [
    '嗨，今天也一起好好记录吧！',
    '记得喝水，我会陪着你。',
    '慢慢来，每一点进步都算数。'
  ];

  const mountDefaultPet = () => {
    if (document.querySelector(nativePetSelector) || document.querySelector('.dietpet-default-pet')) return;

    const pet = document.createElement('aside');
    pet.className = 'dietpet-default-pet';
    pet.setAttribute('aria-label', '默认动态桌宠');
    pet.innerHTML = `
      <p class="dietpet-default-pet__message" role="status" aria-live="polite"></p>
      <button class="dietpet-default-pet__button" type="button" aria-label="和默认桌宠 jili 互动">
        <img src="./assets/TB：吉利chan (1)-CRZo6FZc.gif" alt="动态桌宠 jili">
      </button>`;
    document.body.appendChild(pet);

    const message = pet.querySelector('.dietpet-default-pet__message');
    const button = pet.querySelector('.dietpet-default-pet__button');
    let messageIndex = 0;
    let hideTimer;

    const speak = () => {
      message.textContent = messages[messageIndex % messages.length];
      messageIndex += 1;
      message.classList.add('is-visible');
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => message.classList.remove('is-visible'), 3000);
    };

    button.addEventListener('click', speak);
    window.requestAnimationFrame(speak);

    const root = document.getElementById('root');
    if (!root) return;
    const observer = new MutationObserver(() => {
      const nativePet = document.querySelector(nativePetSelector);
      if (!nativePet || pet.contains(nativePet)) return;
      window.clearTimeout(hideTimer);
      pet.remove();
      observer.disconnect();
    });
    observer.observe(root, { childList: true, subtree: true });
  };

  if (document.readyState === 'complete') mountDefaultPet();
  else window.addEventListener('load', mountDefaultPet, { once: true });
})();
