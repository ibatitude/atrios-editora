import type { ContactFormData, ManuscriptFormData } from '@/lib/types';

/** Canais editoriais exibidos no site. */
export const EDITORIAL_EMAIL = 'contato@atrioseditora.com.br';
export const ORDERS_EMAIL = 'pedidos@atrioseditora.com.br';
export const EDITORIAL_PHONE = '(31) 3490-8200';

/** Sede editorial. Consumido pelo rodapé e pela página de contato. */
export const ADDRESS = {
  street: 'Avenida das Américas',
  city: 'Rio de Janeiro',
  state: 'RJ',
  country: 'Brasil',
} as const;

export const ADDRESS_LINE_1 = ADDRESS.street;
export const ADDRESS_LINE_2 = `${ADDRESS.city}, ${ADDRESS.state} • ${ADDRESS.country}`;

const PROFILE_LABELS: Record<ContactFormData['type'], string> = {
  leitor: 'Leitor',
  livraria: 'Livraria / Loja',
  parceria: 'Igreja / Ministério',
  imprensa: 'Imprensa / Mídia',
};

function mailto(subject: string, lines: string[]): string {
  const body = lines.join('\n');
  return `mailto:${EDITORIAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Ponto único de saída dos dois formulários.
 *
 * Não existe backend ainda. Em vez de simular um envio que nunca acontece, os
 * dados são entregues ao cliente de e-mail do próprio usuário: ele vê exatamente
 * o que envia e para quem. Para plugar um serviço real (Resend, Formspree),
 * troque o corpo destas duas funções — a UI não muda.
 */
export function buildContactMessage(form: ContactFormData) {
  const subject = `[${PROFILE_LABELS[form.type]}] ${form.subject}`;
  const lines = [
    `Nome: ${form.name}`,
    `E-mail: ${form.email}`,
    form.phone ? `Telefone: ${form.phone}` : null,
    `Perfil: ${PROFILE_LABELS[form.type]}`,
    '',
    form.message,
  ].filter((l): l is string => l !== null);

  return { subject, body: lines.join('\n'), href: mailto(subject, lines) };
}

export function buildManuscriptMessage(form: ManuscriptFormData) {
  const subject = `Submissão de original: "${form.bookTitle}" — ${form.authorName}`;
  const lines = [
    '== AUTOR ==',
    `Nome: ${form.authorName}`,
    `E-mail: ${form.email}`,
    `Telefone: ${form.phone}`,
    `Cidade/UF: ${form.cityState}`,
    `Mini-biografia: ${form.authorBio}`,
    '',
    '== OBRA ==',
    `Título provisório: ${form.bookTitle}`,
    `Categoria: ${form.category}`,
    `Público-alvo: ${form.targetAudience}`,
    `Páginas estimadas: ${form.estimatedPages}`,
    '',
    'Sinopse:',
    form.synopsis,
    '',
    form.sampleFile
      ? `ANEXAR MANUALMENTE: ${form.sampleFile.name}`
      : 'ANEXAR MANUALMENTE: arquivo do manuscrito (PDF ou DOCX).',
    '',
    'Declaro ser o autor ou titular dos direitos autorais deste conteúdo e autorizo',
    'a leitura confidencial pelo Conselho Editorial da Átrios Editora.',
  ];

  return { subject, body: lines.join('\n'), href: mailto(subject, lines) };
}
