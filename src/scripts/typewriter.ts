export function initTypewriter(elementId: string, words: readonly string[]): void {
  const el = document.getElementById(elementId);
  if (!el || !words.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = words[0];
    return;
  }

  // Use a Text node directly to avoid triggering MutationObserver childList changes
  el.textContent = '';
  const textNode = document.createTextNode('');
  el.appendChild(textNode);

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseTime = 2000;

  const tick = () => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    // Update the Text node's data — this fires characterData mutation, NOT childList
    textNode.data = currentWord.substring(0, charIndex);

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 300;
    }

    setTimeout(tick, delay);
  };

  setTimeout(tick, 500);
}
