import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { Menu, X, Search, BookOpen, Send, ChevronRight } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'catalog', label: 'Catálogo' },
    { id: 'about', label: 'Sobre a Átrios' },
    { id: 'authors', label: 'Autores' },
    { id: 'contact', label: 'Contato & Originais' }
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner / Micro Notification */}
      <div className="bg-[#0F2C2C] text-[#FDFBF7] text-xs py-1.5 px-4 text-center font-sans tracking-wide border-b border-[#0F2C2C]/20 flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D9D1C5] animate-pulse"></span>
        <span>Conheça os lançamentos de 2024: <em className="italic">Mensagens que merecem ser lidas, vividas e compartilhadas.</em></span>
      </div>

      {/* Main Header */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#0F2C2C15] py-3'
            : 'bg-white border-b border-[#0F2C2C15] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleLinkClick('home')}
            className="text-left focus:outline-none focus:ring-2 focus:ring-[#0F2C2C]/20 rounded-sm p-1 -m-1 transition-opacity hover:opacity-90 cursor-pointer"
            aria-label="Átrios Editora - Página Inicial"
          >
            <Logo variant="horizontal" theme="dark" size={isScrolled ? 'sm' : 'md'} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-sm font-medium transition-colors cursor-pointer py-1 ${
                    isActive
                      ? 'text-[#0F2C2C] border-b-2 border-[#0F2C2C] font-semibold'
                      : 'text-[#0F2C2C] opacity-60 hover:opacity-100 hover:text-[#0F2C2C]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search trigger */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-[#0F2C2C] opacity-70 hover:opacity-100 hover:bg-[#0F2C2C05] rounded-sm transition-colors cursor-pointer"
              title="Buscar livros e autores"
              aria-label="Buscar livros e autores"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Catalog link */}
            <button
              id="header-catalog-btn"
              onClick={() => handleLinkClick('catalog')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0F2C2C] border border-[#0F2C2C30] hover:bg-[#0F2C2C05] rounded-sm transition-all duration-200 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#0F2C2C]" />
              <span>Catálogo</span>
            </button>

            {/* Submit manuscript CTA */}
            <button
              id="header-submit-original-btn"
              onClick={() => handleLinkClick('contact')}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0F2C2C] hover:bg-[#1a4040] rounded-sm shadow-sm transition-all duration-200 cursor-pointer group"
            >
              <Send className="w-3.5 h-3.5 text-[#D9D1C5] transition-transform group-hover:translate-x-0.5" />
              <span>Contato & Originais</span>
            </button>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              id="mobile-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-[#0F2C2C] opacity-70 hover:opacity-100 rounded-sm"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0F2C2C] hover:bg-[#0F2C2C05] rounded-sm transition-colors"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden border-t border-[#0F2C2C15] bg-[#FDFBF7] px-4 pt-3 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleLinkClick(item.id)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-sm text-base font-medium transition-colors text-left ${
                      isActive
                        ? 'text-[#0F2C2C] font-bold bg-[#E8E2D9]/40 border-l-4 border-[#0F2C2C]'
                        : 'text-[#2D2D2D] opacity-70 hover:opacity-100 hover:bg-[#F5F1EB]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#0F2C2C]/50" />
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-[#0F2C2C15] space-y-2.5">
              <button
                id="mobile-nav-original-cta"
                onClick={() => handleLinkClick('contact')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0F2C2C] text-white rounded-sm font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                <Send className="w-4 h-4 text-[#D9D1C5]" />
                <span>Submeter Manuscrito para Avaliação</span>
              </button>
              <button
                id="mobile-nav-catalog-cta"
                onClick={() => handleLinkClick('catalog')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[#0F2C2C30] text-[#0F2C2C] rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-[#0F2C2C05]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Catálogo</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
