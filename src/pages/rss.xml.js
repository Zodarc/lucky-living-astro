/**
 * rss.xml.js — RSS Feed
 * Generates /rss.xml at build time from published articles.
 * Uses @astrojs/rss.
 */
import rss         from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE }    from '../data/site.ts';

export async function GET(context) {
  const articles = await getCollection('articles', (e) => !e.data.draft);

  // Sort by publish date, newest first
  const sorted = articles.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );

  return rss({
    title:       SITE.name,
    description: SITE.description,
    site:        context.site ?? SITE.url,
    items: sorted.map((article) => ({
      title:       article.data.title,
      description: article.data.description,
      pubDate:     article.data.publishDate,
      link:        `/articles/${article.slug}/`,
      categories:  [article.data.category, ...(article.data.tags ?? [])],
      author:      article.data.author ?? SITE.name,
    })),
    customData: `<language>${SITE.language}</language>`,
    stylesheet: false,
  });
}
