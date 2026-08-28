'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    id="footer-back-to-top-btn"
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#091b1b] hover:bg-[#133838] text-[#D9D1C5] transition-colors cursor-pointer border border-white/10"
  >
    <span>Voltar ao topo</span>
    <ArrowUp className="w-3.5 h-3.5" />
  </button>
);
