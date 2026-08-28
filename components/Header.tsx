'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { SearchModal } from './SearchModal';
import { NAV_ITEMS, isActive } from '@/lib/nav';
import { Menu, X, Search, BookOpen, Send, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha o menu mobile a cada navegação concluída. Ajuste de estado durante o
  // render (padrão do React para "estado derivado de mudança de prop"): um efeito
  // aqui dispararia um render em cascata a cada troca de rota.
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setMobileMenuOpen(false);
  }

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
          <Link
            id="nav-logo-btn"
            href="/"
            className="text-left focus:outline-none focus:ring-2 focus:ring-[#0F2C2C]/20 rounded-sm p-1 -m-1 transition-opacity hover:opacity-90"
            aria-label="Átrios Editora - Página Inicial"
          >
            <Logo variant="horizontal" theme="dark" size={isScrolled ? 'sm' : 'md'} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors py-1 ${
                    active
                      ? 'text-[#0F2C2C] border-b-2 border-[#0F2C2C] font-semibold'
                      : 'text-[#0F2C2C] opacity-60 hover:opacity-100 hover:text-[#0F2C2C]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              id="header-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#0F2C2C] opacity-70 hover:opacity-100 hover:bg-[#0F2C2C05] rounded-sm transition-colors cursor-pointer"
              title="Buscar livros e autores"
              aria-label="Buscar livros e autores"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              id="header-catalog-btn"
              href="/catalogo"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0F2C2C] border border-[#0F2C2C30] hover:bg-[#0F2C2C05] rounded-sm transition-all duration-200"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#0F2C2C]" />
              <span>Catálogo</span>
            </Link>

            <Link
              id="header-submit-original-btn"
              href="/contato"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0F2C2C] hover:bg-[#1a4040] rounded-sm shadow-sm transition-all duration-200 group"
            >
              <Send className="w-3.5 h-3.5 text-[#D9D1C5] transition-transform group-hover:translate-x-0.5" />
              <span>Contato &amp; Originais</span>
            </Link>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              id="mobile-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#0F2C2C] opacity-70 hover:opacity-100 rounded-sm cursor-pointer"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0F2C2C] hover:bg-[#0F2C2C05] rounded-sm transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
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
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-sm text-base font-medium transition-colors text-left ${
                      active
                        ? 'text-[#0F2C2C] font-bold bg-[#E8E2D9]/40 border-l-4 border-[#0F2C2C]'
                        : 'text-[#2D2D2D] opacity-70 hover:opacity-100 hover:bg-[#F5F1EB]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#0F2C2C]/50" />
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-[#0F2C2C15] space-y-2.5">
              <Link
                id="mobile-nav-original-cta"
                href="/contato"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0F2C2C] text-white rounded-sm font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                <Send className="w-4 h-4 text-[#D9D1C5]" />
                <span>Submeter Manuscrito para Avaliação</span>
              </Link>
              <Link
                id="mobile-nav-catalog-cta"
                href="/catalogo"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[#0F2C2C30] text-[#0F2C2C] rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-[#0F2C2C05]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Catálogo</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </>
  );
};
