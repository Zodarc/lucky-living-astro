// ── Lucky Living — Related Content Utility ──────────────────
import type { CollectionEntry } from 'astro:content';

type Article = CollectionEntry<'articles'>;

/**
 * Find related articles for a given article.
 *
 * Priority order:
 *  1. Articles explicitly listed in `relatedArticles` frontmatter
 *  2. Articles in the same category (excluding the current article)
 *  3. Articles sharing at least one tag
 *
 * @param current   The current article entry
 * @param all       All published articles
 * @param limit     Max number of results (default: 3)
 */
export function getRelatedArticles(
  current: Article,
  all: Article[],
  limit = 3
): Article[] {
  const others = all.filter(
    (a) => a.slug !== current.slug && !a.data.draft
  );

  // 1. Explicitly referenced slugs
  const explicit: Article[] = [];
  if (current.data.relatedArticles?.length) {
    for (const slug of current.data.relatedArticles) {
      const match = others.find((a) => a.slug === slug);
      if (match) explicit.push(match);
    }
  }

  if (explicit.length >= limit) return explicit.slice(0, limit);

  // 2. Same category
  const sameCategory = others.filter(
    (a) =>
      a.data.category === current.data.category &&
      !explicit.includes(a)
  );

  // 3. Shared tags
  const currentTags = new Set(current.data.tags ?? []);
  const sharedTags = others
    .filter(
      (a) =>
        !explicit.includes(a) &&
        !sameCategory.includes(a) &&
        (a.data.tags ?? []).some((t) => currentTags.has(t))
    )
    .map((a) => ({
      article:    a,
      // score by number of shared tags
      sharedCount: (a.data.tags ?? []).filter((t) => currentTags.has(t)).length,
    }))
    .sort((a, b) => b.sharedCount - a.sharedCount)
    .map((x) => x.article);

  const candidates = [...explicit, ...sameCategory, ...sharedTags];

  // Sort remaining by most recent publish date
  const sorted = candidates.sort(
    (a, b) =>
      b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );

  return sorted.slice(0, limit);
}

/**
 * Format a Date object as a readable string.
 * e.g. "Jul 1, 2025"
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'short',
    day:   'numeric',
  });
}

/**
 * Format a Date object as an ISO string (for datetime attributes).
 */
export function isoDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
type Product = CollectionEntry<'products'>;

/**
 * Find related products for a product review.
 *
 * Priority:
 * 1. Same category
 * 2. Shared brand
 */
export function getRelatedProducts(
  current: Product,
  all: Product[],
  limit = 3
): Product[] {

  return all
    .filter(
      (p) =>
        p.slug !== current.slug &&
        !p.data.draft &&
        p.data.category === current.data.category
    )
    .slice(0, limit);
}