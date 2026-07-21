import { getCollection } from 'astro:content';

export async function GET() {

  const articles = await getCollection(
    'articles',
    (entry) => !entry.data.draft
  );

  const products = await getCollection(
    'products',
    (entry) => !entry.data.draft
  );


  const searchItems = [
    ...articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      category: article.data.category,
      tags: article.data.tags,
      type: "Article",
      url: `/articles/${article.slug}/`
    })),

    ...products.map((product) => ({
      title: product.data.name,
      description: product.data.description,
      category: product.data.category,
      tags: product.data.keywords,
      type: "Review",
      url: `/reviews/${product.slug}/`
    }))
  ];


  return new Response(
    JSON.stringify(searchItems),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}