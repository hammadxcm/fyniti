export function initNav(): void {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!nav || !toggle || !menu) return;

  // Hamburger toggle
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on link click
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
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
    const links = menu.querySelectorAll('a[href^="#"]');
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
