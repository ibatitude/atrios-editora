import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

// Com `output: 'export'` as metadata routes precisam ser marcadas como estáticas
// explicitamente, senão o build as trata como rotas dinâmicas e falha.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteUrl()}/sitemap.xml`,
  }
}
