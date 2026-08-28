'use client';

import React, { useState } from 'react';
import type { ContactFormData } from '@/lib/types';
import { buildContactMessage } from '@/lib/contact';
import { Send, CheckCircle2, Mail, Copy } from 'lucide-react';

const PROFILES: { label: string; val: ContactFormData['type'] }[] = [
  { label: 'Leitor', val: 'leitor' },
  { label: 'Livraria / Loja', val: 'livraria' },
  { label: 'Igreja / Ministério', val: 'parceria' },
  { label: 'Imprensa / Mídia', val: 'imprensa' },
];

const EMPTY: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  type: 'leitor',
};

const inputClass =
  'w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]';
const labelClass = 'block text-xs font-bold text-[#0F2C2C] mb-1';

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<ContactFormData>(EMPTY);
  const [sent, setSent] = useState<ReturnType<typeof buildContactMessage> | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setSent(buildContactMessage(form));
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
      <div className="p-6 sm:p-8 text-center space-y-4 bg-[#F5F1EB] rounded-sm border border-[#0F2C2C15]">
        <CheckCircle2 className="w-12 h-12 text-[#0F2C2C] mx-auto" />
        <h4 className="font-serif text-xl font-bold text-[#0F2C2C]">
          Sua mensagem está pronta para envio
        </h4>
        <p className="text-xs text-[#2D2D2D]/75 max-w-sm mx-auto leading-relaxed">
          Toque no botão abaixo para abrir seu aplicativo de e-mail com a mensagem já preenchida.
          Respondemos em até 24 horas úteis.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center pt-1">
          <a
            href={sent.href}
            className="px-5 py-2.5 bg-[#0F2C2C] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#D9D1C5]" />
            <span>Abrir meu e-mail</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="px-5 py-2.5 border border-[#0F2C2C30] text-[#0F2C2C] text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
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
          }}
          className="text-xs text-[#0F2C2C]/70 hover:text-[#0F2C2C] underline cursor-pointer"
        >
          Escrever outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <span className="block text-xs font-bold text-[#0F2C2C] mb-1.5">Perfil de Atendimento</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PROFILES.map((item) => (
            <button
              key={item.val}
              type="button"
              onClick={() => setForm({ ...form, type: item.val })}
              aria-pressed={form.type === item.val}
              className={`py-2 px-2 text-xs font-bold uppercase tracking-wider rounded-sm border text-center transition-colors cursor-pointer ${
                form.type === item.val
                  ? 'bg-[#0F2C2C] text-[#FDFBF7] border-[#0F2C2C]'
                  : 'bg-white text-[#0F2C2C]/70 border-[#0F2C2C15] hover:bg-[#F5F1EB]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className={labelClass}>Seu Nome Completo *</label>
          <input
            id="contact-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ex: Maria Silva"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>Seu E-mail *</label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="maria@exemplo.com.br"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className={labelClass}>Telefone / WhatsApp</label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="(31) 99999-0000"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className={labelClass}>Assunto *</label>
          <input
            id="contact-subject"
            type="text"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="Ex: Compras em lote para congresso"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>Mensagem detalhada *</label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Escreva sua dúvida, proposta ou solicitação..."
          className="w-full px-3.5 py-2 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
        />
      </div>

      <button
        type="submit"
        id="submit-contact-btn"
        className="w-full py-4 bg-[#0F2C2C] hover:opacity-90 text-[#FDFBF7] font-bold text-xs uppercase tracking-widest rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <Send className="w-4 h-4 text-[#D9D1C5]" />
        <span>Enviar Mensagem</span>
      </button>
    </form>
  );
};
