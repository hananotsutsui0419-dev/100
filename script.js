const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
    navigation.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMenu();
  });
}

const mobileReserve = document.querySelector('.mobile-reserve');
const inlineReserveButtons = document.querySelectorAll('.button-primary, .button-light');

if (inlineReserveButtons.length && mobileReserve && 'IntersectionObserver' in window) {
  const visibleReserveButtons = new Set();
  const reserveObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleReserveButtons.add(entry.target);
      else visibleReserveButtons.delete(entry.target);
    });
    mobileReserve.classList.toggle('is-visible', visibleReserveButtons.size === 0);
  }, { threshold: 0.1 });

  inlineReserveButtons.forEach((button) => reserveObserver.observe(button));
}
