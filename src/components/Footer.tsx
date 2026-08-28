import React, { useState } from 'react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onFilterCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onFilterCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: string) => {
    if (onFilterCategory) {
      onFilterCategory(cat);
    }
    onNavigate('catalog');
    scrollToTop();
  };

  return (
    <footer id="main-footer" className="bg-[#0F2C2C] text-[#FDFBF7] pt-16 pb-12 border-t border-[#0F2C2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Brand Manifesto & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Logo & Closing Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <button
              id="footer-logo-btn"
              onClick={() => { onNavigate('home'); scrollToTop(); }}
              className="text-left cursor-pointer transition-opacity hover:opacity-90"
            >
              <Logo variant="horizontal" theme="light" size="lg" />
            </button>

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

            <form onSubmit={handleNewsletterSubmit} className="mt-6">
              {newsletterSubscribed ? (
                <div className="flex items-center gap-2 p-3 bg-[#133838] text-[#9ee3c4] rounded-sm text-sm border border-[#1f5252]">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Gratidão! Você receberá nossos próximos conteúdos com propósito.</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-grow">
                    <Mail className="w-4 h-4 opacity-50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      id="newsletter-email-input"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Seu melhor e-mail..."
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-[#051111] border border-white/15 rounded-sm text-sm text-[#FDFBF7] placeholder-white/40 focus:outline-none focus:border-[#D9D1C5] focus:ring-1 focus:ring-[#D9D1C5]"
                    />
                  </div>
                  <button
                    type="submit"
                    id="newsletter-submit-btn"
                    className="px-5 py-2.5 bg-[#D9D1C5] hover:bg-[#E8E2D9] text-[#0F2C2C] font-bold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Inscrever</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </form>
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
              <li>
                <button
                  onClick={() => { onNavigate('home'); scrollToTop(); }}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); scrollToTop(); }}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Conheça a Átrios
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('authors'); scrollToTop(); }}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Nossos Autores
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('contact'); scrollToTop(); }}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Submissão de Originais
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('contact'); scrollToTop(); }}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Central de Atendimento
                </button>
              </li>
            </ul>
          </div>

          {/* Categorias Literárias */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#FDFBF7] text-base border-b border-white/10 pb-2">
              Catálogo
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryClick('Fé')}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Fé & Espiritualidade
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Liderança')}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Liderança Servidora
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Família')}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Família & Casamento
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Desenvolvimento Pessoal')}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Desenvolvimento Pessoal
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('catalog'); scrollToTop(); }}
                  className="text-[#D9D1C5] hover:underline transition-all cursor-pointer text-left font-medium"
                >
                  Ver Todos os Títulos →
                </button>
              </li>
            </ul>
          </div>

          {/* Para Escritores */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#FDFBF7] text-base border-b border-white/10 pb-2">
              Para Autores
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { onNavigate('contact'); scrollToTop(); }}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Envie seu Manuscrito
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); scrollToTop(); }}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Critérios de Seleção
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('authors'); scrollToTop(); }}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Nossa Parceria Editorial
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('contact'); scrollToTop(); }}
                  className="opacity-70 hover:opacity-100 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Livrarias & Distribuição
                </button>
              </li>
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
                <a href="mailto:contato@atrioseditora.com.br" className="hover:underline">
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

          <button
            onClick={scrollToTop}
            id="footer-back-to-top-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#091b1b] hover:bg-[#133838] text-[#D9D1C5] transition-colors cursor-pointer border border-white/10"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
