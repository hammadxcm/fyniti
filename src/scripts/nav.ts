export function initNav(): void {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const desktopMenu = document.getElementById('nav-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!nav || !toggle) return;

  // Hamburger toggle — opens/closes mobile menu
  toggle.addEventListener('click', () => {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll spy — highlight active section
  let ticking = false;

  const handleScroll = () => {
    // Show/hide nav background
    nav.classList.toggle('scrolled', window.scrollY > 50);

    // Active section highlight
    const sections = document.querySelectorAll('section[id]');
    const links = (desktopMenu || mobileMenu)?.querySelectorAll('a[href^="#"]') || [];
    let currentId = '';

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150) {
        currentId = section.id;
      }
    }

    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });

    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    },
    { passive: true },
  );
}
