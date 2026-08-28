'use client';

import React, { useState } from 'react';
import { Book } from '@/lib/types';
import { Check, ShoppingBag, Truck, Share2 } from 'lucide-react';

export const BookPurchase: React.FC<{ book: Book }> = ({ book }) => {
  const [purchased, setPurchased] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareFeedback('Link copiado!');
    } catch {
      setShareFeedback('Não foi possível copiar o link.');
    }
    setTimeout(() => setShareFeedback(null), 3000);
  };

  return (
    <div className="space-y-3">
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
            onClick={handleShare}
            className="p-2.5 text-[#0F2C2C]/70 hover:text-[#0F2C2C] hover:bg-[#E8E2D9] rounded-sm transition-colors cursor-pointer"
            title="Copiar link do livro"
            aria-label="Copiar link do livro"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPurchased(true)}
            id="direct-buy-btn"
            className="px-5 py-2.5 bg-[#0F2C2C] hover:opacity-90 text-[#FDFBF7] font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#D9D1C5]" />
            <span>Adquirir Exemplar</span>
          </button>
        </div>
      </div>

      {shareFeedback && (
        <p role="status" className="text-xs text-[#0F2C2C]/70 font-medium">
          {shareFeedback}
        </p>
      )}

      {purchased && (
        <div className="p-3 bg-[#E8E2D9] border border-[#0F2C2C15] text-[#0F2C2C] rounded-sm text-xs flex items-center gap-2 font-medium">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>Pedido simulado com sucesso! Redirecionando para plataforma de distribuição oficial da Átrios.</span>
        </div>
      )}
    </div>
  );
};
