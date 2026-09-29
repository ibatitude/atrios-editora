export type BookCategory = 'Fé' | 'Liderança' | 'Família' | 'Desenvolvimento Pessoal';

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorId: string;
  category: BookCategory;
  coverImage: string;
  /** Página do produto na loja Nuvemshop, para onde o botão de compra leva. */
  storeUrl: string;
  price: number;
  originalPrice?: number;
  synopsis: string;
  longDescription: string;
  sampleQuote: string;
  // Dados de ficha técnica ainda não informados pela editora ficam ausentes e não aparecem na tela.
  pages?: number;
  isbn?: string;
  publishedYear?: number;
  dimensions?: string;
  format?: 'Brochura com Orelhas' | 'Capa Dura' | 'Edição Especial';
  featured?: boolean;
  bestseller?: boolean;
  newRelease?: boolean;
  sampleChapterTitle?: string;
  sampleChapterText?: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  shortBio: string;
  quote: string;
  location?: string;
  booksCount: number;
  specialties: string[];
  bookIds: string[];
  featured?: boolean;
}

export interface EditorialValue {
  icon: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'leitor' | 'livraria' | 'imprensa' | 'parceria';
}

export interface ManuscriptFormData {
  authorName: string;
  email: string;
  phone: string;
  cityState: string;
  bookTitle: string;
  category: BookCategory;
  targetAudience: string;
  estimatedPages: number;
  synopsis: string;
  authorBio: string;
  hasPublishedBefore: boolean;
  sampleFile?: File | null;
  agreementAccepted: boolean;
}
