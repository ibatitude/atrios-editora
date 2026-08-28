import React from 'react';
import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import { ContactTabs } from '@/components/ContactTabs';
import { ContactForm } from '@/components/ContactForm';
import { ManuscriptForm } from '@/components/ManuscriptForm';
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  EDITORIAL_EMAIL,
  EDITORIAL_PHONE,
  ORDERS_EMAIL,
} from '@/lib/contact';
import { CheckCircle2, Clock, Info, Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contato & Originais',
  description:
    'Fale com a Átrios Editora ou submeta seu manuscrito para avaliação do Conselho Editorial. Atendimento a leitores, livrarias, igrejas e imprensa.',
  alternates: { canonical: '/contato' },
  openGraph: {
    title: 'Contato & Submissão de Originais | Átrios Editora',
    description:
      'Envie sua mensagem ou submeta seu manuscrito para avaliação do Conselho Editorial da Átrios.',
    url: '/contato',
    images: [DEFAULT_OG_IMAGE],
  },
};

const SUBMISSION_STEPS = [
  {
    title: 'Submissão e Triagem Inicial',
    text: 'Verificação de conformidade com nossa linha editorial em até 5 dias úteis.',
  },
  {
    title: 'Leitura Crítica pelo Conselho',
    text: 'Análise de densidade temática, originalidade e potencial de impacto.',
  },
  {
    title: 'Parecer Editorial & Proposta',
    text: 'Envio de retorno formal com orientações e possível proposta de publicação.',
  },
];

const ACCEPTED_CATEGORIES = [
  {
    name: 'Fé & Espiritualidade',
    text: 'Devocionais, teologia bíblica prática, biografias de fé.',
  },
  {
    name: 'Liderança & Gestão',
    text: 'Liderança servidora, ética corporativa, gestão de equipes.',
  },
  {
    name: 'Família & Casamento',
    text: 'Criação de filhos, relacionamentos saudáveis, inteligência parental.',
  },
  {
    name: 'Desenvolvimento Pessoal',
    text: 'Hábitos com propósito, maturidade emocional, vocação.',
  },
];

/** Painel esquerdo da aba de originais: diretrizes e categorias aceitas. */
function SubmissionGuidelines() {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#0F2C2C15] shadow-xs space-y-5">
        <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70 block">
          Diretrizes de Envio
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#0F2C2C]">
          Como funciona a avaliação de originais?
        </h3>
        <p className="text-xs text-[#2D2D2D]/75 leading-relaxed">
          Nosso Conselho Editorial analisa criteriosamente cada proposta submetida. Buscamos obras
          que dialoguem com nossa missão de inspirar fé, fortalecer famílias, capacitar líderes e
          promover maturidade interior.
        </p>

        <ol className="space-y-4 pt-2 border-t border-[#0F2C2C15]">
          {SUBMISSION_STEPS.map((step, i) => (
            <li key={step.title} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-sm bg-[#0F2C2C] text-[#D9D1C5] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                {i + 1}
              </span>
              <div>
                <h4 className="text-xs font-bold text-[#0F2C2C]">{step.title}</h4>
                <p className="text-[11px] text-[#0F2C2C]/60">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="bg-[#F5F1EB] p-4 rounded-sm border border-[#0F2C2C15] flex items-start gap-2.5 text-xs text-[#2D2D2D]/85">
          <Info className="w-4 h-4 text-[#0F2C2C] flex-shrink-0 mt-0.5" />
          <span>
            Prazo médio de resposta do conselho: de 15 a 30 dias úteis. Todos os autores recebem
            retorno formal.
          </span>
        </div>
      </div>

      <div className="bg-[#0F2C2C] text-[#FDFBF7] p-6 rounded-sm space-y-3 shadow-md">
        <span className="text-xs uppercase tracking-widest text-[#D9D1C5] font-semibold">
          Categorias Aceitas
        </span>
        <ul className="text-xs text-[#FDFBF7]/85 space-y-2">
          {ACCEPTED_CATEGORIES.map((cat) => (
            <li key={cat.name} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D9D1C5] flex-shrink-0 mt-0.5" />
              <span>
                <strong>{cat.name}:</strong> {cat.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Painel esquerdo da aba de contato: canais oficiais. */
function OfficialChannels() {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#0F2C2C15] shadow-xs space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70">
            Canais Oficiais
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#0F2C2C] mt-1">
            Estamos à sua disposição
          </h3>
        </div>

        <div className="space-y-4 text-sm text-[#2D2D2D]/85">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#F5F1EB] flex items-center justify-center text-[#0F2C2C] flex-shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#0F2C2C]">
                Sede Editorial &amp; Correspondência
              </h4>
              <p className="text-xs text-[#0F2C2C]/60 mt-0.5">
                {ADDRESS_LINE_1}
                <br />
                {ADDRESS_LINE_2}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#F5F1EB] flex items-center justify-center text-[#0F2C2C] flex-shrink-0 mt-0.5">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#0F2C2C]">Atendimento Editorial</h4>
              <p className="text-xs text-[#0F2C2C]/60 mt-0.5">
                <a href={`mailto:${EDITORIAL_EMAIL}`} className="hover:text-[#0F2C2C] hover:underline">
                  {EDITORIAL_EMAIL}
                </a>
              </p>
              <p className="text-xs text-[#0F2C2C]/60">
                <a href={`mailto:${ORDERS_EMAIL}`} className="hover:text-[#0F2C2C] hover:underline">
                  {ORDERS_EMAIL}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#F5F1EB] flex items-center justify-center text-[#0F2C2C] flex-shrink-0 mt-0.5">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#0F2C2C]">Telefone &amp; WhatsApp</h4>
              <p className="text-xs text-[#0F2C2C]/60 mt-0.5">{EDITORIAL_PHONE}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#F5F1EB] flex items-center justify-center text-[#0F2C2C] flex-shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#0F2C2C]">Horário de Atendimento</h4>
              <p className="text-xs text-[#0F2C2C]/60 mt-0.5">
                Segunda a Sexta: 09h às 18h (Horário de Brasília)
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-[#0F2C2C15]">
          <span className="text-xs text-[#0F2C2C]/60 block font-medium">
            Atendimento para Igrejas, Livrarias e Distribuidores:
          </span>
          <p className="text-xs text-[#0F2C2C] font-bold mt-1">
            Consulte nossa tabela especial de atacado e consignação pelo formulário ao lado.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ContatoPage() {
  return (
    <div id="contact-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      <section className="bg-[#0F2C2C] text-[#FDFBF7] rounded-sm p-8 sm:p-14 relative overflow-hidden shadow-md">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D9D1C5]">
            Central de Atendimento &amp; Originais
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-[#FDFBF7]">
            Fale com a Átrios Editora
          </h1>
          <p className="text-base sm:text-lg text-[#FDFBF7]/85 leading-relaxed">
            Estamos prontos para ouvir leitores, apoiar livrarias parceiras e avaliar manuscritos de
            autores com mensagens transformadoras.
          </p>
        </div>

        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      <ContactTabs
        originais={
          <div
            id="manuscript-submission-section"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            <SubmissionGuidelines />
            <div className="lg:col-span-7">
              <ManuscriptForm />
            </div>
          </div>
        }
        contato={
          <div
            id="general-contact-section"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            <OfficialChannels />
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-10 rounded-sm border border-[#0F2C2C15] shadow-xs space-y-6">
                <div className="border-b border-[#0F2C2C15] pb-4">
                  <h3 className="font-serif text-2xl font-bold text-[#0F2C2C]">
                    Envie sua Mensagem
                  </h3>
                  <p className="text-xs text-[#0F2C2C]/60 mt-1">
                    Dúvidas sobre pedidos, sugestões de pauta, eventos com autores ou parcerias
                    comerciais.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
