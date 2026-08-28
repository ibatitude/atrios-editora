import type { MetadataRoute } from 'next'
import { AUTHORS, BOOKS } from '@/lib/data'
import { siteUrl } from '@/lib/seo'

// Com `output: 'export'` as metadata routes precisam ser marcadas como estáticas
// explicitamente, senão o build as trata como rotas dinâmicas e falha.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl()

  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/catalogo`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/autores`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/sobre`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/contato`, changeFrequency: 'yearly', priority: 0.6 },
    ...BOOKS.map((book) => ({
      url: `${base}/livros/${book.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...AUTHORS.map((author) => ({
      url: `${base}/autores/${author.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
