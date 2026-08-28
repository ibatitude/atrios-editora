'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BOOKS, CATEGORIES, CATEGORY_LABELS, isBookCategory } from '@/lib/data';
import { BookGrid } from './BookGrid';
import { Search } from 'lucide-react';

type SortBy = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'title';

export const CatalogBrowser: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // A categoria vive na URL (?categoria=), então o filtro é compartilhável e
  // sobrevive ao botão voltar. Busca, formato e ordenação são efêmeros.
  // Valor fora da lista conhecida é tratado como "todos", não como filtro vazio.
  const rawCategory = searchParams.get('categoria') ?? '';
  const selectedCategory = isBookCategory(rawCategory) ? rawCategory : 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('relevance');
  const [selectedFormat, setSelectedFormat] = useState('all');

  const selectCategory = (value: string) => {
    const url = value === 'all' ? '/catalogo' : `/catalogo?categoria=${encodeURIComponent(value)}`;
    router.replace(url, { scroll: false });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedFormat('all');
    selectCategory('all');
  };

  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      if (selectedCategory !== 'all' && book.category !== selectedCategory) return false;
      if (selectedFormat !== 'all' && book.format !== selectedFormat) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.synopsis.toLowerCase().includes(q) ||
          book.category.toLowerCase().includes(q)
        );
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
    });
  }, [selectedCategory, selectedFormat, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'all' || searchQuery !== '' || selectedFormat !== 'all';

  return (
    <>
      <div className="space-y-6">
        {/* Category Pills Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#0F2C2C15] pb-4">
          {[{ value: 'all', label: 'Todos os Livros' }, ...CATEGORIES.map((c) => ({ value: c, label: CATEGORY_LABELS[c] }))].map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                id={`cat-filter-btn-${cat.value}`}
                onClick={() => selectCategory(cat.value)}
                aria-pressed={isSelected}
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F2C2C] text-[#FDFBF7] shadow-xs'
                    : 'bg-[#F5F1EB] text-[#0F2C2C] hover:bg-[#E8E2D9]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter & Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white p-4 rounded-sm border border-[#0F2C2C15] shadow-xs">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#0F2C2C]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="catalog-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por título, autor, assunto..."
              aria-label="Pesquisar no catálogo"
              className="w-full pl-10 pr-4 py-2.5 bg-[#FDFBF7] border border-[#0F2C2C20] rounded-sm text-sm text-[#0F2C2C] placeholder-[#0F2C2C]/50 focus:outline-none focus:border-[#0F2C2C]"
            />
          </div>

          <div className="md:col-span-3">
            <select
              id="catalog-format-select"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              aria-label="Filtrar por formato"
              className="w-full py-2.5 px-3 bg-[#FDFBF7] border border-[#0F2C2C20] rounded-sm text-xs font-medium text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
            >
              <option value="all">Todos os Formatos</option>
              <option value="Brochura com Orelhas">Brochura com Orelhas</option>
              <option value="Capa Dura">Capa Dura</option>
              <option value="Edição Especial">Edição Especial</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              aria-label="Ordenar resultados"
              className="w-full py-2.5 px-3 bg-[#FDFBF7] border border-[#0F2C2C20] rounded-sm text-xs font-medium text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
            >
              <option value="relevance">Ordenar: Destaques &amp; Relevância</option>
              <option value="price-asc">Preço: Menor para Maior</option>
              <option value="price-desc">Preço: Maior para Menor</option>
              <option value="rating">Melhor Avaliados</option>
              <option value="title">Título: A - Z</option>
            </select>
          </div>
        </div>

        {/* Results Counter & Active Filters Display */}
        <div className="flex items-center justify-between text-xs text-[#0F2C2C]/70 px-1">
          <span>
            Exibindo <strong>{filteredBooks.length}</strong>{' '}
            {filteredBooks.length === 1 ? 'título' : 'títulos'}
            {selectedCategory !== 'all' && ` na categoria "${CATEGORY_LABELS[selectedCategory]}"`}
          </span>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-[#0F2C2C] hover:underline font-bold cursor-pointer"
            >
              Limpar todos os filtros
            </button>
          )}
        </div>
      </div>

      <BookGrid
        books={filteredBooks}
        onClear={
          <button
            onClick={clearFilters}
            className="px-5 py-2 bg-[#0F2C2C] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#1a4040] cursor-pointer"
          >
            Ver Todos os Livros
          </button>
        }
      />
    </>
  );
};
