/**
 * tailwind.config.mjs
 *
 * Tailwind 4 — design tokens live in src/styles/global.css @theme {}.
 * This file handles the typography plugin prose customization only,
 * since @plugin registration in CSS doesn't support passing options.
 *
 * Colors, fonts, shadows, and spacing are all in global.css.
 */
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  plugins: [
    typography({
      // Prevent the plugin's default max-width from constraining prose blocks
      className: 'prose',
    }),
  ],
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            // Match Lucky Living body copy
            '--tw-prose-body':           '#475569',
            '--tw-prose-headings':       '#0F172A',
            '--tw-prose-lead':           '#475569',
            '--tw-prose-links':          '#2563EB',
            '--tw-prose-bold':           '#0F172A',
            '--tw-prose-counters':       '#64748B',
            '--tw-prose-bullets':        '#CBD5E1',
            '--tw-prose-hr':             '#E2E8F0',
            '--tw-prose-quotes':         '#1E293B',
            '--tw-prose-quote-borders':  '#2563EB',
            '--tw-prose-captions':       '#94A3B8',
            '--tw-prose-code':           '#0F172A',
            '--tw-prose-pre-code':       '#E2E8F0',
            '--tw-prose-pre-bg':         '#0F172A',
            '--tw-prose-th-borders':     '#CBD5E1',
            '--tw-prose-td-borders':     '#E2E8F0',
            maxWidth:    'none',
            fontSize:    '1.0625rem',
            lineHeight:  '1.8',
            // Serif headings
            h2: {
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: '700',
              fontSize:   '1.6rem',
              marginTop:  '2.25em',
              marginBottom: '0.6em',
              letterSpacing: '-0.015em',
            },
            h3: {
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: '700',
              fontSize:   '1.25rem',
              marginTop:  '1.75em',
              marginBottom: '0.5em',
            },
            // Link decoration
            a: {
              textDecoration:       'underline',
              textUnderlineOffset:  '3px',
              textDecorationColor:  'rgb(37 99 235 / 0.3)',
              fontWeight:           '500',
              transition:           'color 150ms ease, text-decoration-color 150ms ease',
            },
            // Image polish
            img: {
              borderRadius: '0.75rem',
              marginTop:    '2em',
              marginBottom: '2em',
            },
            // Block quote
            blockquote: {
              fontStyle:       'normal',
              borderLeftColor: '#2563EB',
              borderLeftWidth: '4px',
              paddingLeft:     '1.25rem',
              color:           '#1E293B',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after':   { content: 'none' },
          },
        },
      }),
    },
  },
};
