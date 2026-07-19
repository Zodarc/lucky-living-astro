// ── Lucky Living — Reading Time Utility ─────────────────────

const WORDS_PER_MINUTE = 238; // average adult reading speed

/**
 * Estimate reading time for a body of text.
 * Returns a human-readable string e.g. "5 min read".
 *
 * @param text  Raw text content (HTML tags are stripped automatically)
 */
export function getReadingTime(text: string): string {
  // Strip HTML tags if present
  const plain = text.replace(/<[^>]*>/g, '');

  // Count words
  const words = plain
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

/**
 * Return the raw minute count (useful for schema or sorting).
 */
export function getReadingMinutes(text: string): number {
  const plain = text.replace(/<[^>]*>/g, '');
  const words = plain.trim().split(/\s+/).filter((w) => w.length > 0).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
