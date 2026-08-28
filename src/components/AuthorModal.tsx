import React from 'react';
import { Author, Book } from '../types';
import { X, BookOpen, MapPin, Award, Quote, ChevronRight } from 'lucide-react';

interface AuthorModalProps {
  author: Author | null;
  books: Book[];
  onClose: () => void;
  onSelectBook: (book: Book) => void;
}

export const AuthorModal: React.FC<AuthorModalProps> = ({
  author,
  books,
  onClose,
  onSelectBook
}) => {
  if (!author) return null;

  const authorBooks = books.filter((b) => b.authorId === author.id);

  return (
    <div
      id="author-details-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="author-details-modal-container"
        className="bg-[#FDFBF7] text-[#0F2C2C] rounded-sm max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#0F2C2C15] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#0F2C2C15] flex items-center justify-between bg-[#F5F1EB]">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]">
            Perfil do Autor Parceiro Átrios
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-[#0F2C2C]/70 hover:text-[#0F2C2C] hover:bg-[#E8E2D9] rounded-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-grow">
          {/* Author Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <img
              src={author.photo}
              alt={author.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#0F2C2C] shadow-md flex-shrink-0"
            />
            <div className="space-y-1.5">
              <h2 className="font-serif text-2xl font-bold text-[#0F2C2C]">
                {author.name}
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-[#0F2C2C]/80">
                {author.role}
              </p>
              <p className="text-xs text-[#0F2C2C]/60 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{author.location}</span>
                <span>•</span>
                <span>{author.booksCount} {author.booksCount > 1 ? 'obras publicadas' : 'obra publicada'}</span>
              </p>

              {/* Specialties badges */}
              <div className="flex flex-wrap gap-1.5 pt-2 justify-center sm:justify-start">
                {author.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-sm bg-[#E8E2D9] text-[#0F2C2C] font-semibold"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Author Quote */}
          <div className="bg-[#0F2C2C] text-[#FDFBF7] p-4 rounded-sm flex items-start gap-3 shadow-sm">
            <Quote className="w-5 h-5 text-[#D9D1C5] flex-shrink-0 mt-0.5" />
            <p className="font-serif italic text-sm text-[#FDFBF7]/90 leading-relaxed">
              {author.quote}
            </p>
          </div>

          {/* Biography */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#0F2C2C] border-b border-[#0F2C2C15] pb-1.5">
              Sobre o Autor
            </h3>
            <p className="text-sm text-[#2D2D2D]/85 leading-relaxed">
              {author.bio}
            </p>
          </div>

          {/* Published Books by this Author */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#0F2C2C] border-b border-[#0F2C2C15] pb-1.5 flex items-center justify-between">
              <span>Obras na Átrios Editora</span>
              <span className="text-xs font-sans font-normal text-[#0F2C2C]/60">{authorBooks.length} títulos</span>
            </h3>

            <div className="space-y-2.5">
              {authorBooks.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    onClose();
                    onSelectBook(b);
                  }}
                  className="flex items-center justify-between p-3 rounded-sm bg-[#F5F1EB] hover:bg-[#E8E2D9] border border-[#0F2C2C15] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className="w-10 h-14 object-cover rounded-xs shadow-xs"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#0F2C2C] group-hover:opacity-80">
                        {b.title}
                      </h4>
                      <p className="text-xs text-[#0F2C2C]/70 line-clamp-1">{b.synopsis}</p>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-[#0F2C2C]/50 group-hover:text-[#0F2C2C] group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#0F2C2C15] bg-[#F5F1EB] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0F2C2C] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
