import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
      <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#0F2C2C]/60">
        Erro 404
      </span>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C2C] leading-tight">
        Esta página saiu de catálogo
      </h1>

      <p className="text-sm text-[#2D2D2D]/75 leading-relaxed max-w-md mx-auto">
        O endereço que você acessou não existe ou foi movido. Que tal explorar as obras publicadas
        pela Átrios?
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link
          href="/catalogo"
          className="px-6 py-3 bg-[#0F2C2C] hover:bg-[#1a4040] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors inline-flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-[#D9D1C5]" />
          <span>Ver o catálogo</span>
        </Link>

        <Link
          href="/"
          className="px-6 py-3 border border-[#0F2C2C30] hover:border-[#0F2C2C] text-[#0F2C2C] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors inline-flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Voltar ao início</span>
        </Link>
      </div>
    </div>
  );
}
