export const SITE_NAME = 'Átrios Editora'
export const SITE_TAGLINE = 'Livros que carregam propósito. Palavras que transformam vidas.'
export const SITE_DESCRIPTION =
  'Na Átrios, acreditamos que um livro pode ir muito além de páginas. Publicamos livros que unem conteúdo, propósito e relevância.'

export function siteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atrioseditora.com.br'
  return url.replace(/\/$/, '')
}

/**
 * Imagem de compartilhamento padrão.
 *
 * Precisa ser repetida em cada rota que declara o próprio `openGraph`: o Next
 * substitui o objeto `openGraph` inteiro do layout em vez de mesclar campo a
 * campo, então declarar `images` só no layout deixaria estas rotas sem card.
 */
export const DEFAULT_OG_IMAGE = {
  url: '/og-default.png',
  width: 1200,
  height: 630,
  alt: SITE_NAME,
}
