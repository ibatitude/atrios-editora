import React, { useState, useMemo } from 'react';
import { Book, BookCategory } from '../types';
import { BookCard } from '../components/BookCard';
import { Search, Filter, SlidersHorizontal, BookOpen, Sparkles, Check } from 'lucide-react';

interface CatalogPageProps {
  books: Book[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenBookModal: (book: Book) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  books,
  selectedCategory,
  onSelectCategory,
  onOpenBookModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'title'>('relevance');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const categories: { label: string; value: string }[] = [
    { label: 'Todos os Livros', value: 'all' },
    { label: 'Fé & Espiritualidade', value: 'Fé' },
    { label: 'Liderança Servidora', value: 'Liderança' },
    { label: 'Família & Lar', value: 'Família' },
    { label: 'Desenvolvimento Pessoal', value: 'Desenvolvimento Pessoal' }
  ];

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Category filter
        if (selectedCategory !== 'all' && book.category !== selectedCategory) {
          return false;
        }
        // Format filter
        if (selectedFormat !== 'all' && book.format !== selectedFormat) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = book.title.toLowerCase().includes(q);
          const matchAuthor = book.author.toLowerCase().includes(q);
          const matchSynopsis = book.synopsis.toLowerCase().includes(q);
          const matchCategory = book.category.toLowerCase().includes(q);
          if (!matchTitle && !matchAuthor && !matchSynopsis && !matchCategory) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
      });
  }, [books, selectedCategory, selectedFormat, searchQuery, sortBy]);

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

      {/* Control Bar: Categories Filter & Search & Sort */}
      <div className="space-y-6">
        
        {/* Category Pills Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#0F2C2C15] pb-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                id={`cat-filter-btn-${cat.value}`}
                onClick={() => onSelectCategory(cat.value)}
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
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#0F2C2C]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="catalog-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por título, autor, assunto..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FDFBF7] border border-[#0F2C2C20] rounded-sm text-sm text-[#0F2C2C] placeholder-[#0F2C2C]/50 focus:outline-none focus:border-[#0F2C2C]"
            />
          </div>

          {/* Format selector */}
          <div className="md:col-span-3">
            <select
              id="catalog-format-select"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full py-2.5 px-3 bg-[#FDFBF7] border border-[#0F2C2C20] rounded-sm text-xs font-medium text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
            >
              <option value="all">Todos os Formatos</option>
              <option value="Brochura com Orelhas">Brochura com Orelhas</option>
              <option value="Capa Dura">Capa Dura</option>
              <option value="Edição Especial">Edição Especial</option>
            </select>
          </div>

          {/* Sort selector */}
          <div className="md:col-span-3">
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 bg-[#FDFBF7] border border-[#0F2C2C20] rounded-sm text-xs font-medium text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
            >
              <option value="relevance">Ordenar: Destaques & Relevância</option>
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
            Exibindo <strong>{filteredBooks.length}</strong> {filteredBooks.length === 1 ? 'título' : 'títulos'}
            {selectedCategory !== 'all' && ` na categoria "${selectedCategory}"`}
          </span>

          {(selectedCategory !== 'all' || searchQuery || selectedFormat !== 'all') && (
            <button
              onClick={() => {
                onSelectCategory('all');
                setSearchQuery('');
                setSelectedFormat('all');
              }}
              className="text-[#0F2C2C] hover:underline font-bold cursor-pointer"
            >
              Limpar todos os filtros
            </button>
          )}
        </div>

      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-sm border border-[#0F2C2C15] p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-[#0F2C2C] mx-auto opacity-70" />
          <h3 className="font-serif text-xl font-bold text-[#0F2C2C]">
            Nenhum livro encontrado com os critérios selecionados
          </h3>
          <p className="text-xs text-[#2D2D2D]/70 max-w-md mx-auto">
            Experimente buscar por outros termos ou limpar os filtros de categoria para visualizar o catálogo completo.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setSearchQuery('');
              setSelectedFormat('all');
            }}
            className="px-5 py-2 bg-[#0F2C2C] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#1a4040]"
          >
            Ver Todos os Livros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onOpenDetails={onOpenBookModal}
              onQuickBuy={onOpenBookModal}
            />
          ))}
        </div>
      )}

      {/* Editorial Quality Guarantee Banner */}
      <div className="bg-[#F5F1EB] rounded-sm p-6 sm:p-8 border border-[#0F2C2C15] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-lg text-[#0F2C2C]">
            Precisa de compras em grande quantidade para sua igreja, empresa ou instituição?
          </h3>
          <p className="text-xs text-[#2D2D2D]/70">
            Oferecemos condições editoriais diretas para ministérios, treinamentos corporativos e livrarias parceiras.
          </p>
        </div>

        <button
          onClick={() => {
            const contactTab = document.getElementById('main-header');
            if (contactTab) contactTab.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-5 py-2.5 bg-[#0F2C2C] hover:bg-[#1a4040] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex-shrink-0 transition-colors"
        >
          Consultar Condições Especiais
        </button>
      </div>

    </div>
  );
};
