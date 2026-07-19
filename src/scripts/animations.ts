/**
 * animations.ts
 *
 * Scroll-reveal animation system for Lucky Living.
 * Uses IntersectionObserver — no external libraries, no frameworks.
 *
 * Usage in any .astro template:
 *   <section data-animate="fade-up">...</section>
 *   <div data-animate="fade">...</div>
 *   <aside data-animate="slide">...</aside>
 *   <div data-animate="fade-up" data-delay="200">...</div>
 *
 * Supported values for data-animate:
 *   "fade-up"  — rises 24px while fading in          (default, most used)
 *   "fade"     — pure opacity fade, no movement
 *   "slide"    — slides in from the left, fades in
 *
 * Optional attribute:
 *   data-delay="N"  — N in milliseconds, delays the reveal (e.g. 100, 200, 300)
 *                     Use to stagger siblings without extra CSS classes.
 *
 * How it works:
 *   1. On DOMContentLoaded, this module finds every [data-animate] element.
 *   2. It attaches a single shared IntersectionObserver.
 *   3. When an element enters the viewport (threshold: 12%), the observer
 *      adds the `data-visible` attribute, which triggers the CSS transition.
 *   4. Once revealed, the element is unobserved — no repeated callbacks.
 *   5. Respects prefers-reduced-motion: skips all transforms/opacity if set.
 *
 * Progressive enhancement:
 *   - global.css sets `data-animations-ready` on <html> before any element
 *     becomes invisible, so there is no flash of invisible content.
 *   - If JS is disabled, a <noscript> in BaseLayout ensures everything is visible.
 *   - Elements already in the viewport on page load are revealed immediately
 *     with no animation delay (instant, not deferred).
 */

// ── Types ────────────────────────────────────────────────────

type AnimateValue = 'fade-up' | 'fade' | 'slide';

// ── Reduced-motion check ─────────────────────────────────────
// Checked once at module load — if true, we skip IntersectionObserver
// entirely and just mark every element visible immediately.
const prefersReducedMotion: boolean =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Core reveal function ─────────────────────────────────────

function revealElement(el: Element): void {
  const delay = el.getAttribute('data-delay');

  if (delay && !prefersReducedMotion) {
    // Defer the visible attribute by the requested delay
    setTimeout(() => {
      el.setAttribute('data-visible', '');
    }, parseInt(delay, 10));
  } else {
    el.setAttribute('data-visible', '');
  }
}

// ── IntersectionObserver setup ───────────────────────────────

function initScrollReveal(): void {
  // Signal to CSS that JS is active — this arms the initial-state rules
  document.documentElement.setAttribute('data-animations-ready', '');

  const elements = document.querySelectorAll<HTMLElement>('[data-animate]');

  if (elements.length === 0) return;

  // If reduced motion is preferred, reveal everything immediately and stop.
  if (prefersReducedMotion) {
    elements.forEach((el) => el.setAttribute('data-visible', ''));
    return;
  }

  // Single shared observer — more efficient than one per element.
  // rootMargin: reveal slightly before the element fully enters the viewport
  // so the animation is already playing when the user's eye reaches it.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        revealElement(entry.target);

        // Stop watching — animation plays once and stays visible.
        observer.unobserve(entry.target);
      });
    },
    {
      // 12% of the element must be visible before triggering.
      // Low enough to catch tall elements, high enough to not fire
      // on barely-peeking elements.
      threshold: 0.12,

      // Start the reveal 40px before the element actually enters
      // the viewport — the animation is already in progress when
      // the user's eye lands on it.
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach((el) => {
    // Validate the data-animate value — unknown values still get
    // observed and will receive data-visible, but won't have a
    // CSS animation (no harm done, fails silently).
    const value = el.getAttribute('data-animate') as AnimateValue;
    const valid: AnimateValue[] = ['fade-up', 'fade', 'slide'];

    if (!valid.includes(value)) {
      console.warn(
        `[animations] Unknown data-animate value "${value}" on`,
        el
      );
    }

    observer.observe(el);
  });
}

// ── Boot ─────────────────────────────────────────────────────

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal, { once: true });
  } else {
    // DOMContentLoaded already fired (script deferred / module loaded late)
    initScrollReveal();
  }
}
