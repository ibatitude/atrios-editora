import React, { useState } from 'react';
import { Book } from '../types';
import { X, Star, BookOpen, Check, ShoppingBag, Truck, ShieldCheck, Heart, Share2, Copy } from 'lucide-react';

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
  onSelectAuthor?: (authorId: string) => void;
  onShowToast?: (msg: string) => void;
}

export const BookModal: React.FC<BookModalProps> = ({
  book,
  onClose,
  onSelectAuthor,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'sinopse' | 'amostra' | 'ficha'>('sinopse');
  const [purchaseStep, setPurchaseStep] = useState<'idle' | 'success'>('idle');

  if (!book) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    if (onShowToast) onShowToast('Link do livro copiado para a área de transferência!');
  };

  const handleBuy = () => {
    setPurchaseStep('success');
    if (onShowToast) onShowToast(`Exemplar de "${book.title}" selecionado para compra!`);
  };

  return (
    <div
      id="book-details-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="book-details-modal-container"
        className="bg-[#FDFBF7] text-[#0F2C2C] rounded-sm max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#0F2C2C15] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#0F2C2C15] flex items-center justify-between bg-[#F5F1EB]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-sm bg-[#0F2C2C] text-[#FDFBF7]">
              {book.category}
            </span>
            <span className="text-xs text-[#0F2C2C]/60">ISBN {book.isbn}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-[#0F2C2C]/70 hover:text-[#0F2C2C] hover:bg-[#E8E2D9] rounded-sm transition-colors cursor-pointer"
              title="Compartilhar livro"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              id="close-book-modal-btn"
              className="p-1.5 text-[#0F2C2C]/70 hover:text-[#0F2C2C] hover:bg-[#E8E2D9] rounded-sm transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-grow">
          {/* Top Hero with Cover & Main Specs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Book Visual 3D */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-[180px] h-[260px] rounded-r-xs rounded-l-none overflow-hidden relative shadow-xl book-shadow book-spine-effect border border-black/20">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C2C]/90 via-[#0F2C2C]/30 to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] uppercase font-sans tracking-widest text-[#D9D1C5] font-bold">
                    ÁTRIOS
                  </span>
                  <h4 className="font-serif font-bold text-sm leading-tight text-white">
                    {book.title}
                  </h4>
                  <p className="text-[10px] text-[#E8E2D9]">{book.author}</p>
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="text-[11px] text-[#0F2C2C]/70 font-medium block">
                  Formato: {book.format}
                </span>
                <span className="text-[11px] text-[#0F2C2C]/70">
                  {book.pages} páginas • {book.dimensions}
                </span>
              </div>
            </div>

            {/* Book Header Information */}
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-1 text-sm text-[#0F2C2C]">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#0F2C2C]" />
                  ))}
                </div>
                <span className="font-bold text-[#0F2C2C] ml-1">{book.rating.toFixed(1)}</span>
                <span className="text-xs text-[#0F2C2C]/60">({book.reviewCount} avaliações editoriais e de leitores)</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2C2C] leading-tight">
                {book.title}
              </h2>

              {book.subtitle && (
                <p className="text-sm sm:text-base text-[#2D2D2D]/75 font-serif italic">
                  {book.subtitle}
                </p>
              )}

              <div className="pt-1 pb-2">
                <span className="text-xs text-[#0F2C2C]/60">Autor: </span>
                <button
                  onClick={() => {
                    onClose();
                    if (onSelectAuthor) onSelectAuthor(book.authorId);
                  }}
                  className="text-sm font-bold text-[#0F2C2C] hover:opacity-75 hover:underline cursor-pointer transition-opacity"
                >
                  {book.author}
                </button>
              </div>

              {/* Pricing banner */}
              <div className="bg-[#F5F1EB] p-4 rounded-sm border border-[#0F2C2C15] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-[#0F2C2C]">
                      R$ {book.price.toFixed(2).replace('.', ',')}
                    </span>
                    {book.originalPrice && (
                      <span className="text-sm text-[#0F2C2C]/40 line-through font-serif">
                        R$ {book.originalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#0F2C2C] font-semibold flex items-center gap-1 mt-0.5">
                    <Truck className="w-3.5 h-3.5" /> Frete com desconto especial para todo o Brasil
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBuy}
                    id="modal-direct-buy-btn"
                    className="px-5 py-2.5 bg-[#0F2C2C] hover:opacity-90 text-[#FDFBF7] font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D9D1C5]" />
                    <span>Adquirir Exemplar</span>
                  </button>
                </div>
              </div>

              {purchaseStep === 'success' && (
                <div className="p-3 bg-[#E8E2D9] border border-[#0F2C2C15] text-[#0F2C2C] rounded-sm text-xs flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>Pedido simulado com sucesso! Redirecionando para plataforma de distribuição oficial da Átrios.</span>
                </div>
              )}
            </div>
          </div>

          {/* Inspirational Quote Card */}
          <div className="bg-[#0F2C2C] text-[#FDFBF7] p-4 sm:p-5 rounded-sm relative overflow-hidden shadow-sm">
            <div className="relative z-10 flex items-start gap-3">
              <span className="text-3xl font-serif text-[#D9D1C5] leading-none">“</span>
              <p className="font-serif italic text-sm sm:text-base text-[#FDFBF7]/90 leading-relaxed">
                {book.sampleQuote.replace(/[“”"]/g, '')}
              </p>
            </div>
            <div className="absolute right-0 bottom-0 text-[100px] font-serif text-white/5 pointer-events-none -mb-10 -mr-4">
              ”
            </div>
          </div>

          {/* Tabs: Sinopse / Trecho do Livro / Ficha Técnica */}
          <div className="border-b border-[#0F2C2C15] flex space-x-6">
            <button
              onClick={() => setActiveTab('sinopse')}
              className={`pb-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer relative ${
                activeTab === 'sinopse'
                  ? 'text-[#0F2C2C] border-b-2 border-[#0F2C2C]'
                  : 'text-[#0F2C2C]/50 hover:text-[#0F2C2C]'
              }`}
            >
              Sinopse Completa
            </button>
            <button
              onClick={() => setActiveTab('amostra')}
              className={`pb-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer relative ${
                activeTab === 'amostra'
                  ? 'text-[#0F2C2C] border-b-2 border-[#0F2C2C]'
                  : 'text-[#0F2C2C]/50 hover:text-[#0F2C2C]'
              }`}
            >
              Degustação de Leitura
            </button>
            <button
              onClick={() => setActiveTab('ficha')}
              className={`pb-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer relative ${
                activeTab === 'ficha'
                  ? 'text-[#0F2C2C] border-b-2 border-[#0F2C2C]'
                  : 'text-[#0F2C2C]/50 hover:text-[#0F2C2C]'
              }`}
            >
              Ficha Técnica
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === 'sinopse' && (
            <div className="space-y-3 text-sm text-[#2D2D2D]/85 leading-relaxed font-sans">
              <p>{book.longDescription}</p>
              <p>
                Uma publicação oficial da <strong>Átrios Editora</strong>, impressa em papel pólen de alta qualidade para leitura confortável e durabilidade geracional.
              </p>
            </div>
          )}

          {activeTab === 'amostra' && (
            <div className="bg-[#F5F1EB] p-5 rounded-sm border border-[#0F2C2C15] space-y-3">
              <h4 className="font-serif font-bold text-base text-[#0F2C2C]">
                {book.sampleChapterTitle || 'Trecho Selecionado'}
              </h4>
              <p className="font-serif text-sm text-[#2D2D2D]/85 leading-relaxed italic">
                {book.sampleChapterText || book.longDescription}
              </p>
              <div className="pt-2 text-xs text-[#0F2C2C]/60 flex items-center justify-between">
                <span>Amostra cortesia da Átrios Editora</span>
                <span className="font-bold text-[#0F2C2C]">Disponível na íntegra no livro impresso</span>
              </div>
            </div>
          )}

          {activeTab === 'ficha' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#F5F1EB] p-3 rounded-sm border border-[#0F2C2C15]">
                <span className="text-[#0F2C2C]/60 block">Título Original</span>
                <span className="font-bold text-[#0F2C2C]">{book.title}</span>
              </div>
              <div className="bg-[#F5F1EB] p-3 rounded-sm border border-[#0F2C2C15]">
                <span className="text-[#0F2C2C]/60 block">Autor</span>
                <span className="font-bold text-[#0F2C2C]">{book.author}</span>
              </div>
              <div className="bg-[#F5F1EB] p-3 rounded-sm border border-[#0F2C2C15]">
                <span className="text-[#0F2C2C]/60 block">Categoria</span>
                <span className="font-bold text-[#0F2C2C]">{book.category}</span>
              </div>
              <div className="bg-[#F5F1EB] p-3 rounded-sm border border-[#0F2C2C15]">
                <span className="text-[#0F2C2C]/60 block">Número de Páginas</span>
                <span className="font-bold text-[#0F2C2C]">{book.pages}</span>
              </div>
              <div className="bg-[#F5F1EB] p-3 rounded-sm border border-[#0F2C2C15]">
                <span className="text-[#0F2C2C]/60 block">ISBN</span>
                <span className="font-bold text-[#0F2C2C]">{book.isbn}</span>
              </div>
              <div className="bg-[#F5F1EB] p-3 rounded-sm border border-[#0F2C2C15]">
                <span className="text-[#0F2C2C]/60 block">Dimensões</span>
                <span className="font-bold text-[#0F2C2C]">{book.dimensions}</span>
              </div>
              <div className="bg-[#F5F1EB] p-3 rounded-sm border border-[#0F2C2C15]">
                <span className="text-[#0F2C2C]/60 block">Ano de Publicação</span>
                <span className="font-bold text-[#0F2C2C]">{book.publishedYear}</span>
              </div>
              <div className="bg-[#F5F1EB] p-3 rounded-sm border border-[#0F2C2C15]">
                <span className="text-[#0F2C2C]/60 block">Acabamento</span>
                <span className="font-bold text-[#0F2C2C]">{book.format}</span>
              </div>
              <div className="bg-[#F5F1EB] p-3 rounded-sm border border-[#0F2C2C15]">
                <span className="text-[#0F2C2C]/60 block">Editora</span>
                <span className="font-bold text-[#0F2C2C]">Átrios Editora</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#0F2C2C15] bg-[#F5F1EB] flex items-center justify-between text-xs text-[#0F2C2C]/70">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#0F2C2C]" />
            <span>Garantia de Excelência Editorial Átrios</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#E8E2D9] hover:bg-[#D9D1C5] text-[#0F2C2C] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
