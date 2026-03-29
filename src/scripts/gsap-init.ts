import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function animateHeroEntrance(): void {
  const tl = gsap.timeline({ delay: 0.3 });

  tl.to('.hero-greeting', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'expo.out',
  })
    .to(
      '.hero-name',
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'expo.out',
      },
      '-=0.5',
    )
    .to(
      '.hero-subtitle',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      },
      '-=0.5',
    )
    .to(
      '.hero-typewriter',
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'expo.out',
      },
      '-=0.4',
    )
    .to(
      '.hero-ctas',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      },
      '-=0.3',
    );
}

function animateStatCounters(): void {
  const statValues = document.querySelectorAll('.stat-value');
  for (const el of statValues) {
    const text = el.textContent ?? '';
    const numMatch = text.match(/(\d+)/);
    if (!numMatch) continue;

    const target = Number.parseInt(numMatch[1], 10);
    const suffix = text.replace(numMatch[1], '');
    const counter = { val: 0 };

    gsap.to(counter, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        (el as HTMLElement).textContent = `${Math.round(counter.val)}${suffix}`;
      },
    });
  }
}

function animateProcessCards(): void {
  const cards = document.querySelectorAll('.process-card');
  for (const [i, card] of Array.from(cards).entries()) {
    gsap.fromTo(
      card,
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: i * 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true,
        },
      },
    );
  }
}

function animateServiceCards(): void {
  const cards = document.querySelectorAll('.service-card');
  for (const card of cards) {
    gsap.fromTo(
      card,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true,
        },
      },
    );
  }
}

function animateScrollProgress(): void {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });
}

export function initGSAP(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Show everything immediately
    gsap.set('.hero-greeting, .hero-name, .hero-subtitle, .hero-typewriter, .hero-ctas', {
      opacity: 1,
      y: 0,
      scale: 1,
    });
    return;
  }

  // Set initial states for hero elements
  gsap.set('.hero-greeting, .hero-subtitle, .hero-typewriter, .hero-ctas', {
    y: 30,
  });
  gsap.set('.hero-name', { y: 40, scale: 0.92 });

  animateHeroEntrance();
  animateStatCounters();
  animateProcessCards();
  animateServiceCards();

  animateScrollProgress();
}
