import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import Link from 'next/link';
import { CatalogBrowser } from '@/components/CatalogBrowser';
import { BookGrid } from '@/components/BookGrid';
import { BOOKS, CATEGORIES, CATEGORY_LABELS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Catálogo',
  description:
    'Explore a curadoria da Átrios Editora: obras de fé, liderança, família e desenvolvimento pessoal que desafiam a superficialidade e edificam vidas.',
  alternates: { canonical: '/catalogo' },
  openGraph: {
    title: 'Catálogo | Átrios Editora',
    description:
      'Livros que inspiram. Ideias que permanecem. Conheça as obras publicadas pela Átrios Editora.',
    url: '/catalogo',
    images: [DEFAULT_OG_IMAGE],
  },
};

/** Catálogo completo, sem filtro: o conteúdo que fica no HTML estático de /catalogo. */
function CatalogFallback() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 border-b border-[#0F2C2C15] pb-4">
        <Link
          href="/catalogo"
          className="px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider bg-[#0F2C2C] text-[#FDFBF7] shadow-xs"
        >
          Todos os Livros
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/catalogo?categoria=${encodeURIComponent(cat)}`}
            className="px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider bg-[#F5F1EB] text-[#0F2C2C] hover:bg-[#E8E2D9] transition-colors"
          >
            {CATEGORY_LABELS[cat]}
          </Link>
        ))}
      </div>

      <p className="text-xs text-[#0F2C2C]/70 px-1">
        Exibindo <strong>{BOOKS.length}</strong> títulos publicados pela Átrios Editora.
      </p>

      <BookGrid books={BOOKS} />
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <div id="catalog-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      {/* Header Banner */}
      <div className="bg-[#0F2C2C] text-[#FDFBF7] rounded-sm p-8 sm:p-12 relative overflow-hidden shadow-md">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D9D1C5]">
            Catálogo Editorial Átrios
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-[#FDFBF7]">
            Livros que Inspiram. Ideias que Permanecem.
          </h1>
          <p className="text-sm sm:text-base text-[#FDFBF7]/85 leading-relaxed">
            Explore nossa curadoria de obras que desafiam a superficialidade e edificam vidas, lares e lideranças através de mensagens de relevância atemporal.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/*
        `useSearchParams` no CatalogBrowser faz o Next renderizar o fallback — e só o
        fallback — no HTML estático. Por isso o fallback é o catálogo completo, e não um
        spinner: é ele que entrega os links de todos os livros ao crawler. O browser
        interativo assume na hidratação.
      */}
      <Suspense fallback={<CatalogFallback />}>
        <CatalogBrowser />
      </Suspense>

      {/* Editorial Quality Guarantee Banner */}
      <div className="bg-[#F5F1EB] rounded-sm p-6 sm:p-8 border border-[#0F2C2C15] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1">
          <h2 className="font-serif font-bold text-lg text-[#0F2C2C]">
            Precisa de compras em grande quantidade para sua igreja, empresa ou instituição?
          </h2>
          <p className="text-xs text-[#2D2D2D]/70">
            Oferecemos condições editoriais diretas para ministérios, treinamentos corporativos e livrarias parceiras.
          </p>
        </div>

        <Link
          href="/contato"
          className="px-5 py-2.5 bg-[#0F2C2C] hover:bg-[#1a4040] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex-shrink-0 transition-colors"
        >
          Consultar Condições Especiais
        </Link>
      </div>
    </div>
  );
}
