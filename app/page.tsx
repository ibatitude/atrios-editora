import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookCard } from '@/components/BookCard';
import { AUTHORS, BOOKS, STATS, TESTIMONIALS } from '@/lib/data';
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, siteUrl } from '@/lib/seo';
import { ADDRESS, EDITORIAL_EMAIL } from '@/lib/contact';
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Feather,
  HeartHandshake,
  Star,
  Send
} from 'lucide-react';

export const metadata: Metadata = {
  // A Home usa o title `default` do layout (nome + tagline), então não redefine `title` aqui.
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: '/',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function HomePage() {
  const books = BOOKS;
  const authors = AUTHORS;
  const featuredBooks = books.filter((b) => b.featured).slice(0, 4);

  const base = siteUrl();

  // Identidade da editora para o Google: complementa o schema Book/Person das rotas
  // dinâmicas, que referenciam esta Organization como publisher.
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: SITE_NAME,
      url: base,
      slogan: SITE_TAGLINE,
      description: SITE_DESCRIPTION,
      knowsLanguage: 'pt-BR',
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.city,
        addressRegion: ADDRESS.state,
        addressCountry: 'BR',
      },
      email: EDITORIAL_EMAIL,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      name: SITE_NAME,
      url: base,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${base}/#organization` },
    },
  ];

  return (
    <div id="home-page" className="space-y-20 sm:space-y-28 pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden border-b border-[#0F2C2C15] bg-[#FDFBF7]"
      >
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#D9D1C5]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#0F2C2C]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left: Brand Statement & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#0F2C2C]/5 border border-[#0F2C2C]/15 text-[#0F2C2C] text-xs font-bold uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-[#0F2C2C]"></span>
                <span>Editorial de Propósito & Literatura Relevante</span>
              </div>

              {/* Official Slogan from User Prompt */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2C2C] leading-[1.15] tracking-tight">
                Livros que carregam propósito.{' '}
                <span className="italic font-normal block sm:inline">
                  Palavras que transformam vidas.
                </span>
              </h1>

              {/* Official Hero Text from User Prompt */}
              <p className="text-base sm:text-lg text-[#2D2D2D]/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
                Na Átrios, acreditamos que um livro pode ir muito além de páginas. Pode despertar uma fé, ampliar uma visão, fortalecer uma liderança, trazer respostas e marcar uma geração. Por isso, publicamos livros que unem conteúdo, propósito e relevância, levando ao leitor mensagens que merecem ser lidas, vividas e compartilhadas.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  id="hero-cta-catalog-btn"
                  href="/catalogo"
                  className="w-full sm:w-auto px-8 py-4 bg-[#0F2C2C] hover:bg-[#1a4040] text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <BookOpen className="w-4 h-4 text-[#D9D1C5]" />
                  <span>[Conheça nossos livros]</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  id="hero-cta-about-btn"
                  href="/sobre"
                  className="w-full sm:w-auto px-6 py-4 bg-transparent hover:bg-[#0F2C2C05] text-[#0F2C2C] border border-[#0F2C2C30] hover:border-[#0F2C2C] font-bold text-xs uppercase tracking-wider rounded-sm transition-all duration-200"
                >
                  Conheça a Átrios
                </Link>
              </div>

              {/* Editorial Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-left border-t border-[#0F2C2C15]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0F2C2C] flex-shrink-0" />
                  <span className="text-xs text-[#0F2C2C]/80 font-medium">Curadoria Teológica</span>
                </div>
                <div className="flex items-center gap-2">
                  <Feather className="w-4 h-4 text-[#0F2C2C] flex-shrink-0" />
                  <span className="text-xs text-[#0F2C2C]/80 font-medium">Excelência Gráfica</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#0F2C2C] flex-shrink-0" />
                  <span className="text-xs text-[#0F2C2C]/80 font-medium">Cuidado com o Autor</span>
                </div>
              </div>

            </div>

            {/* Hero Right: Featured Book Showcase Composition */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative">
                {/* Background Card */}
                <div className="absolute -inset-4 bg-[#E8E2D9] rounded-sm -rotate-2 transform scale-95 opacity-70"></div>
                
                {/* Main Hero Card Spotlight */}
                <div className="relative bg-white border border-[#0F2C2C15] p-6 rounded-sm shadow-md max-w-sm">
                  <div className="flex items-center justify-between text-xs text-[#0F2C2C]/60 mb-3">
                    <span className="px-2.5 py-0.5 bg-[#D9D1C5] text-[#0F2C2C] font-bold rounded-sm text-[10px] uppercase tracking-wider">
                      Lançamento em Destaque
                    </span>
                    <div className="flex items-center text-[#0F2C2C]">
                      <Star className="w-3.5 h-3.5 fill-[#0F2C2C] text-[#0F2C2C]" />
                      <span className="ml-1 font-bold text-[#0F2C2C]">5.0</span>
                    </div>
                  </div>

                  <Link
                    href={`/livros/${books[1].id}`}
                    className="group flex flex-col items-center"
                  >
                    <div className="w-[180px] h-[250px] rounded-r-sm rounded-l-xs overflow-hidden relative shadow-md book-shadow book-spine-effect my-2 transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={books[1].coverImage}
                        alt={books[1].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3 text-white">
                        <span className="text-[9px] uppercase font-sans tracking-[0.2em] text-[#D9D1C5] font-semibold">
                          ÁTRIOS
                        </span>
                        <h4 className="font-serif font-bold text-sm leading-tight text-white">
                          {books[1].title}
                        </h4>
                        <p className="text-[10px] text-white/80 font-sans">{books[1].author}</p>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#0F2C2C] text-center mt-3 group-hover:opacity-80">
                      {books[1].title}
                    </h3>
                    <p className="text-xs text-[#0F2C2C]/60 text-center italic mt-0.5">
                      {books[1].subtitle}
                    </p>
                    <p className="text-xs text-[#2D2D2D]/80 text-center mt-2 line-clamp-2">
                      {books[1].synopsis}
                    </p>
                  </Link>

                  <div className="mt-4 pt-3 border-t border-[#0F2C2C15] flex items-center justify-between">
                    <div>
                      <span className="font-serif font-bold text-lg text-[#0F2C2C]">
                        R$ {books[1].price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <Link
                      href={`/livros/${books[1].id}`}
                      className="px-3.5 py-1.5 bg-[#0F2C2C] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#1a4040] transition-colors"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>

                {/* Floating quote badge */}
                <div className="absolute -bottom-6 -left-6 bg-[#FDFBF7] border border-[#0F2C2C15] p-3 rounded-sm shadow-md max-w-[220px] hidden sm:block">
                  <p className="text-[11px] font-serif italic text-[#0F2C2C]">
                    “Uma obra que redefine a autoridade através da humildade.”
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. MANIFESTO / MISSION SECTION */}
      <section id="manifesto-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F2C2C] text-[#FDFBF7] rounded-sm p-8 sm:p-14 relative overflow-hidden shadow-lg">
          {/* Subtle gold ornamental corner accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D9D1C5] block">
              Manifesto Editorial
            </span>

            {/* Official Manifesto Heading from User Prompt */}
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#FDFBF7]">
              Mais do que livros.{' '}
              <span className="italic font-normal text-[#D9D1C5]">
                Mensagens com propósito.
              </span>
            </h2>

            <div className="w-16 h-0.5 bg-[#D9D1C5] mx-auto"></div>

            {/* Official Manifesto text */}
            <p className="font-serif italic text-base sm:text-xl text-[#FDFBF7]/90 leading-relaxed">
              “Na Átrios, acreditamos que um livro pode ir muito além de páginas. Pode despertar uma fé, ampliar uma visão, fortalecer uma liderança, trazer respostas e marcar uma geração. Por isso, publicamos livros que unem conteúdo, propósito e relevância, levando ao leitor mensagens que merecem ser lidas, vividas e compartilhadas.”
            </p>

            <div className="pt-4 flex items-center justify-center gap-4 text-xs font-sans opacity-70">
              <span>Átrios Editora</span>
              <span>•</span>
              <span>Compromisso com o que permanece</span>
            </div>
          </div>
        </div>
      </section>


      {/* 3. INSTITUTIONAL PURPOSE & NUMBERS */}
      <section id="purpose-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Purpose narrative */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70 block">
              Nosso Propósito
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C2C] leading-tight">
              Publicar aquilo que vale a pena ser lido.
            </h2>

            {/* Official Mission Text */}
            <p className="text-base text-[#2D2D2D]/85 leading-relaxed font-sans">
              A Átrios existe para dar voz a autores e mensagens que podem contribuir para a construção de pessoas mais conscientes, maduras e preparadas para viver seu propósito.
            </p>

            <p className="text-sm text-[#2D2D2D]/75 leading-relaxed">
              Trabalhamos com os mais elevados padrões editoriais para que cada obra seja um instrumento de transformação pessoal, fortalecimento familiar e despertamento de lideranças éticas e corajosas em nosso país.
            </p>

            <div className="pt-2">
              <Link
                id="purpose-know-more-btn"
                href="/sobre"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0F2C2C] hover:opacity-80 transition-opacity group"
              >
                <span>Conheça a história e os valores da Átrios</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-6 rounded-sm border border-[#0F2C2C15] shadow-xs hover:border-[#0F2C2C]/30 transition-all text-center sm:text-left"
                >
                  <span className="font-serif font-bold text-2xl sm:text-4xl text-[#0F2C2C] block">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#0F2C2C]/60 mt-1 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* 4. FEATURED CATALOG */}
      <section id="featured-catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#0F2C2C15] pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70">
              Catálogo em Destaque
            </span>
            {/* Official Catalog Header from User Prompt */}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C2C]">
              Livros que inspiram. Ideias que permanecem.
            </h2>
            <p className="text-sm text-[#2D2D2D]/70 max-w-xl">
              Obras cuidadosamente selecionadas que unem profundidade conceitual, rigor bíblico e aplicabilidade prática.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0F2C2C] hover:bg-[#1a4040] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Categories Quick Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {['Todas', 'Fé', 'Liderança', 'Família', 'Desenvolvimento Pessoal'].map((cat) => (
            <Link
              key={cat}
              href={cat === 'Todas' ? '/catalogo' : `/catalogo?categoria=${encodeURIComponent(cat)}`}
              className="px-3.5 py-1.5 text-xs font-bold rounded-sm bg-[#F5F1EB] hover:bg-[#E8E2D9] text-[#0F2C2C] transition-colors"
            >
              {cat === 'Todas' ? 'Todos os Títulos' : cat}
            </Link>
          ))}
        </div>

        {/* Books Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>


      {/* 5. AUTHORS SPOTLIGHT QUICK SECTION */}
      <section id="authors-spotlight-section" className="bg-[#F5F1EB] py-16 border-y border-[#0F2C2C15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70">
              Nossos Escritores
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C2C]">
              Grandes mensagens precisam encontrar grandes leitores
            </h2>
            <p className="text-sm text-[#2D2D2D]/70">
              Conheça os autores que compartilham do mesmo propósito editorial e constroem legados duradouros através de suas palavras.
            </p>
          </div>

          {/* Authors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/autores/${author.id}`}
                className="bg-white rounded-sm p-6 border border-[#0F2C2C15] shadow-xs hover:shadow-md transition-all duration-300 text-center group flex flex-col justify-between"
              >
                <div>
                  <div className="relative mx-auto w-24 h-24 mb-4">
                    <img
                      src={author.photo}
                      alt={author.name}
                      className="w-full h-full object-cover rounded-full border-2 border-[#D9D1C5] group-hover:scale-105 transition-transform duration-300 shadow-xs"
                    />
                    <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#0F2C2C] text-white flex items-center justify-center text-[10px] font-bold">
                      {author.booksCount}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#0F2C2C] group-hover:opacity-80 transition-opacity">
                    {author.name}
                  </h3>
                  <p className="text-xs text-[#0F2C2C] font-semibold mt-0.5 uppercase tracking-wider">
                    {author.specialties[0]}
                  </p>
                  <p className="text-xs text-[#2D2D2D]/70 mt-2.5 line-clamp-2 leading-relaxed">
                    {author.shortBio}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#0F2C2C15]">
                  <span className="text-xs font-bold text-[#0F2C2C] group-hover:opacity-80 flex items-center justify-center gap-1">
                    <span>Ver biografia e obras</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              id="home-view-all-authors-btn"
              href="/autores"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#0F2C2C] text-[#0F2C2C] hover:bg-[#0F2C2C] hover:text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all"
            >
              <span>Conhecer Todos os Autores &amp; Programa Editorial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>


      {/* 6. READERS TESTIMONIALS */}
      <section id="testimonials-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70">
            Vozes de Quem Leu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C2C]">
            Histórias de Transformação
          </h2>
          <p className="text-sm text-[#2D2D2D]/70">
            O testemunho de leitores que encontraram nas obras da Átrios direção, fortalecimento e clareza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-sm border border-[#0F2C2C15] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center text-[#0F2C2C]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0F2C2C] text-[#0F2C2C]" />
                  ))}
                </div>
                <p className="font-serif italic text-sm text-[#2D2D2D]/85 leading-relaxed">
                  {t.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-[#0F2C2C15] flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#D9D1C5]"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0F2C2C]">{t.name}</h4>
                  <p className="text-[11px] text-[#0F2C2C]/60">{t.role} • {t.city}</p>
                  <span className="text-[10px] font-semibold text-[#0F2C2C]/80 block mt-0.5">
                    Leitor de <em>{t.bookTitle}</em>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 7. CTA FOR NEW AUTHORS / MANUSCRIPT SUBMISSION */}
      <section id="home-manuscript-cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F2C2C] text-[#FDFBF7] rounded-sm p-8 sm:p-12 border border-[#0F2C2C] shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D9D1C5]">
              Chamada Editorial para Escritores
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-[#FDFBF7]">
              Você tem uma mensagem que merece ser compartilhada?
            </h2>
            <p className="text-sm opacity-80 leading-relaxed">
              O conselho editorial da Átrios está permanentemente aberto à avaliação de originais que compartilhem dos nossos valores de fé, liderança, família e desenvolvimento pessoal.
            </p>
          </div>

          <Link
            id="home-submit-manuscript-cta-btn"
            href="/contato"
            className="px-8 py-4 bg-[#D9D1C5] hover:bg-[#E8E2D9] text-[#0F2C2C] font-bold text-xs uppercase tracking-widest rounded-sm shadow-md transition-all duration-200 flex-shrink-0 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submeter Meu Manuscrito</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
