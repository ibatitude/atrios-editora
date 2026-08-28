export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Início' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/sobre', label: 'Sobre a Átrios' },
  { href: '/autores', label: 'Autores' },
  { href: '/contato', label: 'Contato & Originais' },
];

/** Rota ativa: '/' só casa exata; demais casam com subrotas (/livros/x sob /catalogo não). */
export function isActive(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}
