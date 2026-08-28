import React from 'react';
import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import Link from 'next/link';
import { EDITORIAL_VALUES } from '@/lib/data';
import {
  ShieldCheck,
  Feather,
  HeartHandshake,
  Sparkles,
  BookOpenCheck,
  Compass,
  CheckCircle2,
  Target,
  Eye
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre a Átrios',
  description:
    'Conheça a Átrios Editora: nossos valores editoriais, nosso conselho e o compromisso com livros que unem conteúdo, propósito e relevância.',
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: 'Sobre a Átrios Editora',
    description:
      'Nossos valores editoriais e o compromisso com livros que unem conteúdo, propósito e relevância.',
    url: '/sobre',
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function SobrePage() {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#D9D1C5]" />,
    Feather: <Feather className="w-6 h-6 text-[#D9D1C5]" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-[#D9D1C5]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#D9D1C5]" />,
    BookOpenCheck: <BookOpenCheck className="w-6 h-6 text-[#D9D1C5]" />,
    Compass: <Compass className="w-6 h-6 text-[#D9D1C5]" />
  };

  const milestones = [
    {
      year: 'A Origem',
      title: 'Uma inquietação contra a superficialidade',
      desc: 'A Átrios nasce do anseio de editores, teólogos e líderes que perceberam a urgência de livros que fossem além do entretenimento rápido ou do consumo passageiro.'
    },
    {
      year: 'A Curação',
      title: 'A formação do Conselho Editorial',
      desc: 'Estabelecemos diretrizes inegociáveis de avaliação de originais, unindo sólida fundamentação bíblica, relevância para os dilemas contemporâneos e primor da língua portuguesa.'
    },
    {
      year: 'A Expansão',
      title: 'Autores com propósito e alcance nacional',
      desc: 'Consolidação de títulos que alcançaram centenas de milhares de lares, lideranças e ministérios em todos os estados brasileiros e comunidades de língua portuguesa.'
    },
    {
      year: 'O Futuro',
      title: 'Livros que continuam formando gerações',
      desc: 'Investimento contínuo em novos talentos literários, edições de colecionador e formatos que dialogam com a nova geração sem abrir mão da essência.'
    }
  ];

  return (
    <div id="about-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20 sm:space-y-28 pb-24">
      
      {/* 1. Header Hero */}
      <section className="bg-[#0F2C2C] text-[#FDFBF7] rounded-sm p-8 sm:p-14 relative overflow-hidden shadow-md">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D9D1C5]">
            Institucional & História
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-[#FDFBF7]">
            Conheça a Átrios Editora
          </h1>
          <p className="text-base sm:text-lg text-[#FDFBF7]/85 leading-relaxed">
            Uma casa editorial comprometida com conteúdo relevante, autores com propósito e livros capazes de deixar marcas permanentes na mente e no coração.
          </p>
        </div>

        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>


      {/* 2. Editorial Origin & Expanded History */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70">
            Nossa História & Filosofia
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C2C] leading-tight">
            Porque algumas palavras passam. Outras permanecem.
          </h2>

          <p className="text-base text-[#2D2D2D]/85 leading-relaxed font-sans">
            A <strong>Átrios Editora</strong> nasceu da convicção de que um livro não é apenas um produto gráfico, mas um espaço de encontro sagrado. Na arquitetura do antigo templo, os <em>átrios</em> representavam o lugar de preparação, reverência e acesso ao que é sagrado. Da mesma forma, nossas publicações funcionam como pórticos para uma vida com maior profundidade, maturidade e significado.
          </p>

          <p className="text-sm text-[#2D2D2D]/75 leading-relaxed">
            Em um mundo hiperestimulado, onde a pressa muitas vezes sufoca a reflexão, nos recusamos a publicar aquilo que é apenas efêmero. Escolhemos o caminho do primor textual, da fidelidade aos princípios eternos e do respeito irrevogável ao tempo do leitor.
          </p>

          <div className="bg-[#F5F1EB] p-5 rounded-sm border-l-4 border-[#0F2C2C] space-y-2">
            <p className="font-serif italic text-sm text-[#0F2C2C]">
              “Não medimos o sucesso de uma obra pela velocidade com que ela entra nas listas, mas pela profundidade com que ela transforma o leitor após o término da última página.”
            </p>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#0F2C2C]/70 block">
              — Conselho Editorial Átrios
            </span>
          </div>
        </div>

        {/* Visual Composition */}
        <div className="lg:col-span-6 relative">
          <div className="rounded-sm overflow-hidden border border-[#0F2C2C15] shadow-md relative">
            <img
              src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1000&q=80"
              alt="Livraria e biblioteca Átrios"
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C2C]/90 via-[#0F2C2C]/30 to-transparent flex flex-col justify-end p-8 text-[#FDFBF7]">
              <span className="text-xs uppercase tracking-widest text-[#D9D1C5] font-semibold">
                Compromisso Literário
              </span>
              <h3 className="font-serif text-2xl font-bold mt-1">
                A Arte de Editar com Rigor e Alma
              </h3>
              <p className="text-xs text-[#FDFBF7]/80 mt-1.5 max-w-md">
                Cada página passa por mais de 5 rodadas de revisão crítica, projeto tipográfico milimetricamente calculado e acabamentos gráficos nobres.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 3. Missão, Visão e Valores Fundamentais */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70">
            Diretrizes Estratégicas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C2C]">
            Missão, Visão e Fundamentos
          </h2>
          <p className="text-sm text-[#2D2D2D]/70">
            O que nos move, para onde caminhamos e os valores dos quais nunca abrimos mão.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Missão Card */}
          <div className="bg-white p-8 rounded-sm border border-[#0F2C2C15] shadow-xs space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-sm bg-[#F5F1EB] flex items-center justify-center text-[#0F2C2C]">
              <Target className="w-6 h-6 text-[#0F2C2C]" />
            </div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70 block">
              Nossa Missão
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0F2C2C]">
              Publicar aquilo que vale a pena ser lido.
            </h3>
            <p className="text-sm text-[#2D2D2D]/80 leading-relaxed">
              A Átrios existe para dar voz a autores e mensagens que podem contribuir para a construção de pessoas mais conscientes, maduras e preparadas para viver seu propósito.
            </p>
          </div>

          {/* Visão Card */}
          <div className="bg-white p-8 rounded-sm border border-[#0F2C2C15] shadow-xs space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-sm bg-[#F5F1EB] flex items-center justify-center text-[#0F2C2C]">
              <Eye className="w-6 h-6 text-[#0F2C2C]" />
            </div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70 block">
              Nossa Visão
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0F2C2C]">
              Ser a referência nacional em literatura com propósito.
            </h3>
            <p className="text-sm text-[#2D2D2D]/80 leading-relaxed">
              Consolidar-se como a principal casa publicadora para mentes inquietas, líderes formadores de opinião e famílias que buscam obras de excelência duradoura no Brasil e no mundo.
            </p>
          </div>

        </div>

        {/* 6 Core Editorial Values */}
        <div className="space-y-6 pt-6">
          <h3 className="font-serif text-2xl font-bold text-[#0F2C2C] text-center">
            Valores que Regem Nossas Decisões
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EDITORIAL_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-sm border border-[#0F2C2C15] shadow-xs hover:border-[#0F2C2C]/40 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-sm bg-[#0F2C2C] flex items-center justify-center">
                  {iconMap[val.icon] || <ShieldCheck className="w-5 h-5 text-[#D9D1C5]" />}
                </div>
                <h4 className="font-serif font-bold text-lg text-[#0F2C2C]">
                  {val.title}
                </h4>
                <p className="text-xs text-[#2D2D2D]/75 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. Editorial Milestones Timeline */}
      <section className="bg-[#F5F1EB] p-8 sm:p-14 rounded-sm border border-[#0F2C2C15] space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70">
            Nossa Jornada
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C2C]">
            Passos da Construção de um Legado
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-sm border border-[#0F2C2C15] relative flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-1 rounded-sm bg-[#0F2C2C] text-[#D9D1C5] text-xs font-bold font-mono">
                  {m.year}
                </span>
                <h4 className="font-serif font-bold text-base text-[#0F2C2C] pt-1">
                  {m.title}
                </h4>
                <p className="text-xs text-[#2D2D2D]/75 leading-relaxed">
                  {m.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#0F2C2C15] flex items-center gap-1.5 text-[11px] text-[#0F2C2C] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Compromisso Átrios</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 5. Direct CTA to Authors or Catalog */}
      <section className="bg-[#0F2C2C] text-[#FDFBF7] p-8 sm:p-12 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-md">
        <div className="space-y-2 max-w-xl">
          <h3 className="font-serif text-2xl font-bold">
            Quer fazer parte dessa história como leitor ou autor?
          </h3>
          <p className="text-xs sm:text-sm text-[#FDFBF7]/85">
            Conheça os títulos que já impactaram milhares de pessoas ou submeta seu original ao nosso conselho editorial.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/catalogo"
            className="px-5 py-3 bg-[#D9D1C5] hover:bg-[#E8E2D9] text-[#0F2C2C] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors"
          >
            Explorar Catálogo
          </Link>
          <Link
            href="/contato"
            className="px-5 py-3 bg-transparent border border-[#FDFBF7]/40 hover:bg-white/10 text-[#FDFBF7] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors"
          >
            Submeter Original
          </Link>
        </div>
      </section>

    </div>
  );
}
