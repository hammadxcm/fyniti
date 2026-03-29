import { applyLanguage } from './i18n';

const STORAGE_KEY = 'fyniti-theme';
const THEMES = [
  'hacker',
  'dracula',
  'nord',
  'catppuccin',
  'synthwave',
  'matrix',
  'bloodmoon',
  'midnight',
  'arctic',
  'gruvbox',
  'cyberpunk',
  'nebula',
  'solarized',
  'rosepine',
  'monokai',
] as const;
type ThemeName = (typeof THEMES)[number];

function getStoredTheme(): ThemeName {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && THEMES.includes(stored as ThemeName)) {
    return stored as ThemeName;
  }
  return 'hacker';
}

function applyTheme(theme: ThemeName): void {
  if (theme === 'hacker') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  localStorage.setItem(STORAGE_KEY, theme);

  // Update active state in dropdown
  const options = document.querySelectorAll('.theme-option');
  for (const opt of options) {
    const isActive = opt.getAttribute('data-theme') === theme;
    opt.classList.toggle('active', isActive);
    opt.setAttribute('aria-selected', String(isActive));
  }
}

export function initThemeSwitcher(): void {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const dropdown = document.getElementById('theme-dropdown');
  if (!toggleBtn || !dropdown) return;

  // Apply stored theme on load
  const stored = getStoredTheme();
  applyTheme(stored);

  // Toggle dropdown
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Theme selection
  const options = dropdown.querySelectorAll('.theme-option');
  for (const opt of options) {
    opt.addEventListener('click', () => {
      const theme = opt.getAttribute('data-theme') as ThemeName;
      applyTheme(theme);
      dropdown.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // Close on outside click
  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Prevent dropdown click from closing
  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Random theme button
  const randomBtn = document.getElementById('theme-random-btn');
  if (randomBtn) {
    randomBtn.addEventListener('click', () => {
      const current = getStoredTheme();
      const others = THEMES.filter((t) => t !== current);
      const random = others[Math.floor(Math.random() * others.length)];
      applyTheme(random);
      dropdown.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // Language switcher
  const langToggle = document.getElementById('lang-toggle-btn');
  const langDropdown = document.getElementById('lang-dropdown');

  if (langToggle && langDropdown) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close theme dropdown if open
      dropdown.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      // Toggle lang dropdown
      const isOpen = langDropdown.classList.toggle('open');
      langToggle.setAttribute('aria-expanded', String(isOpen));
    });

    const langOptions = langDropdown.querySelectorAll('.lang-option');
    for (const opt of langOptions) {
      opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang');
        if (lang) {
          applyLanguage(lang as Parameters<typeof applyLanguage>[0]);
          // Update active state
          for (const o of langOptions) {
            o.classList.toggle('active', o.getAttribute('data-lang') === lang);
            o.setAttribute('aria-selected', String(o.getAttribute('data-lang') === lang));
          }
        }
        langDropdown.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
      });
    }

    // Close lang dropdown on outside click
    document.addEventListener('click', () => {
      langDropdown.classList.remove('open');
      langToggle.setAttribute('aria-expanded', 'false');
    });

    langDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        langDropdown.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Also close theme dropdown when opening lang dropdown and vice versa
    toggleBtn.addEventListener('click', () => {
      langDropdown.classList.remove('open');
      langToggle.setAttribute('aria-expanded', 'false');
    });

    // Restore stored language
    const storedLang = localStorage.getItem('fyniti-lang');
    if (storedLang) {
      for (const o of langOptions) {
        o.classList.toggle('active', o.getAttribute('data-lang') === storedLang);
        o.setAttribute('aria-selected', String(o.getAttribute('data-lang') === storedLang));
      }
    }
  }
}
