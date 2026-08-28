import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';
import { BackToTop } from './BackToTop';
import { Mail, Phone, MapPin } from 'lucide-react';

const linkClass =
  'opacity-70 hover:opacity-100 hover:text-white transition-colors text-left';

/** Link de categoria: filtra o catálogo por querystring, mantendo o filtro compartilhável. */
function categoryHref(category: string): string {
  return `/catalogo?categoria=${encodeURIComponent(category)}`;
}

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-[#0F2C2C] text-[#FDFBF7] pt-16 pb-12 border-t border-[#0F2C2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section: Brand Manifesto & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Logo & Closing Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <Link
              id="footer-logo-btn"
              href="/"
              className="inline-block text-left transition-opacity hover:opacity-90"
              aria-label="Átrios Editora - Página Inicial"
            >
              <Logo variant="horizontal" theme="light" size="lg" />
            </Link>

            {/* Official Closing Quote */}
            <div className="bg-[#091b1b] border-l-2 border-[#D9D1C5] p-4.5 rounded-sm">
              <p className="font-serif italic text-base sm:text-lg leading-relaxed text-[#FDFBF7]">
                “Átrios. Uma editora comprometida com conteúdo relevante, autores com propósito e livros capazes de deixar marcas. Porque algumas palavras passam. Outras permanecem.”
              </p>
            </div>

            <p className="text-sm opacity-70 leading-relaxed max-w-lg">
              Publicando obras cristãs, liderança, família e desenvolvimento pessoal com excelência editorial e profundidade teológica e humana.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 bg-[#091b1b] p-6 sm:p-8 rounded-sm border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D9D1C5] font-semibold">Comunidade de Leitores</span>
              <h3 className="text-xl font-serif text-[#FDFBF7] mt-1 font-bold">
                Receba Reflexões e Primeiras Páginas
              </h3>
              <p className="text-sm opacity-70 mt-2 leading-relaxed">
                Inscreva-se gratuitamente para receber capítulos em primeira mão, artigos exclusivos de nossos autores e convites para lançamentos.
              </p>
            </div>

            <NewsletterForm />
          </div>
        </div>

        {/* Middle Section: Navigation & Categorias & Contato */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-sm">
          {/* Navegação Institucional */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#FDFBF7] text-base border-b border-white/10 pb-2">
              Institucional
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className={linkClass}>Página Inicial</Link></li>
              <li><Link href="/sobre" className={linkClass}>Conheça a Átrios</Link></li>
              <li><Link href="/autores" className={linkClass}>Nossos Autores</Link></li>
              <li><Link href="/contato" className={linkClass}>Submissão de Originais</Link></li>
              <li><Link href="/contato" className={linkClass}>Central de Atendimento</Link></li>
            </ul>
          </div>

          {/* Categorias Literárias */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#FDFBF7] text-base border-b border-white/10 pb-2">
              Catálogo
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={categoryHref('Fé')} className={linkClass}>Fé &amp; Espiritualidade</Link>
              </li>
              <li>
                <Link href={categoryHref('Liderança')} className={linkClass}>Liderança Servidora</Link>
              </li>
              <li>
                <Link href={categoryHref('Família')} className={linkClass}>Família &amp; Casamento</Link>
              </li>
              <li>
                <Link href={categoryHref('Desenvolvimento Pessoal')} className={linkClass}>Desenvolvimento Pessoal</Link>
              </li>
              <li>
                <Link
                  href="/catalogo"
                  className="text-[#D9D1C5] hover:underline transition-all text-left font-medium"
                >
                  Ver Todos os Títulos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Para Escritores */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#FDFBF7] text-base border-b border-white/10 pb-2">
              Para Autores
            </h4>
            <ul className="space-y-2">
              <li><Link href="/contato" className={linkClass}>Envie seu Manuscrito</Link></li>
              <li><Link href="/sobre" className={linkClass}>Critérios de Seleção</Link></li>
              <li><Link href="/autores" className={linkClass}>Nossa Parceria Editorial</Link></li>
              <li><Link href="/contato" className={linkClass}>Livrarias &amp; Distribuição</Link></li>
            </ul>
          </div>

          {/* Contato Direto */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#FDFBF7] text-base border-b border-white/10 pb-2">
              Sede Editorial
            </h4>
            <div className="space-y-2.5 text-xs opacity-75">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D9D1C5] flex-shrink-0 mt-0.5" />
                <span>Av. das Nações Literárias, 1420 — Sala 804<br />Belo Horizonte, MG • Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D9D1C5] flex-shrink-0" />
                <a
                  href="mailto:contato@atrioseditora.com.br"
                  className="hover:underline min-w-0 break-all"
                >
                  contato@atrioseditora.com.br
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D9D1C5] flex-shrink-0" />
                <span>(31) 3490-8200 / WhatsApp</span>
              </div>
              <div className="pt-1">
                <span className="inline-block px-2.5 py-1 bg-[#091b1b] text-[#D9D1C5] rounded-xs font-mono text-[11px] border border-white/10">
                  Seg à Sex: 09h às 18h
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-60">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Átrios Editora Ltda. CNPJ: 42.180.990/0001-35.</span>
            <span className="hidden sm:inline">•</span>
            <span>Todos os direitos reservados.</span>
          </div>

          <BackToTop />
        </div>

      </div>
    </footer>
  );
};
