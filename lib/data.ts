import { Book, Author, BookCategory, EditorialValue, ReaderTestimonial } from '@/lib/types';

export const BOOKS: Book[] = [
  {
    id: 'o-legado-invisivel',
    title: 'O Legado Invisível',
    subtitle: 'O poder silencioso das escolhas que moldam gerações',
    author: 'Pr. Gabriel Vasconcelos',
    authorId: 'gabriel-vasconcelos',
    category: 'Fé',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    price: 54.90,
    originalPrice: 68.00,
    synopsis: 'Uma reflexão profunda sobre como a integridade diária constrói raízes eternas em um mundo obcecado pelo efêmero.',
    longDescription: 'Em "O Legado Invisível", Gabriel Vasconcelos conduz o leitor por uma jornada de redescoberta do que verdadeiramente permanece. Através de princípios bíblicos atemporais e narrativas biográficas tocantes, o autor desvenda a arquitetura de uma vida orientada pela eternidade. Uma leitura essencial para quem deseja que suas pegadas inspirem filhos, discípulos e gerações vindouras.',
    sampleQuote: '“O que você constrói para si mesmo desaparece com o tempo; o que você edifica no coração dos outros ecoa na eternidade.”',
    pages: 240,
    isbn: '978-65-89120-01-4',
    publishedYear: 2024,
    dimensions: '16 x 23 cm',
    format: 'Brochura com Orelhas',
    featured: true,
    bestseller: true,
    newRelease: false,
    rating: 4.9,
    reviewCount: 142,
    sampleChapterTitle: 'Capítulo 1: As Raízes que a Superfície Não Vê',
    sampleChapterText: 'Vivemos na era do espetáculo, onde os frutos são exibidos antes mesmo que a semente encontre solo fértil. No entanto, as árvores que resistem às maiores tempestades não são aquelas que ostentam folhas mais vistosas, mas sim aquelas cujas raízes penetraram a rocha no silêncio da terra escura. Ter propósito não é sobre visibilidade pública; é sobre fidelidade secreta.'
  },
  {
    id: 'lideranca-de-joelhos',
    title: 'Liderança de Joelhos',
    subtitle: 'Autoridade que nasce da humildade e serve com propósito',
    author: 'Dra. Helena Brandão',
    authorId: 'helena-brandao',
    category: 'Liderança',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    price: 59.90,
    originalPrice: 72.00,
    synopsis: 'Como liderar equipes, famílias e projetos com firmeza ética, sensibilidade humana e dependência divina.',
    longDescription: 'Dra. Helena Brandão desconstrói os mitos da liderança corporativa tradicional e resgata o modelo de liderança servidora. Com décadas de experiência na gestão executiva e no aconselhamento ministerial, a obra apresenta diretrizes práticas para tomadas de decisão sob pressão, formação de novos líderes e manutenção da saúde emocional na posição de comando.',
    sampleQuote: '“A verdadeira autoridade de um líder não reside na sua capacidade de impor ordens, mas na sua coragem de se curvar para erguer os outros.”',
    pages: 288,
    isbn: '978-65-89120-02-1',
    publishedYear: 2024,
    dimensions: '16 x 23 cm',
    format: 'Capa Dura',
    featured: true,
    bestseller: true,
    newRelease: true,
    rating: 5.0,
    reviewCount: 98,
    sampleChapterTitle: 'Capítulo 2: O Peso da Coroa e a Graça do Altar',
    sampleChapterText: 'Quando um líder perde o hábito de ouvir a Deus no secreto, ele passa a depender do eco dos aplausos humanos. A solidão da liderança é real, mas ela se torna insuportável apenas quando esquecemos que fomos chamados não para sermos donos da visão, mas fiéis mordomos de uma missão muito maior.'
  },
  {
    id: 'a-casa-edificada',
    title: 'A Casa Edificada',
    subtitle: 'Princípios inabaláveis para cultivar lares seguros e afetuosos',
    author: 'Marcos & Cecília Andrade',
    authorId: 'marcos-cecilia-andrade',
    category: 'Família',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    price: 49.90,
    originalPrice: 62.00,
    synopsis: 'Um guia prático e afetuoso para restaurar o diálogo conjugal, educar filhos com sabedoria e proteger o altar familiar.',
    longDescription: 'O casamento e a família são o núcleo mais precioso da sociedade. Neste manual acolhedor, Marcos e Cecília Andrade compartilham ferramentas para transformar lares em refúgios de paz, abordando desde a gestão de conflitos até a transmissão intergeracional de valores de honra, respeito mútuo e espiritualidade prática.',
    sampleQuote: '“Uma família forte não é aquela isenta de conflitos, mas aquela onde o perdão é mais rápido que a mágoa.”',
    pages: 224,
    isbn: '978-65-89120-03-8',
    publishedYear: 2023,
    dimensions: '14 x 21 cm',
    format: 'Brochura com Orelhas',
    featured: true,
    bestseller: false,
    newRelease: false,
    rating: 4.8,
    reviewCount: 86,
    sampleChapterTitle: 'Capítulo 4: A Mesa como Santuário de Cura',
    sampleChapterText: 'A mesa de refeições é muito mais do que um móvel onde nos alimentamos; é o laboratório sagrado onde o coração dos filhos é escutado, onde as feridas do dia são aliviadas e onde o amor se expressa no olhar atento e na partilha sincera.'
  },
  {
    id: 'arquitetura-do-habito-interior',
    title: 'A Arquitetura do Hábito Interior',
    subtitle: 'Como reorganizar sua mente, seu tempo e suas prioridades para uma vida com significado',
    author: 'Dr. Lucas Sampaio',
    authorId: 'lucas-sampaio',
    category: 'Desenvolvimento Pessoal',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    price: 52.90,
    originalPrice: 65.00,
    synopsis: 'Uma abordagem integrativa entre neurociência, maturidade espiritual e disciplina intencional.',
    longDescription: 'Como romper com a tirania da pressa e da hiperestimulação digital? O Dr. Lucas Sampaio, neurocientista e teólogo, apresenta um método claro para reconstruir rotinas com sobriedade, foco no essencial e alinhamento com seu propósito de vida.',
    sampleQuote: '“Não somos o que planejamos em nossos cadernos, mas o que repetimos consistentemente quando ninguém está olhando.”',
    pages: 256,
    isbn: '978-65-89120-04-5',
    publishedYear: 2024,
    dimensions: '16 x 23 cm',
    format: 'Brochura com Orelhas',
    featured: true,
    bestseller: true,
    newRelease: true,
    rating: 4.9,
    reviewCount: 115,
    sampleChapterTitle: 'Capítulo 1: O Silêncio como Ferramenta de Clareza',
    sampleChapterText: 'O excesso de ruído externo cria uma anestesia da consciência. Quando aprendemos a desacelerar e criar pausas deliberadas, nossa mente finalmente encontra espaço para discernir o urgente do que é verdadeiramente eterno.'
  },
  {
    id: 'a-voz-no-deserto',
    title: 'A Voz no Deserto',
    subtitle: 'Coragem profética e perseverança em tempos de incerteza',
    author: 'Pr. Gabriel Vasconcelos',
    authorId: 'gabriel-vasconcelos',
    category: 'Fé',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    price: 47.90,
    originalPrice: 58.00,
    synopsis: 'Como manter a chama da convicção espiritual acesa mesmo quando as circunstâncias ao redor parecem áridas.',
    longDescription: 'O deserto nunca é o destino final, mas a escola formativa dos grandes homens e mulheres de Deus. Uma análise minuciosa das estações de provação e como elas refinam o caráter para missões extraordinárias.',
    sampleQuote: '“Deus nunca desperdiça uma lágrima derramada no deserto; cada uma delas irriga a colheita do amanhã.”',
    pages: 208,
    isbn: '978-65-89120-05-2',
    publishedYear: 2023,
    dimensions: '14 x 21 cm',
    format: 'Brochura com Orelhas',
    featured: false,
    bestseller: false,
    newRelease: false,
    rating: 4.7,
    reviewCount: 64
  },
  {
    id: 'gestao-com-alma',
    title: 'Gestão com Alma',
    subtitle: 'Cultura organizacional humanizada, métricas com propósito e integridade executiva',
    author: 'Dra. Helena Brandão',
    authorId: 'helena-brandao',
    category: 'Liderança',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    price: 64.90,
    originalPrice: 79.00,
    synopsis: 'Como transformar empresas e instituições em ecossistemas de florescimento humano e alta performance.',
    longDescription: 'Combinando cases reais do mercado nacional e preceitos de sabedoria clássica, este livro demonstra que o maior patrimônio de qualquer organização é o coração e o caráter de seus colaboradores.',
    sampleQuote: '“Empresas sem propósito geram apenas lucros temporários; empresas com alma deixam um legado inegociável.”',
    pages: 312,
    isbn: '978-65-89120-06-9',
    publishedYear: 2024,
    dimensions: '16 x 23 cm',
    format: 'Edição Especial',
    featured: false,
    bestseller: false,
    newRelease: true,
    rating: 4.9,
    reviewCount: 52
  },
  {
    id: 'coracoes-conectados',
    title: 'Corações Conectados',
    subtitle: 'A arte de educar filhos na era da distração digital',
    author: 'Marcos & Cecília Andrade',
    authorId: 'marcos-cecilia-andrade',
    category: 'Família',
    coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    price: 48.90,
    originalPrice: 59.90,
    synopsis: 'Estratégias afetivas e práticas para resgatar a atenção e o vínculo profundo com crianças e adolescentes.',
    longDescription: 'Diante de algoritmos vorazes e telas onipresentes, como proteger a imaginação e a inocência dos nossos filhos? Um guia acolhedor para pais que desejam presença antes de presentes.',
    sampleQuote: '“Seus filhos não se lembrarão do quanto você trabalhou, mas do quanto você esteve inteiramente presente quando eles precisaram.”',
    pages: 196,
    isbn: '978-65-89120-07-6',
    publishedYear: 2024,
    dimensions: '14 x 21 cm',
    format: 'Brochura com Orelhas',
    featured: false,
    bestseller: false,
    newRelease: true,
    rating: 4.8,
    reviewCount: 73
  },
  {
    id: 'o-mapa-da-vocacao',
    title: 'O Mapa da Vocação',
    subtitle: 'Descobrindo o ponto de encontro entre suas paixões, talentos e as necessidades do mundo',
    author: 'Dr. Lucas Sampaio',
    authorId: 'lucas-sampaio',
    category: 'Desenvolvimento Pessoal',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    price: 54.00,
    originalPrice: 66.00,
    synopsis: 'Exercícios práticos e fundamentação teórica para encontrar sua missão singular e trabalhar com realização plena.',
    longDescription: 'Vocação não é apenas uma profissão, mas uma resposta amorosa àquilo para o qual fomos criados. Uma bússola indispensável para jovens, profissionais em transição de carreira e líderes maduros.',
    sampleQuote: '“Onde a sua profunda alegria se encontra com a profunda fome do mundo, ali reside a sua sublime vocação.”',
    pages: 264,
    isbn: '978-65-89120-08-3',
    publishedYear: 2023,
    dimensions: '16 x 23 cm',
    format: 'Brochura com Orelhas',
    featured: false,
    bestseller: true,
    newRelease: false,
    rating: 4.9,
    reviewCount: 130
  }
];

export const AUTHORS: Author[] = [
  {
    id: 'gabriel-vasconcelos',
    name: 'Pr. Gabriel Vasconcelos',
    role: 'Teólogo, Escritor e Conferencista',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Mestre em Teologia Bíblica e Filosofia da Religião, Gabriel Vasconcelos dedica sua vida à formação de líderes e à pregação expositiva. É autor de obras aclamadas no meio literário cristão, com foco na restauração da espiritualidade bíblica profunda.',
    shortBio: 'Mestre em Teologia Bíblica e autor dos best-sellers "O Legado Invisível" e "A Voz no Deserto".',
    quote: '“Escrever para a Átrios é ter a certeza de que cada linha é cuidada com o respeito reverente que uma mensagem divina merece.”',
    location: 'Belo Horizonte, MG',
    booksCount: 2,
    specialties: ['Espiritualidade', 'Discipulado', 'Teologia Prática'],
    bookIds: ['o-legado-invisivel', 'a-voz-no-deserto'],
    featured: true
  },
  {
    id: 'helena-brandao',
    name: 'Dra. Helena Brandão',
    role: 'Executiva, Consultora de Liderança e Doutora em Administração',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Com mais de 25 anos de atuação em conselhos consultivos de grandes corporações e ministérios internacionais, Dra. Helena é referência em governança ética, desenvolvimento de executivos e liderança servidora.',
    shortBio: 'Doutora em Administração e consultora executiva, autora de "Liderança de Joelhos" e "Gestão com Alma".',
    quote: '“Encontrei na Átrios uma parceira editorial que não busca apenas números de vendas, mas a densidade do impacto em quem lidera.”',
    location: 'São Paulo, SP',
    booksCount: 2,
    specialties: ['Liderança Servidora', 'Cultura Corporativa', 'Gestão com Propósito'],
    bookIds: ['lideranca-de-joelhos', 'gestao-com-alma'],
    featured: true
  },
  {
    id: 'marcos-cecilia-andrade',
    name: 'Marcos & Cecília Andrade',
    role: 'Terapeutas Familiares e Educadores Parentais',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    bio: 'Casados há mais de 30 anos e pais de 3 filhos, Marcos e Cecília fundaram o Instituto Família em Foco, ministrando cursos de noivos, restauração matrimonial e parentalidade consciente em todo o país.',
    shortBio: 'Especialistas em terapia familiar e autores de "A Casa Edificada" e "Corações Conectados".',
    quote: '“Publicar livros que entram nas salas de estar e curam relacionamentos é a nossa maior honra junto à Átrios.”',
    location: 'Curitiba, PR',
    booksCount: 2,
    specialties: ['Casamento', 'Parentalidade', 'Comunicação Afetiva'],
    bookIds: ['a-casa-edificada', 'coracoes-conectados'],
    featured: true
  },
  {
    id: 'lucas-sampaio',
    name: 'Dr. Lucas Sampaio',
    role: 'Neurocientista, Psicólogo e Pesquisador de Hábitos',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Pós-doutor em Ciências Comportamentais com especialização em neuroplasticidade e bem-estar subjetivo. Dedica-se a unir o rigor da ciência aos valores transcendentais para o florescimento humano.',
    shortBio: 'Pesquisador em comportamento e autor de "A Arquitetura do Hábito Interior" e "O Mapa da Vocação".',
    quote: '“A Átrios compreende que a mente humana precisa de profundidade, não de receitas prontas ou superficialidades.”',
    location: 'Rio de Janeiro, RJ',
    booksCount: 2,
    specialties: ['Desenvolvimento Pessoal', 'Neurociência', 'Propósito de Vida'],
    bookIds: ['arquitetura-do-habito-interior', 'o-mapa-da-vocacao'],
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

export const TESTIMONIALS: ReaderTestimonial[] = [
  {
    id: 't-1',
    name: 'Priscila Menezes',
    role: 'Líder de Mulheres e Pedagoga',
    city: 'Brasília, DF',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    bookTitle: 'O Legado Invisível',
    comment: '“Terminei a leitura com lágrimas nos olhos e uma nova perspectiva sobre a educação dos meus filhos. Os livros da Átrios têm uma densidade rara no mercado atual.”',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Carlos Eduardo Fontes',
    role: 'Diretor de Operações e Mentor de Startups',
    city: 'Campinas, SP',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    bookTitle: 'Liderança de Joelhos',
    comment: '“Apliquei os conceitos do livro diretamente na minha equipe de 40 pessoas. O nível de respeito mútuo e clareza de propósito aumentou exponencialmente.”',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Daniele e Rodrigo Silveira',
    role: 'Pais de 2 e Coordenadores de Casais',
    city: 'Florianópolis, SC',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bookTitle: 'A Casa Edificada',
    comment: '“A Átrios se tornou a nossa editora de cabeceira. O primor do papel, a profundidade das reflexões e o foco na família transformaram nosso lar.”',
    rating: 5
  }
];

export const STATS = [
  { label: 'Títulos Publicados', value: '45+' },
  { label: 'Exemplares Distribuídos', value: '180.000+' },
  { label: 'Autores e Colaboradores', value: '28' },
  { label: 'Cidades Alcançadas', value: '350+' }
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
