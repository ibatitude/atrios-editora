import React from 'react';
import Link from 'next/link';
import { Book } from '@/lib/types';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const categoryColors: Record<string, string> = {
    'Fé': 'bg-[#0F2C2C]/10 text-[#0F2C2C] border-[#0F2C2C]/20',
    'Liderança': 'bg-[#D9D1C5]/40 text-[#0F2C2C] border-[#D9D1C5]',
    'Família': 'bg-[#E8E2D9] text-[#0F2C2C] border-[#D9D1C5]',
    'Desenvolvimento Pessoal': 'bg-[#F5F1EB] text-[#0F2C2C] border-[#E8E2D9]'
  };

  const href = `/livros/${book.id}`;

  return (
    <div
      id={`book-card-${book.id}`}
      className="group bg-white rounded-sm border border-[#0F2C2C15] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-[#0F2C2C]/30 hover:-translate-y-0.5"
    >
      {/* Cover and badges */}
      <div className="relative bg-[#F5F1EB] p-6 flex items-center justify-center overflow-hidden min-h-[280px]">
        {/* Category & Status badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-20 pointer-events-none">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm border ${
              categoryColors[book.category] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {book.category}
          </span>
          {book.bestseller && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#D9D1C5] text-[#0F2C2C] shadow-xs">
              Bestseller
            </span>
          )}
          {book.newRelease && !book.bestseller && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#0F2C2C] text-white shadow-xs">
              Lançamento
            </span>
          )}
        </div>

        {/* 3D-styled Book Cover visual presentation */}
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          <div className="w-[145px] sm:w-[160px] h-[220px] sm:h-[235px] rounded-r-sm rounded-l-xs overflow-hidden relative shadow-md book-shadow book-spine-effect border-r border-t border-b border-black/20">
            <img
              src={book.coverImage}
              alt={`Capa do livro ${book.title}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Overlay title text on cover simulation */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3 text-white">
              <span className="text-[9px] uppercase font-sans tracking-[0.2em] text-[#D9D1C5] font-semibold">
                ÁTRIOS
              </span>
              <h4 className="font-serif font-bold text-xs sm:text-sm leading-tight text-white drop-shadow-md line-clamp-2">
                {book.title}
              </h4>
              <p className="text-[10px] text-white/80 font-sans mt-0.5 truncate">
                {book.author}
              </p>
            </div>
          </div>
        </Link>

        {/* Subtle background element */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#0F2C2C]/5 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Book details & info */}
      <div className="p-5 flex-grow flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5 text-xs text-[#0F2C2C]/60">
            <div className="flex items-center text-[#0F2C2C]">
              <Star className="w-3.5 h-3.5 fill-[#0F2C2C] text-[#0F2C2C]" />
              <span className="ml-1 font-bold text-[#0F2C2C] text-xs">{book.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{book.reviewCount} avaliações</span>
            <span>•</span>
            <span>{book.pages} págs</span>
          </div>

          <h3 className="font-serif font-bold text-lg text-[#0F2C2C] leading-snug line-clamp-1">
            <Link href={href} className="hover:opacity-75 transition-opacity">
              {book.title}
            </Link>
          </h3>

          <p className="text-xs text-[#0F2C2C]/70 mt-0.5 mb-2.5">
            Por{' '}
            <Link
              href={`/autores/${book.authorId}`}
              className="text-[#0F2C2C] font-semibold hover:underline"
            >
              {book.author}
            </Link>
          </p>

          <p className="text-xs text-[#2D2D2D]/80 leading-relaxed line-clamp-2 mb-4 font-sans">
            {book.synopsis}
          </p>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-3 border-t border-[#0F2C2C15] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-base text-[#0F2C2C]">
                R$ {book.price.toFixed(2).replace('.', ',')}
              </span>
              {book.originalPrice && (
                <span className="text-[11px] text-[#0F2C2C]/40 line-through">
                  R$ {book.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#0F2C2C]/70 font-medium block">Em até 3x sem juros</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href={href}
              id={`book-details-btn-${book.id}`}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0F2C2C] bg-[#F5F1EB] hover:bg-[#E8E2D9] rounded-sm transition-colors flex items-center gap-1"
              title="Ver sinopse e detalhes"
            >
              <span>Detalhes</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <Link
              href={href}
              id={`book-buy-btn-${book.id}`}
              className="p-2 text-white bg-[#0F2C2C] hover:bg-[#1a4040] rounded-sm transition-colors"
              title="Adquirir exemplar"
              aria-label={`Adquirir ${book.title}`}
            >
              <ShoppingBag className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
