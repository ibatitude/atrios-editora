'use client';

import React, { useState } from 'react';
import { FileText, Mail } from 'lucide-react';

type TabId = 'originais' | 'contato';

const TABS: { id: TabId; label: string; Icon: typeof FileText }[] = [
  { id: 'originais', label: 'Submissão de Originais (Autores)', Icon: FileText },
  { id: 'contato', label: 'Contato Geral & Leitores', Icon: Mail },
];

/**
 * Os dois painéis são sempre renderizados no HTML e apenas ocultados via `hidden`
 * — mesmo padrão de `BookTabs`. As diretrizes de submissão são o conteúdo longo e
 * único desta rota; renderizar só a aba ativa as esconderia do crawler.
 */
export const ContactTabs: React.FC<{
  originais: React.ReactNode;
  contato: React.ReactNode;
}> = ({ originais, contato }) => {
  const [activeTab, setActiveTab] = useState<TabId>('originais');

  const panels: Record<TabId, React.ReactNode> = { originais, contato };

  return (
    <div className="space-y-16">
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Seções de contato"
          className="inline-flex p-1 rounded-sm bg-[#F5F1EB] border border-[#0F2C2C15]"
        >
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              id={`tab-${id}-btn`}
              role="tab"
              type="button"
              aria-selected={activeTab === id}
              aria-controls={`panel-${id}`}
              onClick={() => setActiveTab(id)}
              className={`px-6 py-3 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === id
                  ? 'bg-[#0F2C2C] text-[#FDFBF7] shadow-xs'
                  : 'text-[#0F2C2C]/70 hover:text-[#0F2C2C]'
              }`}
            >
              <Icon className={`w-4 h-4 ${activeTab === id ? 'text-[#D9D1C5]' : 'text-[#0F2C2C]/50'}`} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {TABS.map(({ id, label }) => (
        <section
          key={id}
          id={`panel-${id}`}
          role="tabpanel"
          aria-label={label}
          hidden={activeTab !== id}
        >
          {panels[id]}
        </section>
      ))}
    </div>
  );
};
