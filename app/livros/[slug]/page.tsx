import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BOOKS, getAuthor, getBook } from '@/lib/data';
import { SITE_NAME, siteUrl } from '@/lib/seo';
import { BookTabs } from '@/components/BookTabs';
import { BookPurchase } from '@/components/BookPurchase';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// O static export não suporta dynamicParams: todo slug precisa existir no build.
export const dynamicParams = false;

export function generateStaticParams() {
  return BOOKS.map((book) => ({ slug: book.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);

  if (!book) return {};

  const title = book.subtitle ? `${book.title} — ${book.subtitle}` : book.title;
  const canonical = `/livros/${book.id}`;

  return {
    title,
    description: book.synopsis,
    alternates: { canonical },
    openGraph: {
      type: 'book',
      title: `${book.title} | ${book.author}`,
      description: book.synopsis,
      url: canonical,
      images: [{ url: book.coverImage, alt: `Capa do livro ${book.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${book.title} | ${book.author}`,
      description: book.synopsis,
      images: [book.coverImage],
    },
  };
}

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params;
  const book = getBook(slug);

  if (!book) notFound();

  const author = getAuthor(book.authorId);

  // Dados estruturados: habilita rich results de livro/produto na busca.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    ...(book.subtitle ? { alternateName: book.subtitle } : {}),
    author: { '@type': 'Person', name: book.author },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    ...(book.isbn ? { isbn: book.isbn } : {}),
    ...(book.pages ? { numberOfPages: book.pages } : {}),
    inLanguage: 'pt-BR',
    ...(book.publishedYear ? { datePublished: String(book.publishedYear) } : {}),
    ...(book.format ? { bookFormat: book.format === 'Capa Dura' ? 'https://schema.org/Hardcover' : 'https://schema.org/Paperback' } : {}),
    description: book.longDescription,
    image: `${siteUrl()}${book.coverImage}`,
    url: `${siteUrl()}/livros/${book.id}`,
    offers: {
      '@type': 'Offer',
      price: book.price.toFixed(2),
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: book.storeUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Trilha de navegação */}
        <nav aria-label="Trilha de navegação" className="flex items-center gap-1.5 text-xs text-[#0F2C2C]/60">
          <Link href="/" className="hover:text-[#0F2C2C] hover:underline">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/catalogo" className="hover:text-[#0F2C2C] hover:underline">Catálogo</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#0F2C2C] font-medium">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Capa */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="w-[200px] h-[290px] rounded-r-xs overflow-hidden relative shadow-xl book-shadow book-spine-effect border border-black/20">
              <img
                src={book.coverImage}
                alt={`Capa do livro ${book.title}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3 text-center">
              {book.format && (
                <span className="text-[11px] text-[#0F2C2C]/70 font-medium block">
                  Formato: {book.format}
                </span>
              )}
              <span className="text-[11px] text-[#0F2C2C]/70">
                {[book.pages && `${book.pages} páginas`, book.dimensions].filter(Boolean).join(' • ')}
              </span>
            </div>
          </div>

          {/* Cabeçalho do livro */}
          <div className="md:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-sm bg-[#0F2C2C] text-[#FDFBF7]">
                {book.category}
              </span>
              {book.isbn && <span className="text-xs text-[#0F2C2C]/60">ISBN {book.isbn}</span>}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C2C] leading-tight">
              {book.title}
            </h1>

            {book.subtitle && (
              <p className="text-sm sm:text-base text-[#2D2D2D]/75 font-serif italic">
                {book.subtitle}
              </p>
            )}

            <div className="pt-1 pb-2">
              <span className="text-xs text-[#0F2C2C]/60">Autor: </span>
              <Link
                href={`/autores/${book.authorId}`}
                className="text-sm font-bold text-[#0F2C2C] hover:opacity-75 hover:underline transition-opacity"
              >
                {book.author}
              </Link>
            </div>

            <BookPurchase book={book} />
          </div>
        </div>

        {/* Citação */}
        <blockquote className="bg-[#0F2C2C] text-[#FDFBF7] p-5 sm:p-6 rounded-sm relative overflow-hidden shadow-sm">
          <div className="relative z-10 flex items-start gap-3">
            <span className="text-3xl font-serif text-[#D9D1C5] leading-none">“</span>
            <p className="font-serif italic text-sm sm:text-base text-[#FDFBF7]/90 leading-relaxed">
              {book.sampleQuote.replace(/[“”"]/g, '')}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 text-[100px] font-serif text-white/5 pointer-events-none -mb-10 -mr-4">
            ”
          </div>
        </blockquote>

        <BookTabs book={book} />

        {/* Sobre o autor */}
        {author && (
          <section className="bg-[#F5F1EB] border border-[#0F2C2C15] rounded-sm p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start">
            <img
              src={author.photo}
              alt={`Retrato de ${author.name}`}
              className="w-20 h-20 rounded-full object-cover border border-[#0F2C2C] flex-shrink-0"
            />
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-[#0F2C2C]/60 font-bold">
                Sobre o autor
              </span>
              <h2 className="font-serif text-xl font-bold text-[#0F2C2C]">{author.name}</h2>
              <p className="text-sm text-[#2D2D2D]/80 leading-relaxed">{author.shortBio}</p>
              <Link
                href={`/autores/${author.id}`}
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0F2C2C] hover:underline"
              >
                Ver perfil completo <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        )}

        <div className="flex items-center gap-1.5 text-xs text-[#0F2C2C]/70 font-medium border-t border-[#0F2C2C15] pt-5">
          <ShieldCheck className="w-4 h-4 text-[#0F2C2C]" />
          <span>Garantia de Excelência Editorial Átrios</span>
        </div>
      </div>
    </>
  );
}
