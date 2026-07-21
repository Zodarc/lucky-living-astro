import { defineCollection, z } from 'astro:content';

// ── Article collection schema ────────────────────────────────
const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Core content
    title:         z.string().min(1),
    description:   z.string().min(1),
    featuredImage: z.string().optional().default('/images/brand/og-default.jpg'),
    featuredImageAlt: z.string().optional().default(''),

    // Taxonomy
    category: z.enum([
      'smart-home',
      'tech-life',
      'home-design',
      'wellness',
      'style',
      'reviews',
      'deals',
    ]),
    tags: z.array(z.string()).optional().default([]),

    // Authorship & dates
    author:      z.string().optional().default('Lucky Living'),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    // SEO — if omitted, falls back to title/description
    seoTitle:       z.string().optional(),
    seoDescription: z.string().optional(),
    keywords:       z.array(z.string()).optional().default([]),

    // Monetization
    affiliateLinks: z.array(
      z.object({
        label: z.string(),
        url:   z.string().url(),
      })
    ).optional().default([]),

    // Discovery
    relatedArticles: z.array(z.string()).optional().default([]),

    // Status
    draft: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
  }),
});

// ── Product collection schema ────────────────────────────────
const productsCollection = defineCollection({
  type: 'content',
  schema: z.object({

    // Core product information
    name: z.string().min(1),
    description: z.string().min(1),

    // Main image
    image: z.string()
      .optional()
      .default('/images/brand/og-default.jpg'),

    imageAlt: z.string()
      .optional()
      .default(''),

    // Product gallery
    gallery: z.array(z.string())
      .optional()
      .default([]),

    // Optional video review
    videoUrl: z.string()
      .optional(),

    // Taxonomy
    category: z.enum([
      'smart-home',
      'tech-life',
      'home-design',
      'wellness',
      'style',
      'reviews',
      'deals',
    ]),


    // Affiliate
    affiliateUrl: z.string().url(),

    affiliateLabel: z.string()
      .optional()
      .default('Check Price on Amazon'),

    pricePlaceholder: z.string()
      .optional(),


    // Review scoring
    rating: z.number()
      .min(0)
      .max(5)
      .optional(),

    verdict: z.string()
      .optional(),

    bestFor: z.array(z.string())
      .optional()
      .default([]),


    // Pros and Cons
    pros: z.array(z.string())
      .optional()
      .default([]),

    cons: z.array(z.string())
      .optional()
      .default([]),


    // Product features
    features: z.array(z.string())
      .optional()
      .default([]),


    // Specifications table
    specs: z.record(z.string())
      .optional()
      .default({}),


    // Related content
    relatedProducts: z.array(z.string())
      .optional()
      .default([]),

    relatedArticles: z.array(z.string())
      .optional()
      .default([]),


    // SEO
    seoTitle: z.string().optional(),

    seoDescription: z.string().optional(),

    keywords: z.array(z.string())
      .optional()
      .default([]),


    // Authorship
    author: z.string()
      .optional()
      .default('Lucky Living'),

    publishDate: z.coerce.date(),

    updatedDate: z.coerce.date()
      .optional(),


    // Status
    draft: z.boolean()
      .optional()
      .default(false),

    featured: z.boolean()
      .optional()
      .default(false),

  }),
});