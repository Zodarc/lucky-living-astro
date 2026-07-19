// ── Lucky Living — Category Definitions ─────────────────────
// Add or edit categories here. Slug must match the content collection enum.

export interface Category {
  id:           string;
  name:         string;
  slug:         string;
  description:  string;
  seoTitle:     string;
  seoDescription: string;
  keywords:     string;
  image:        string;
  imageAlt:     string;
  color:        string;       // Tailwind bg color class
  accentHex:    string;       // Raw hex for inline styles
  featured:     boolean;
  order:        number;
}

export const CATEGORIES: Category[] = [
  {
    id:             'smart-home',
    name:           'Smart Home',
    slug:           'smart-home',
    description:    'Control your home with the latest smart devices, automation systems, and connected technology.',
    seoTitle:       'Smart Home — Best Devices, Guides & Reviews | Lucky Living',
    seoDescription: 'Discover the best smart home devices, automation tips, and honest reviews. Lucky Living helps you build a smarter, more connected home.',
    keywords:       'smart home, home automation, smart devices, IoT, smart speakers, smart lighting',
    image:          '/images/categories/smart-home.jpg',
    imageAlt:       'Smart home devices on a modern kitchen counter',
    color:          'bg-blue-600',
    accentHex:      '#2563EB',
    featured:       true,
    order:          1,
  },
  {
    id:             'tech-life',
    name:           'Tech Life',
    slug:           'tech-life',
    description:    'The best laptops, phones, wearables, and gadgets to power your everyday life.',
    seoTitle:       'Tech Life — Gadgets, Phones & Wearables | Lucky Living',
    seoDescription: 'Find the best tech gadgets, smartphones, laptops, and wearables. Lucky Living reviews the gear worth buying.',
    keywords:       'tech gadgets, smartphones, laptops, wearables, headphones, tablets',
    image:          '/images/categories/tech-life.jpg',
    imageAlt:       'Modern tech gadgets on a clean desk',
    color:          'bg-violet-600',
    accentHex:      '#7C3AED',
    featured:       true,
    order:          2,
  },
  {
    id:             'home-design',
    name:           'Home & Design',
    slug:           'home-design',
    description:    'Beautiful, functional home ideas, furniture picks, and interior design inspiration.',
    seoTitle:       'Home & Design — Furniture, Decor & Interior Ideas | Lucky Living',
    seoDescription: 'Explore home décor ideas, furniture recommendations, and interior design inspiration.',
    keywords:       'home design, interior design, furniture, home decor, living room ideas',
    image:          '/images/categories/home-design.jpg',
    imageAlt:       'Beautifully designed modern living room',
    color:          'bg-amber-600',
    accentHex:      '#D97706',
    featured:       true,
    order:          3,
  },
  {
    id:             'wellness',
    name:           'Wellness',
    slug:           'wellness',
    description:    'Products and habits to help you sleep better, feel better, and live healthier.',
    seoTitle:       'Wellness — Health, Fitness & Wellbeing Products | Lucky Living',
    seoDescription: 'Discover wellness products, fitness gear, and healthy lifestyle tips.',
    keywords:       'wellness, fitness, health, sleep, meditation, nutrition, yoga',
    image:          '/images/categories/wellness.jpg',
    imageAlt:       'Wellness products including yoga mat and water bottle',
    color:          'bg-emerald-600',
    accentHex:      '#059669',
    featured:       true,
    order:          4,
  },
  {
    id:             'style',
    name:           'Style',
    slug:           'style',
    description:    'Clothing, accessories, and personal care picks for everyday life.',
    seoTitle:       'Style — Fashion, Accessories & Personal Care | Lucky Living',
    seoDescription: 'Explore style guides, clothing picks, and personal care recommendations.',
    keywords:       'fashion, style, accessories, clothing, personal care, grooming, skincare',
    image:          '/images/categories/style.jpg',
    imageAlt:       'Stylish clothing and accessories flatlay',
    color:          'bg-pink-600',
    accentHex:      '#DB2777',
    featured:       false,
    order:          5,
  },
  {
    id:             'reviews',
    name:           'Reviews',
    slug:           'reviews',
    description:    'In-depth, honest product reviews across every category.',
    seoTitle:       'Product Reviews — Honest & In-Depth | Lucky Living',
    seoDescription: 'Read honest, in-depth product reviews at Lucky Living.',
    keywords:       'product reviews, honest reviews, best products, buying guide',
    image:          '/images/categories/reviews.jpg',
    imageAlt:       'Products being reviewed and rated',
    color:          'bg-red-600',
    accentHex:      '#DC2626',
    featured:       true,
    order:          6,
  },
  {
    id:             'deals',
    name:           'Deals',
    slug:           'deals',
    description:    'The best sales, limited-time offers, and discount finds across tech, home, and lifestyle.',
    seoTitle:       'Best Deals — Sales, Discounts & Top Offers | Lucky Living',
    seoDescription: 'Find the best deals on tech, home, and lifestyle products.',
    keywords:       'best deals, sales, discounts, Amazon deals, product offers',
    image:          '/images/categories/deals.jpg',
    imageAlt:       'Shopping bags and sale tags representing great deals',
    color:          'bg-orange-600',
    accentHex:      '#EA580C',
    featured:       false,
    order:          7,
  },
];

/** Get a single category by slug */
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** Get only featured categories */
export function getFeaturedCategories(): Category[] {
  return CATEGORIES.filter((c) => c.featured).sort((a, b) => a.order - b.order);
}
