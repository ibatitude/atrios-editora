import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AUTHORS, getAuthor, getBooksByAuthor } from '@/lib/data';
import { siteUrl } from '@/lib/seo';
import { MapPin, Quote, ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// O static export não suporta dynamicParams: todo slug precisa existir no build.
export const dynamicParams = false;

export function generateStaticParams() {
  return AUTHORS.map((author) => ({ slug: author.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);

  if (!author) return {};

  const canonical = `/autores/${author.id}`;

  return {
    title: `${author.name} — ${author.role}`,
    description: author.shortBio,
    alternates: { canonical },
    openGraph: {
      type: 'profile',
      title: `${author.name} | Autor da Átrios Editora`,
      description: author.shortBio,
      url: canonical,
      images: [{ url: author.photo, alt: `Retrato de ${author.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${author.name} | Autor da Átrios Editora`,
      description: author.shortBio,
      images: [author.photo],
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthor(slug);

  if (!author) notFound();

  const authorBooks = getBooksByAuthor(author.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    image: author.photo,
    url: `${siteUrl()}/autores/${author.id}`,
    knowsAbout: author.specialties,
    ...(author.location ? { homeLocation: { '@type': 'Place', name: author.location } } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Trilha de navegação */}
        <nav aria-label="Trilha de navegação" className="flex items-center gap-1.5 text-xs text-[#0F2C2C]/60">
          <Link href="/" className="hover:text-[#0F2C2C] hover:underline">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/autores" className="hover:text-[#0F2C2C] hover:underline">Autores</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#0F2C2C] font-medium">{author.name}</span>
        </nav>

        {/* Cabeçalho do autor */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={author.photo}
            alt={`Retrato de ${author.name}`}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-[#0F2C2C] shadow-md flex-shrink-0"
          />
          <div className="space-y-1.5">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#0F2C2C]/60">
              Autor Parceiro Átrios
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#0F2C2C]">{author.name}</h1>
            <p className="text-xs font-bold uppercase tracking-wider text-[#0F2C2C]/80">
              {author.role}
            </p>
            <p className="text-xs text-[#0F2C2C]/60 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{author.location}</span>
              <span>•</span>
              <span>
                {author.booksCount} {author.booksCount > 1 ? 'obras publicadas' : 'obra publicada'}
              </span>
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2 justify-center sm:justify-start">
              {author.specialties.map((spec) => (
                <span
                  key={spec}
                  className="text-[11px] px-2.5 py-1 rounded-sm bg-[#E8E2D9] text-[#0F2C2C] font-semibold"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Citação */}
        <blockquote className="bg-[#0F2C2C] text-[#FDFBF7] p-5 rounded-sm flex items-start gap-3 shadow-sm">
          <Quote className="w-5 h-5 text-[#D9D1C5] flex-shrink-0 mt-0.5" />
          <p className="font-serif italic text-sm sm:text-base text-[#FDFBF7]/90 leading-relaxed">
            {author.quote}
          </p>
        </blockquote>

        {/* Biografia */}
        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-[#0F2C2C] border-b border-[#0F2C2C15] pb-1.5">
            Sobre o Autor
          </h2>
          <p className="text-sm text-[#2D2D2D]/85 leading-relaxed">{author.bio}</p>
        </section>

        {/* Obras */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl text-[#0F2C2C] border-b border-[#0F2C2C15] pb-1.5 flex items-center justify-between">
            <span>Obras na Átrios Editora</span>
            <span className="text-xs font-sans font-normal text-[#0F2C2C]/60">
              {authorBooks.length} {authorBooks.length === 1 ? 'título' : 'títulos'}
            </span>
          </h2>

          <div className="space-y-2.5">
            {authorBooks.map((b) => (
              <Link
                key={b.id}
                href={`/livros/${b.id}`}
                className="flex items-center justify-between p-3 rounded-sm bg-[#F5F1EB] hover:bg-[#E8E2D9] border border-[#0F2C2C15] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={b.coverImage}
                    alt=""
                    className="w-10 h-14 object-cover rounded-xs shadow-xs"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#0F2C2C] group-hover:opacity-80">
                      {b.title}
                    </h3>
                    <p className="text-xs text-[#0F2C2C]/70 line-clamp-1">{b.synopsis}</p>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-[#0F2C2C]/50 group-hover:text-[#0F2C2C] group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
