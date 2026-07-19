// ── Lucky Living — SEO Utilities ────────────────────────────
import { SITE } from '@data/site';

export interface SeoProps {
  title?:       string;
  description?: string;
  keywords?:    string[];
  canonical?:   string;
  ogImage?:     string;
  ogType?:      'website' | 'article';
  noindex?:     boolean;
  publishDate?: Date;
  updatedDate?: Date;
  author?:      string;
}

/**
 * Build the full <title> tag value.
 * If title equals the site name, use it as-is (homepage).
 * Otherwise append the site name separator.
 */
export function buildTitle(title?: string): string {
  if (!title || title === SITE.name) return SITE.name + ' — ' + SITE.tagline;
  return `${title}${SITE.seo.titleSeparator}${SITE.name}`;
}

/**
 * Build the canonical URL from a relative path.
 * Ensures no double slashes and always has trailing slash.
 */
export function buildCanonical(path: string): string {
  const base = SITE.url.replace(/\/$/, '');
  const clean = '/' + path.replace(/^\//, '').replace(/\/$/, '') + '/';
  // Homepage edge case
  if (clean === '//') return base + '/';
  return base + clean;
}

/**
 * Resolve the OG image to an absolute URL.
 */
export function buildOgImageUrl(src?: string): string {
  const img = src || SITE.ogImage;
  if (img.startsWith('http')) return img;
  return SITE.url.replace(/\/$/, '') + img;
}

/**
 * Build JSON-LD schema for an article page.
 */
export function buildArticleSchema(opts: {
  title:       string;
  description: string;
  url:         string;
  image:       string;
  publishDate: Date;
  updatedDate?: Date;
  author:      string;
}): string {
  const schema = {
    '@context':  'https://schema.org',
    '@type':     'Article',
    headline:    opts.title,
    description: opts.description,
    image:       buildOgImageUrl(opts.image),
    url:         opts.url,
    datePublished: opts.publishDate.toISOString(),
    dateModified:  (opts.updatedDate ?? opts.publishDate).toISOString(),
    author: {
      '@type': 'Person',
      name:    opts.author,
    },
    publisher: {
      '@type': 'Organization',
      name:    SITE.name,
      logo: {
        '@type': 'ImageObject',
        url:     buildOgImageUrl(SITE.logo.src),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id':   opts.url,
    },
  };
  return JSON.stringify(schema);
}

/**
 * Build JSON-LD schema for a product review page.
 */
export function buildProductSchema(opts: {
  name:         string;
  description:  string;
  url:          string;
  image:        string;
  rating?:      number;
  affiliateUrl: string;
  price?:       string;
}): string {
  const schema: Record<string, unknown> = {
    '@context':  'https://schema.org',
    '@type':     'Product',
    name:        opts.name,
    description: opts.description,
    image:       buildOgImageUrl(opts.image),
    url:         opts.url,
  };

  if (opts.rating) {
    schema.aggregateRating = {
      '@type':      'AggregateRating',
      ratingValue:  opts.rating.toString(),
      bestRating:   '5',
      worstRating:  '1',
      ratingCount:  '1',
    };
  }

  schema.offers = {
    '@type':        'Offer',
    url:            opts.affiliateUrl,
    priceCurrency:  'USD',
    availability:   'https://schema.org/InStock',
    ...(opts.price && { price: opts.price.replace(/[^0-9.]/g, '') }),
  };

  return JSON.stringify(schema);
}

/**
 * Build JSON-LD WebSite schema for the homepage.
 */
export function buildWebsiteSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    name:       SITE.name,
    url:        SITE.url,
    description: SITE.description,
    potentialAction: {
      '@type':    'SearchAction',
      target: {
        '@type':      'EntryPoint',
        urlTemplate:  `${SITE.url}search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return JSON.stringify(schema);
}

/**
 * Build JSON-LD BreadcrumbList schema.
 */
export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      item.name,
      item:      item.url.startsWith('http') ? item.url : buildCanonical(item.url),
    })),
  };
  return JSON.stringify(schema);
}
