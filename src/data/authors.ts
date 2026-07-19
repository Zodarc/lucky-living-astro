// ── Lucky Living — Author Profiles ──────────────────────────
// Add author profiles here. The 'id' matches the 'author' field in article frontmatter.

export interface Author {
  id:     string;
  name:   string;
  bio:    string;
  avatar: string;
  url?:   string;
  social?: {
    twitter?:   string;
    instagram?: string;
    linkedin?:  string;
  };
}

export const AUTHORS: Author[] = [
  {
    id:     'lucky-living',
    name:   'Lucky Living',
    bio:    'The Lucky Living editorial team tests and reviews the best products to help you live smarter every day.',
    avatar: '/images/brand/author-team.jpg',
    url:    '/about/',
    social: {
      twitter: '',
    },
  },
  // ── Add more authors below ──────────────────────────────
  // {
  //   id:     'jane-smith',
  //   name:   'Jane Smith',
  //   bio:    'Jane covers smart home technology and IoT products.',
  //   avatar: '/images/authors/jane-smith.jpg',
  //   social: { twitter: 'https://twitter.com/janesmith' },
  // },
];

/** Get an author by their id */
export function getAuthorById(id: string): Author {
  return (
    AUTHORS.find((a) => a.id === id.toLowerCase().replace(/\s+/g, '-')) ??
    AUTHORS[0]
  );
}
