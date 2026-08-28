'use client';

import React, { useState } from 'react';
import { Book } from '@/lib/types';

type TabId = 'sinopse' | 'amostra' | 'ficha';

const TABS: { id: TabId; label: string }[] = [
  { id: 'sinopse', label: 'Sinopse Completa' },
  { id: 'amostra', label: 'Degustação de Leitura' },
  { id: 'ficha', label: 'Ficha Técnica' },
];

/**
 * Os três painéis são sempre renderizados no HTML e apenas ocultados via `hidden`.
 * Renderizar só o painel ativo esconderia trecho e ficha técnica do crawler — que é
 * justamente o conteúdo longo e único que faz a página do livro ranquear.
 */
export const BookTabs: React.FC<{ book: Book }> = ({ book }) => {
  const [activeTab, setActiveTab] = useState<TabId>('sinopse');

  const fichaRows: [string, string | number][] = [
    ['Título Original', book.title],
    ['Autor', book.author],
    ['Categoria', book.category],
    ['Número de Páginas', book.pages],
    ['ISBN', book.isbn],
    ['Dimensões', book.dimensions],
    ['Ano de Publicação', book.publishedYear],
    ['Acabamento', book.format],
    ['Editora', 'Átrios Editora'],
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-[#0F2C2C15] flex space-x-6" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2.5 text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer relative ${
              activeTab === tab.id
                ? 'text-[#0F2C2C] border-b-2 border-[#0F2C2C]'
                : 'text-[#0F2C2C]/50 hover:text-[#0F2C2C]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sinopse */}
      <div
        role="tabpanel"
        id="panel-sinopse"
        aria-labelledby="tab-sinopse"
        hidden={activeTab !== 'sinopse'}
        className="space-y-3 text-sm text-[#2D2D2D]/85 leading-relaxed font-sans"
      >
        <p>{book.longDescription}</p>
        <p>
          Uma publicação oficial da <strong>Átrios Editora</strong>, impressa em papel pólen de alta qualidade para leitura confortável e durabilidade geracional.
        </p>
      </div>

      {/* Degustação */}
      <div
        role="tabpanel"
        id="panel-amostra"
        aria-labelledby="tab-amostra"
        hidden={activeTab !== 'amostra'}
        className="bg-[#F5F1EB] p-5 rounded-sm border border-[#0F2C2C15] space-y-3"
      >
        <h3 className="font-serif font-bold text-base text-[#0F2C2C]">
          {book.sampleChapterTitle || 'Trecho Selecionado'}
        </h3>
        <p className="font-serif text-sm text-[#2D2D2D]/85 leading-relaxed italic">
          {book.sampleChapterText || book.longDescription}
        </p>
        <div className="pt-2 text-xs text-[#0F2C2C]/60 flex items-center justify-between">
          <span>Amostra cortesia da Átrios Editora</span>
          <span className="font-bold text-[#0F2C2C]">Disponível na íntegra no livro impresso</span>
        </div>
      </div>

      {/* Ficha técnica */}
      <div
        role="tabpanel"
        id="panel-ficha"
        aria-labelledby="tab-ficha"
        hidden={activeTab !== 'ficha'}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs"
      >
        {fichaRows.map(([label, value]) => (
          <div key={label} className="bg-[#F5F1EB] p-3 rounded-sm border border-[#0F2C2C15]">
            <span className="text-[#0F2C2C]/60 block">{label}</span>
            <span className="font-bold text-[#0F2C2C]">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
