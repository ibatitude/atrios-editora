import React from 'react';
import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import Link from 'next/link';
import { AUTHORS, BOOKS } from '@/lib/data';
import {
  Feather,
  BookOpen,
  MapPin,
  Quote,
  Send,
  ArrowRight,
  TrendingUp,
  Layers,
  HeartHandshake
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Autores',
  description:
    'Conheça os autores da Átrios Editora: trajetórias, especialidades e as obras que publicaram conosco.',
  alternates: { canonical: '/autores' },
  openGraph: {
    title: 'Autores | Átrios Editora',
    description: 'Trajetórias e obras dos autores parceiros da Átrios Editora.',
    url: '/autores',
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function AutoresPage() {
  const authors = AUTHORS;
  const books = BOOKS;
  const editorialCommitments = [
    {
      icon: <Feather className="w-6 h-6 text-[#D9D1C5]" />,
      title: 'Acompanhamento Editorial Próximo',
      desc: 'Nossos editores trabalham lado a lado com o autor em cada capítulo, refinando a clareza, a densidade teológica e o impacto comunicativo.'
    },
    {
      icon: <Layers className="w-6 h-6 text-[#D9D1C5]" />,
      title: 'Design Gráfico e Tipografia Nobre',
      desc: 'Cada capa, escolha de fonte e acabamento físico é concebido como uma obra de arte única que honra a dignidade da mensagem.'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#D9D1C5]" />,
      title: 'Distribuição e Posicionamento Estratégico',
      desc: 'Presença nas principais livrarias físicas e plataformas digitais do Brasil, com plano de lançamento e relacionamento com formadores de opinião.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#D9D1C5]" />,
      title: 'Respeito e Relações de Longo Prazo',
      desc: 'Transparência em relatórios de vendas, contratos justos e compromisso de construir a carreira literária do autor de forma perene.'
    }
  ];

  return (
    <div id="authors-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20 sm:space-y-28 pb-24">
      
      {/* 1. Header Hero */}
      <section className="bg-[#0F2C2C] text-[#FDFBF7] rounded-sm p-8 sm:p-14 relative overflow-hidden shadow-md">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D9D1C5]">
            Nossos Escritores
          </span>
          {/* Official Presentation Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-[#FDFBF7]">
            Grandes mensagens precisam encontrar grandes leitores
          </h1>
          <p className="text-base sm:text-lg text-[#FDFBF7]/85 leading-relaxed">
            Na Átrios Editora, os autores não são apenas nomes na capa: são parceiros de missão, vozes que constroem pontes de sabedoria e transformam gerações.
          </p>
        </div>

        <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>


      {/* 2. Authors Profiles Grid */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#0F2C2C15] pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70">
              Comunidade de Escritores
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F2C2C]">
              Autores que Marcam o Nosso Tempo
            </h2>
          </div>
          <span className="text-xs text-[#0F2C2C]/60">
            Clique em qualquer autor para ver biografia completa e bibliografia
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {authors.map((author) => {
            const authorBooks = books.filter((b) => b.authorId === author.id);

            return (
              <div
                key={author.id}
                id={`author-card-${author.id}`}
                className="bg-white rounded-sm p-6 sm:p-8 border border-[#0F2C2C15] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                {/* Author Card Top */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                  <div className="relative flex-shrink-0">
                    <img
                      src={author.photo}
                      alt={author.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#D9D1C5] shadow-xs"
                    />
                    <span className="absolute bottom-0 right-0 px-2 py-0.5 rounded-sm bg-[#0F2C2C] text-[#FDFBF7] text-[10px] font-bold">
                      {author.booksCount} {author.booksCount > 1 ? 'obras' : 'obra'}
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-grow">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0F2C2C]">
                      <Link
                        href={`/autores/${author.id}`}
                        className="hover:opacity-80 transition-opacity"
                      >
                        {author.name}
                      </Link>
                    </h3>
                    <p className="text-xs font-bold text-[#0F2C2C] uppercase tracking-wider">
                      {author.role}
                    </p>
                    <p className="text-xs text-[#0F2C2C]/60 flex items-center justify-center sm:justify-start gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{author.location}</span>
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 justify-center sm:justify-start">
                      {author.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-sm bg-[#F5F1EB] text-[#0F2C2C] font-semibold"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Author Quote */}
                <div className="bg-[#F5F1EB] p-4 rounded-sm border border-[#0F2C2C15] italic text-xs text-[#2D2D2D]/85 font-serif leading-relaxed flex items-start gap-2.5">
                  <Quote className="w-4 h-4 text-[#0F2C2C] flex-shrink-0 mt-0.5" />
                  <span>{author.quote}</span>
                </div>

                {/* Published Books Snippet */}
                <div className="space-y-2 pt-2 border-t border-[#0F2C2C15]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F2C2C]/60 block">
                    Títulos Publicados:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {authorBooks.map((b) => (
                      <Link
                        key={b.id}
                        href={`/livros/${b.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#F5F1EB] hover:bg-[#0F2C2C] hover:text-white text-[#0F2C2C] text-xs font-bold transition-colors group"
                      >
                        <BookOpen className="w-3 h-3 text-[#D9D1C5]" />
                        <span>{b.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2 flex justify-end">
                  <Link
                    href={`/autores/${author.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F2C2C] hover:opacity-80 transition-opacity uppercase tracking-wider"
                  >
                    <span>Conhecer Trajetória Completa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 3. The Editorial Commitment to Writers */}
      <section className="bg-[#F5F1EB] p-8 sm:p-14 rounded-sm border border-[#0F2C2C15] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70">
            Compromisso Editorial
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C2C]">
            Como Cuidamos do Escritor e de sua Obra
          </h2>
          <p className="text-sm text-[#2D2D2D]/70">
            Publicar com a Átrios significa ter ao seu lado uma equipe que valoriza sua história e zela pela pureza da mensagem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {editorialCommitments.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-sm border border-[#0F2C2C15] space-y-3 shadow-xs"
            >
              <div className="w-10 h-10 rounded-sm bg-[#0F2C2C] flex items-center justify-center">
                {item.icon}
              </div>
              <h4 className="font-serif font-bold text-base text-[#0F2C2C]">
                {item.title}
              </h4>
              <p className="text-xs text-[#2D2D2D]/75 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* 4. CTA to Submit Original */}
      <section className="bg-[#0F2C2C] text-[#FDFBF7] rounded-sm p-8 sm:p-12 border border-[#0F2C2C] shadow-lg text-center max-w-4xl mx-auto space-y-6">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#D9D1C5] block">
          Escreva para o Mundo
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight text-[#FDFBF7]">
          Você escreveu uma mensagem transformadora?
        </h2>
        <p className="text-sm sm:text-base text-[#FDFBF7]/85 max-w-2xl mx-auto leading-relaxed">
          Nossa equipe avalia manuscritos de autores iniciantes e experientes que dialoguem com os campos da Fé Cristã, Liderança Ética, Família e Desenvolvimento Pessoal.
        </p>

        <div className="pt-2">
          <Link
            href="/contato"
            className="px-8 py-4 bg-[#D9D1C5] hover:bg-[#E8E2D9] text-[#0F2C2C] font-bold text-xs uppercase tracking-widest rounded-sm shadow-md transition-all inline-flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Manuscrito para Avaliação</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
