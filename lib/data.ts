import { Book, Author, BookCategory, EditorialValue } from '@/lib/types';

export const BOOKS: Book[] = [
  {
    id: 'passo-a-passo-da-visao-celular',
    title: 'Passo a Passo da Visão Celular',
    subtitle: 'Como transformar casas em centros de discipulado e multiplicação',
    author: 'Josué Valandro Jr.',
    authorId: 'josue-valandro-jr',
    category: 'Liderança',
    coverImage: '/assets/livros/passo-a-passo-da-visao-celular.webp',
    storeUrl: 'https://atrioseditora.lojavirtualnuvem.com.br/produtos/passo-a-passo-da-visao-celular/',
    price: 79.90,
    originalPrice: 89.90,
    synopsis: 'Aprenda o passo a passo da Visão Celular para cuidar de pessoas, formar discípulos e multiplicar células e igrejas de forma saudável e sustentável.',
    longDescription: 'Um modelo simples. Uma estratégia poderosa. Um movimento que transforma casas, pessoas e nações. A Visão Celular é o coração do Evangelho: é o modelo que nos permite cuidar de pessoas, formar discípulos e multiplicar igrejas de forma saudável e sustentável. Neste livro, Josué Valandro Jr. revela, de forma prática e inspiradora, o passo a passo dessa visão que tem impactado milhares de vidas e edificado lideranças e igrejas ao redor do mundo. Você vai entender o DNA da Visão Celular, aprender o passo a passo para iniciar e multiplicar células, descobrir como transformar sua casa em um centro de influência do Reino e fazer parte de um movimento global que não para de crescer.',
    sampleQuote: 'Uma casa, um encontro, uma vida. Um discípulo, uma nova história, um novo mundo.',
    dimensions: '18 x 23 cm',
    featured: true,
    newRelease: true,
  },
  {
    id: 'manha-com-deus',
    title: 'Manhã com Deus',
    subtitle: '365 meditações para uma vida extraordinária',
    author: 'Josué Valandro Jr.',
    authorId: 'josue-valandro-jr',
    category: 'Fé',
    coverImage: '/assets/livros/manha-com-deus.webp',
    storeUrl: 'https://atrioseditora.lojavirtualnuvem.com.br/produtos/manha-com-deus/',
    price: 39.90,
    originalPrice: 49.90,
    synopsis: 'Um devocional com 365 meditações para começar cada dia com a Palavra, oração e uma perspectiva renovada sobre a vida.',
    longDescription: 'Todas as manhãs são uma nova oportunidade. Manhã com Deus, de Josué Valandro Jr., é um devocional criado para ajudar você a começar cada dia com a Palavra, oração e uma perspectiva renovada sobre a vida. Ao longo de 365 meditações, você encontrará reflexões para fortalecer sua fé, ouvir a voz de Deus e buscar sabedoria, paz e direção para enfrentar os desafios de cada dia. Mais do que uma leitura diária, este livro é um convite para estabelecer um encontro constante com Deus e transformar os primeiros momentos do seu dia em um tempo de comunhão, reflexão e renovação espiritual.',
    sampleQuote: 'Um momento com Deus pode transformar todo o seu dia.',
    featured: true,
    newRelease: true,
  },
];

export const AUTHORS: Author[] = [
  {
    id: 'josue-valandro-jr',
    name: 'Josué Valandro Jr.',
    role: 'Pastor, Escritor e Formador de Líderes',
    photo: '/assets/autores/josue-valandro-jr.jpg',
    bio: 'Há mais de 25 anos, Josué Valandro Jr. dedica a vida a pregar o evangelho e a ensinar a Palavra de Deus de forma prática e transformadora. Acredita que a fé não deve ser vivida apenas dentro das igrejas, mas deve ser a força que molda decisões e impacta a sociedade todos os dias. Autor de mais de 15 livros, dedica-se à expansão da Igreja e à capacitação de pastores e líderes: seu treinamento Impulso Pastoral já ajudou mais de 1.300 pastores a organizar, expandir e multiplicar suas igrejas. Todos os dias, às 6h, compartilha o devocional Manhã com Deus em seu canal no YouTube, que reúne mais de 200 mil inscritos.',
    shortBio: 'Pastor há mais de 25 anos, autor de mais de 15 livros e formador de líderes, dedicado à expansão da Igreja e à Visão Celular.',
    quote: '“O maior legado que podemos deixar não é o que acumulamos, mas as vidas que transformamos pelo poder da Palavra.”',
    booksCount: 2,
    specialties: ['Visão Celular', 'Formação de Líderes', 'Evangelização', 'Devocional'],
    bookIds: ['passo-a-passo-da-visao-celular', 'manha-com-deus'],
    featured: true
  }
];

export const EDITORIAL_VALUES: EditorialValue[] = [
  {
    icon: 'ShieldCheck',
    title: 'Propósito Inegociável',
    description: 'Cada página que publicamos deve carregar uma razão de existir. Não editamos conteúdos vazios ou puramente comerciais.'
  },
  {
    icon: 'Feather',
    title: 'Rigor e Primor Editorial',
    description: 'Revisão textual minuciosa, projeto gráfico elegante, tipografia confortável e acabamento digno de obras que permanecem.'
  },
  {
    icon: 'HeartHandshake',
    title: 'Cuidado Humano com o Autor',
    description: 'Tratamos nossos escritores como guardiões de mensagens preciosas, caminhando lado a lado em todo o processo criativo.'
  },
  {
    icon: 'Sparkles',
    title: 'Relevância e Maturidade',
    description: 'Buscamos obras que respondam às dores reais da sociedade contemporânea com clareza moral, teológica e existencial.'
  },
  {
    icon: 'BookOpenCheck',
    title: 'Impacto nas Gerações',
    description: 'Publicamos para o leitor de hoje e para os filhos dele amanhã. Livros feitos para durar na memória e na vida prática.'
  },
  {
    icon: 'Compass',
    title: 'Ética e Transparência',
    description: 'Relações justas, compromisso com a verdade e respeito irrevogável aos prazos, contratos e leitores.'
  }
];

// --- Consultas por slug (o `id` de cada registro é o slug da rota) ---

export function getBook(slug: string): Book | undefined {
  return BOOKS.find((b) => b.id === slug);
}

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.id === slug);
}

export function getBooksByAuthor(authorId: string): Book[] {
  return BOOKS.filter((b) => b.authorId === authorId);
}

export const CATEGORIES: BookCategory[] = [
  'Fé',
  'Liderança',
  'Família',
  'Desenvolvimento Pessoal',
];

/** Rótulos de vitrine das categorias. O valor cru é o que vai para `?categoria=`. */
export const CATEGORY_LABELS: Record<BookCategory, string> = {
  'Fé': 'Fé & Espiritualidade',
  'Liderança': 'Liderança Servidora',
  'Família': 'Família & Lar',
  'Desenvolvimento Pessoal': 'Desenvolvimento Pessoal',
};

/** Type guard para validar o `?categoria=` vindo da URL. */
export function isBookCategory(value: string): value is BookCategory {
  return (CATEGORIES as string[]).includes(value);
}
