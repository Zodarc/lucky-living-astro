// ── Lucky Living — Site Configuration ───────────────────────
// Edit this file to update global site settings.
// No code changes needed elsewhere.

export const SITE = {
  name:        'Lucky Living',
  tagline:     'Smarter Products. Better Life.',
  description: 'Discover smarter products, honest reviews, and lifestyle upgrades. Lucky Living covers smart home, tech, wellness, style, and the best deals online.',
  url:         'https://lucky-living-astro.vercel.app/',
  language:    'en',
  locale:      'en_US',

  // Branding
  logo: {
    src:    '/images/brand/logo.svg',
    alt:    'Lucky Living',
    width:  180,
    height: 40,
  },
  ogImage: '/images/brand/og-default.jpg',

  // SEO defaults
  seo: {
    titleSeparator:  ' | ',
    defaultKeywords: 'smart home, product reviews, lifestyle, tech gadgets, home design, wellness, best deals',
    twitterHandle:   '@luckyliving',
  },

  // Navigation
  nav: [
    { label: 'Smart Home',    href: '/category/smart-home/' },
    { label: 'Tech Life',     href: '/category/tech-life/' },
    { label: 'Home & Design', href: '/category/home-design/' },
    { label: 'Wellness',      href: '/category/wellness/' },
    { label: 'Style',         href: '/category/style/' },
    { label: 'Reviews',       href: '/reviews/' },
    { label: 'Deals',         href: '/category/deals/' },
  ],

  // Footer secondary links
  footerLinks: [
    { label: 'About',                href: '/about/' },
    { label: 'Contact',              href: '/contact/' },
    { label: 'Affiliate Disclosure', href: '/affiliate-disclosure/' },
    { label: 'Privacy Policy',       href: '/privacy-policy/' },
  ],

  // Social media — leave empty string to hide
  social: {
    twitter:   '',
    instagram: '',
    facebook:  '',
    pinterest: '',
    youtube:   '',
    tiktok:    '',
  },

  // Affiliate
  affiliate: {
    amazonTag:       'luckyliving07-20',   // Your Amazon Associates tag e.g. 'luckyliving-20'
    disclosureShort: 'We may earn a commission from links on this page.',
    disclosureUrl:   '/affiliate-disclosure/',
  },

  // Newsletter
  newsletter: {
    enabled:     true,
    headline:    'Live Smarter Every Week',
    subheading:  'Join thousands of readers who get our best product picks and tips delivered straight to their inbox.',
    placeholder: 'Enter your email address',
    buttonText:  'Subscribe Free',
    formAction:  '',   // Your email provider action URL
  },

  // Copyright
  copyright: `© ${new Date().getFullYear()} Lucky Living. All rights reserved.`,
} as const;

export type NavItem = (typeof SITE.nav)[number];
