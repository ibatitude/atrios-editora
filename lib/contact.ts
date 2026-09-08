import type { ContactFormData, ManuscriptFormData } from '@/lib/types';

/**
 * Dados oficiais da editora. Fonte única: rodapé, página de contato e o
 * JSON-LD da Organization saem todos daqui.
 */

/** Único canal de contato hoje. A editora não tem telefone. */
export const EDITORIAL_EMAIL = 'editoraatrios@gmail.com';

/** Dados cadastrais. `legalName` é a razão social, distinta do nome fantasia. */
export const COMPANY = {
  legalName: 'Átrios Serviços Religiosos Ltda.',
  cnpj: '26.769.164/0001-71',
  inscricaoMunicipal: '1038039-1',
  inscricaoEstadual: '112.216.927',
} as const;

/** Sede editorial. */
export const ADDRESS = {
  street: 'Rua Buenos Aires, 100',
  complement: 'Pavimento 7',
  city: 'Rio de Janeiro',
  state: 'RJ',
  postalCode: '20070-022',
  country: 'Brasil',
} as const;

export const ADDRESS_LINE_1 = `${ADDRESS.street} — ${ADDRESS.complement}`;
export const ADDRESS_LINE_2 = `${ADDRESS.city}, ${ADDRESS.state} • CEP ${ADDRESS.postalCode}`;

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
