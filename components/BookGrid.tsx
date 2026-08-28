import React from 'react';
import type { Book } from '@/lib/types';
import { BookCard } from './BookCard';
import { BookOpen } from 'lucide-react';

/**
 * Grade de resultados do catálogo. Server-safe de propósito: é usada tanto pelo
 * `CatalogBrowser` (client, resultados filtrados) quanto como fallback do Suspense
 * em /catalogo — e é o fallback que vai para o HTML estático.
 */
export const BookGrid: React.FC<{ books: Book[]; onClear?: React.ReactNode }> = ({
  books,
  onClear,
}) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-sm border border-[#0F2C2C15] p-8 space-y-4">
        <BookOpen className="w-12 h-12 text-[#0F2C2C] mx-auto opacity-70" />
        <h2 className="font-serif text-xl font-bold text-[#0F2C2C]">
          Nenhum livro encontrado com os critérios selecionados
        </h2>
        <p className="text-xs text-[#2D2D2D]/70 max-w-md mx-auto">
          Experimente buscar por outros termos ou limpar os filtros de categoria para visualizar o
          catálogo completo.
        </p>
        {onClear}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
