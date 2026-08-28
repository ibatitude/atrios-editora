import React, { useState, useEffect, useRef } from 'react';
import { Book, Author } from '../types';
import { Search, X, BookOpen, User, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  authors: Author[];
  onSelectBook: (book: Book) => void;
  onSelectAuthor: (author: Author) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  books,
  authors,
  onSelectBook,
  onSelectAuthor
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredBooks = normalizedQuery
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(normalizedQuery) ||
          b.author.toLowerCase().includes(normalizedQuery) ||
          b.category.toLowerCase().includes(normalizedQuery) ||
          b.synopsis.toLowerCase().includes(normalizedQuery)
      )
    : books.slice(0, 4);

  const filteredAuthors = normalizedQuery
    ? authors.filter(
        (a) =>
          a.name.toLowerCase().includes(normalizedQuery) ||
          a.role.toLowerCase().includes(normalizedQuery) ||
          a.specialties.some((s) => s.toLowerCase().includes(normalizedQuery))
      )
    : authors.slice(0, 2);

  return (
    <div
      id="search-modal-overlay"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        className="bg-[#FDFBF7] text-[#0F2C2C] rounded-sm max-w-2xl w-full overflow-hidden shadow-2xl border border-[#0F2C2C15] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-[#0F2C2C15] flex items-center gap-3 bg-[#FDFBF7]">
          <Search className="w-5 h-5 text-[#0F2C2C]/50 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-input-field"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por livro, autor, tema (Fé, Liderança, Família)..."
            className="w-full bg-transparent border-none text-base text-[#0F2C2C] placeholder-[#0F2C2C]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#0F2C2C]/60 hover:text-[#0F2C2C] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0F2C2C]/70 bg-[#E8E2D9] hover:bg-[#D9D1C5] rounded-sm transition-colors cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Books List */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0F2C2C]/60 mb-2 px-1">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#0F2C2C]" />
                Livros ({filteredBooks.length})
              </span>
              {query && <span className="text-[11px] font-normal lowercase">resultados para "{query}"</span>}
            </div>

            {filteredBooks.length === 0 ? (
              <p className="text-xs text-[#0F2C2C]/60 italic p-3 text-center bg-[#F5F1EB] rounded-sm">
                Nenhum livro encontrado com esse termo.
              </p>
            ) : (
              <div className="space-y-1.5">
                {filteredBooks.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      onClose();
                      onSelectBook(b);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-sm bg-[#F5F1EB] hover:bg-[#E8E2D9] border border-[#0F2C2C15] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={b.coverImage}
                        alt={b.title}
                        className="w-9 h-12 object-cover rounded-xs shadow-xs flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-sm text-[#0F2C2C] group-hover:opacity-80">
                            {b.title}
                          </h4>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-[#E8E2D9] text-[#0F2C2C] rounded-xs">
                            {b.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#0F2C2C]/60">Por {b.author}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-xs text-[#0F2C2C]">
                        R$ {b.price.toFixed(2).replace('.', ',')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#0F2C2C]/50 group-hover:text-[#0F2C2C] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Authors List */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0F2C2C]/60 mb-2 px-1">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0F2C2C]" />
                Autores ({filteredAuthors.length})
              </span>
            </div>

            {filteredAuthors.length === 0 ? (
              <p className="text-xs text-[#0F2C2C]/60 italic p-3 text-center bg-[#F5F1EB] rounded-sm">
                Nenhum autor encontrado.
              </p>
            ) : (
              <div className="space-y-1.5">
                {filteredAuthors.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      onClose();
                      onSelectAuthor(a);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-sm bg-[#F5F1EB] hover:bg-[#E8E2D9] border border-[#0F2C2C15] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={a.photo}
                        alt={a.name}
                        className="w-10 h-10 object-cover rounded-full border border-[#0F2C2C] flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#0F2C2C] group-hover:opacity-80">
                          {a.name}
                        </h4>
                        <p className="text-xs text-[#0F2C2C]/60 line-clamp-1">{a.role}</p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#0F2C2C]/50 group-hover:text-[#0F2C2C] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#F5F1EB] border-t border-[#0F2C2C15] text-[11px] text-[#0F2C2C]/60 flex items-center justify-between">
          <span>Pressione qualquer item para abrir a visualização detalhada</span>
          <span className="font-bold text-[#0F2C2C]">Átrios Editora</span>
        </div>
      </div>
    </div>
  );
};
