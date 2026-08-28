'use client';

import React, { useState } from 'react';
import type { BookCategory, ManuscriptFormData } from '@/lib/types';
import { buildManuscriptMessage } from '@/lib/contact';
import { Send, Upload, CheckCircle2, Mail, Copy, Paperclip } from 'lucide-react';

const CATEGORY_OPTIONS: { value: BookCategory; label: string }[] = [
  { value: 'Fé', label: 'Fé & Espiritualidade' },
  { value: 'Liderança', label: 'Liderança Servidora' },
  { value: 'Família', label: 'Família & Casamento' },
  { value: 'Desenvolvimento Pessoal', label: 'Desenvolvimento Pessoal' },
];

const EMPTY: ManuscriptFormData = {
  authorName: '',
  email: '',
  phone: '',
  cityState: '',
  bookTitle: '',
  category: 'Fé',
  targetAudience: '',
  estimatedPages: 200,
  synopsis: '',
  authorBio: '',
  hasPublishedBefore: false,
  sampleFile: null,
  agreementAccepted: false,
};

const inputClass =
  'w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]';
const areaClass =
  'w-full px-3.5 py-2 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]';
const labelClass = 'block text-xs font-bold text-[#0F2C2C] mb-1';

export const ManuscriptForm: React.FC = () => {
  const [form, setForm] = useState<ManuscriptFormData>(EMPTY);
  const [fileName, setFileName] = useState<string | null>(null);
  const [sent, setSent] = useState<ReturnType<typeof buildManuscriptMessage> | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.authorName || !form.email || !form.bookTitle || !form.agreementAccepted) return;
    setSent(buildManuscriptMessage(form));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setForm({ ...form, sampleFile: file });
  };

  const handleCopy = async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(`${sent.subject}\n\n${sent.body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-white p-8 sm:p-10 rounded-sm border border-[#0F2C2C] shadow-md text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#0F2C2C] text-[#D9D1C5] flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70">
            Falta um passo para concluir
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2C2C]">
            Sua proposta está pronta para o Conselho
          </h3>
          <p className="text-sm text-[#2D2D2D]/75 max-w-md mx-auto leading-relaxed">
            Reunimos tudo o que você preencheu em uma mensagem. Abra seu e-mail,{' '}
            <strong>anexe o arquivo do manuscrito</strong> e envie — é assim que sua obra chega ao
            Conselho Editorial da Átrios.
          </p>
        </div>

        <div className="bg-[#F5F1EB] p-4 rounded-sm border border-[#0F2C2C15] max-w-md mx-auto text-left space-y-1">
          <p className="text-xs text-[#0F2C2C]/80">
            Obra: <strong>&ldquo;{form.bookTitle}&rdquo;</strong>
          </p>
          <p className="text-xs text-[#0F2C2C]/80">
            Autor: <strong>{form.authorName}</strong> • Categoria: <strong>{form.category}</strong>
          </p>
          <p className="text-xs text-[#0F2C2C]/80 flex items-center gap-1.5 pt-1">
            <Paperclip className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              {fileName
                ? `Lembre-se de anexar: ${fileName}`
                : 'Lembre-se de anexar o arquivo (PDF ou DOCX).'}
            </span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <a
            href={sent.href}
            className="px-6 py-2.5 bg-[#0F2C2C] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#D9D1C5]" />
            <span>Abrir meu e-mail</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="px-5 py-2.5 border border-[#0F2C2C30] text-[#0F2C2C] text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#F5F1EB] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copiado!' : 'Copiar texto'}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setSent(null);
            setForm(EMPTY);
            setFileName(null);
          }}
          className="text-xs text-[#0F2C2C]/70 hover:text-[#0F2C2C] underline cursor-pointer"
        >
          Preencher outra proposta
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="manuscript-submission-form"
      className="bg-white p-6 sm:p-10 rounded-sm border border-[#0F2C2C15] shadow-xs space-y-6"
    >
      <div className="border-b border-[#0F2C2C15] pb-4">
        <h3 className="font-serif text-2xl font-bold text-[#0F2C2C]">
          Formulário de Submissão de Manuscrito
        </h3>
        <p className="text-xs text-[#0F2C2C]/60 mt-1">
          Preencha os dados da obra e do autor para avaliação pelo conselho editorial.
        </p>
      </div>

      {/* 1. Dados do Autor */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2C2C]/70">
          1. Dados do Autor
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ms-author" className={labelClass}>Nome Completo do Autor *</label>
            <input
              id="ms-author"
              type="text"
              required
              value={form.authorName}
              onChange={(e) => setForm({ ...form, authorName: e.target.value })}
              placeholder="Ex: Gabriel S. Vasconcelos"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="ms-email" className={labelClass}>E-mail de Contato *</label>
            <input
              id="ms-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="autor@exemplo.com.br"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ms-phone" className={labelClass}>Telefone / WhatsApp *</label>
            <input
              id="ms-phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="(21) 99999-0000"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="ms-city" className={labelClass}>Cidade e Estado *</label>
            <input
              id="ms-city"
              type="text"
              required
              value={form.cityState}
              onChange={(e) => setForm({ ...form, cityState: e.target.value })}
              placeholder="Ex: Rio de Janeiro, RJ"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="ms-bio" className={labelClass}>
            Mini-biografia do Autor (Trajetória, atuação e formação) *
          </label>
          <textarea
            id="ms-bio"
            rows={2}
            required
            value={form.authorBio}
            onChange={(e) => setForm({ ...form, authorBio: e.target.value })}
            placeholder="Conte brevemente sobre sua história, formação acadêmica ou ministerial..."
            className={areaClass}
          />
        </div>
      </div>

      {/* 2. Dados da Obra */}
      <div className="space-y-4 pt-4 border-t border-[#0F2C2C15]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2C2C]/70">
          2. Dados da Obra Proposta
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="ms-title" className={labelClass}>Título Provisório da Obra *</label>
            <input
              id="ms-title"
              type="text"
              required
              value={form.bookTitle}
              onChange={(e) => setForm({ ...form, bookTitle: e.target.value })}
              placeholder="Ex: O Poder da Esperança Silenciosa"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="ms-category" className={labelClass}>Categoria Editorial *</label>
            <select
              id="ms-category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as BookCategory })}
              className="w-full px-3 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-xs font-medium text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ms-audience" className={labelClass}>Público-Alvo Primário *</label>
            <input
              id="ms-audience"
              type="text"
              required
              value={form.targetAudience}
              onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
              placeholder="Ex: Jovens adultos, líderes comunitários, pais..."
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="ms-pages" className={labelClass}>Estimativa de Páginas</label>
            <input
              id="ms-pages"
              type="number"
              min={50}
              max={800}
              value={form.estimatedPages}
              onChange={(e) => setForm({ ...form, estimatedPages: Number(e.target.value) })}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="ms-synopsis" className={labelClass}>
            Sinopse Estruturada &amp; Resumo dos Capítulos *
          </label>
          <textarea
            id="ms-synopsis"
            rows={4}
            required
            value={form.synopsis}
            onChange={(e) => setForm({ ...form, synopsis: e.target.value })}
            placeholder="Descreva a tese central do livro, o problema que ele resolve e a estrutura dos principais capítulos..."
            className={areaClass}
          />
        </div>

        <div>
          <label htmlFor="ms-file" className={labelClass}>
            Arquivo do Manuscrito ou Sumário + 2 Capítulos de Degustação (.PDF ou .DOCX)
          </label>
          <div className="border-2 border-dashed border-[#0F2C2C15] hover:border-[#0F2C2C] rounded-sm p-6 text-center bg-[#FDFBF7] transition-colors relative">
            <input
              id="ms-file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <Upload className="w-8 h-8 text-[#0F2C2C] mx-auto mb-2" />
            {fileName ? (
              <p className="text-xs font-bold text-[#0F2C2C] flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-[#0F2C2C]" />
                <span>Arquivo selecionado: {fileName}</span>
              </p>
            ) : (
              <>
                <p className="text-xs font-bold text-[#0F2C2C]">Clique para selecionar o arquivo</p>
                <p className="text-[11px] text-[#0F2C2C]/60 mt-1">
                  Formatos suportados: PDF, DOC ou DOCX (Tamanho máx: 25MB)
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3. Termos & Submissão */}
      <div className="space-y-4 pt-4 border-t border-[#0F2C2C15]">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={form.agreementAccepted}
            onChange={(e) => setForm({ ...form, agreementAccepted: e.target.checked })}
            className="mt-1 rounded-xs text-[#0F2C2C] focus:ring-[#0F2C2C]"
          />
          <span className="text-xs text-[#2D2D2D]/75 leading-relaxed">
            Declaro ser o autor ou titular dos direitos autorais deste conteúdo e autorizo a leitura
            confidencial pelo Conselho Editorial da Átrios Editora para fins de análise de
            publicação.
          </span>
        </label>

        <button
          type="submit"
          id="submit-manuscript-btn"
          className="w-full py-4 bg-[#0F2C2C] hover:opacity-90 text-[#FDFBF7] font-bold text-xs uppercase tracking-widest rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4 text-[#D9D1C5]" />
          <span>Submeter Manuscrito para Avaliação</span>
        </button>
      </div>
    </form>
  );
};
