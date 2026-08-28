import React, { useState } from 'react';
import { BookCategory, ContactFormData, ManuscriptFormData } from '../types';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Upload,
  CheckCircle2,
  FileText,
  Clock,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';

interface ContactPageProps {
  onShowToast?: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'originais' | 'contato'>('originais');

  // Contact Form State
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'leitor'
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Manuscript Form State
  const [manuscriptForm, setManuscriptForm] = useState<ManuscriptFormData>({
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
    agreementAccepted: false
  });
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [manuscriptProtocol, setManuscriptProtocol] = useState<string | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    if (onShowToast) onShowToast('Mensagem enviada com sucesso ao time da Átrios!');
  };

  const handleManuscriptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manuscriptForm.authorName || !manuscriptForm.email || !manuscriptForm.bookTitle || !manuscriptForm.agreementAccepted) {
      if (onShowToast) onShowToast('Por favor, preencha todos os campos obrigatórios e aceite os termos.');
      return;
    }
    // Generate simulated protocol number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const protocol = `ATR-2024-${randomNum}`;
    setManuscriptProtocol(protocol);
    if (onShowToast) onShowToast(`Manuscrito submetido com sucesso! Protocolo: ${protocol}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      setManuscriptForm({ ...manuscriptForm, sampleFile: file });
    }
  };

  const resetManuscript = () => {
    setManuscriptProtocol(null);
    setSelectedFileName(null);
    setManuscriptForm({
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
      agreementAccepted: false
    });
  };

  return (
    <div id="contact-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      
      {/* 1. Header Hero */}
      <section className="bg-[#0F2C2C] text-[#FDFBF7] rounded-sm p-8 sm:p-14 relative overflow-hidden shadow-md">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D9D1C5]">
            Central de Atendimento & Originais
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-[#FDFBF7]">
            Fale com a Átrios Editora
          </h1>
          <p className="text-base sm:text-lg text-[#FDFBF7]/85 leading-relaxed">
            Estamos prontos para ouvir leitores, apoiar livrarias parceiras e avaliar manuscritos de autores com mensagens transformadoras.
          </p>
        </div>

        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>


      {/* 2. Navigation Tabs between Manuscript and General Contact */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-sm bg-[#F5F1EB] border border-[#0F2C2C15]">
          <button
            id="tab-originais-btn"
            onClick={() => setActiveTab('originais')}
            className={`px-6 py-3 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === 'originais'
                ? 'bg-[#0F2C2C] text-[#FDFBF7] shadow-xs'
                : 'text-[#0F2C2C]/70 hover:text-[#0F2C2C]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#D9D1C5]" />
            <span>Submissão de Originais (Autores)</span>
          </button>

          <button
            id="tab-contato-btn"
            onClick={() => setActiveTab('contato')}
            className={`px-6 py-3 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === 'contato'
                ? 'bg-[#0F2C2C] text-[#FDFBF7] shadow-xs'
                : 'text-[#0F2C2C]/70 hover:text-[#0F2C2C]'
            }`}
          >
            <Mail className="w-4 h-4 text-[#D9D1C5]" />
            <span>Contato Geral & Leitores</span>
          </button>
        </div>
      </div>


      {/* 3. SUBMISSION OF MANUSCRIPTS SECTION */}
      {activeTab === 'originais' && (
        <section id="manuscript-submission-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Guidelines & Editorial Process */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#0F2C2C15] shadow-xs space-y-5">
              <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70 block">
                Diretrizes de Envio
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0F2C2C]">
                Como funciona a avaliação de originais?
              </h3>
              <p className="text-xs text-[#2D2D2D]/75 leading-relaxed">
                Nosso Conselho Editorial analisa criteriosamente cada proposta submetida. Buscamos obras que dialoguem com nossa missão de inspirar fé, fortalecer famílias, capacitar líderes e promover maturidade interior.
              </p>

              {/* Steps timeline */}
              <div className="space-y-4 pt-2 border-t border-[#0F2C2C15]">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-sm bg-[#0F2C2C] text-[#D9D1C5] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                    1
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F2C2C]">Submissão e Triagem Inicial</h4>
                    <p className="text-[11px] text-[#0F2C2C]/60">Verificação de conformidade com nossa linha editorial em até 5 dias úteis.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-sm bg-[#0F2C2C] text-[#D9D1C5] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                    2
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F2C2C]">Leitura Crítica pelo Conselho</h4>
                    <p className="text-[11px] text-[#0F2C2C]/60">Análise de densidade temática, originalidade e potencial de impacto.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-sm bg-[#0F2C2C] text-[#D9D1C5] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                    3
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F2C2C]">Parecer Editorial & Proposta</h4>
                    <p className="text-[11px] text-[#0F2C2C]/60">Envio de retorno formal com orientações e possível proposta de publicação.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F5F1EB] p-4 rounded-sm border border-[#0F2C2C15] flex items-start gap-2.5 text-xs text-[#2D2D2D]/85">
                <Info className="w-4 h-4 text-[#0F2C2C] flex-shrink-0 mt-0.5" />
                <span>Prazo médio de resposta do conselho: de 15 a 30 dias úteis. Todos os autores recebem retorno formal.</span>
              </div>
            </div>

            {/* What we evaluate card */}
            <div className="bg-[#0F2C2C] text-[#FDFBF7] p-6 rounded-sm space-y-3 shadow-md">
              <span className="text-xs uppercase tracking-widest text-[#D9D1C5] font-semibold">
                Categorias Aceitas
              </span>
              <ul className="text-xs text-[#FDFBF7]/85 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D9D1C5]" />
                  <span><strong>Fé & Espiritualidade:</strong> Devocionais, teologia bíblica prática, biografias de fé.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D9D1C5]" />
                  <span><strong>Liderança & Gestão:</strong> Liderança servidora, ética corporativa, gestão de equipes.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D9D1C5]" />
                  <span><strong>Família & Casamento:</strong> Criação de filhos, relacionamentos saudáveis, inteligência parental.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D9D1C5]" />
                  <span><strong>Desenvolvimento Pessoal:</strong> Hábitos com propósito, maturidade emocional, vocação.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Submission Form or Success Confirmation */}
          <div className="lg:col-span-7">
            {manuscriptProtocol ? (
              <div className="bg-white p-8 sm:p-12 rounded-sm border border-[#0F2C2C] shadow-md text-center space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-[#0F2C2C] text-[#D9D1C5] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#0F2C2C]/70">
                    Submissão Recebida com Sucesso!
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2C2C]">
                    Seu manuscrito está com o Conselho Átrios
                  </h3>
                  <p className="text-sm text-[#2D2D2D]/75 max-w-md mx-auto">
                    Agradecemos por confiar sua mensagem à Átrios Editora. Nossa equipe iniciou a triagem editorial.
                  </p>
                </div>

                {/* Protocol Box */}
                <div className="bg-[#F5F1EB] p-5 rounded-sm border border-[#0F2C2C15] max-w-sm mx-auto space-y-1">
                  <span className="text-xs text-[#0F2C2C]/70 block font-medium">Número do Protocolo Editorial:</span>
                  <span className="font-mono font-bold text-2xl text-[#0F2C2C] tracking-wider block">
                    {manuscriptProtocol}
                  </span>
                  <span className="text-[11px] text-[#0F2C2C]/80 block">
                    Uma cópia foi enviada para {manuscriptForm.email}
                  </span>
                </div>

                <div className="text-xs text-[#0F2C2C]/70 space-y-1">
                  <p>Obra submetida: <strong>"{manuscriptForm.bookTitle}"</strong></p>
                  <p>Autor: <strong>{manuscriptForm.authorName}</strong> • Categoria: <strong>{manuscriptForm.category}</strong></p>
                </div>

                <button
                  onClick={resetManuscript}
                  className="px-6 py-2.5 bg-[#0F2C2C] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Enviar Outra Proposta
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleManuscriptSubmit}
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

                {/* Dados do Autor */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2C2C]/70">
                    1. Dados do Autor
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                        Nome Completo do Autor *
                      </label>
                      <input
                        type="text"
                        required
                        value={manuscriptForm.authorName}
                        onChange={(e) => setManuscriptForm({ ...manuscriptForm, authorName: e.target.value })}
                        placeholder="Ex: Gabriel S. Vasconcelos"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                        E-mail de Contato *
                      </label>
                      <input
                        type="email"
                        required
                        value={manuscriptForm.email}
                        onChange={(e) => setManuscriptForm({ ...manuscriptForm, email: e.target.value })}
                        placeholder="autor@exemplo.com.br"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={manuscriptForm.phone}
                        onChange={(e) => setManuscriptForm({ ...manuscriptForm, phone: e.target.value })}
                        placeholder="(31) 99999-0000"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                        Cidade e Estado *
                      </label>
                      <input
                        type="text"
                        required
                        value={manuscriptForm.cityState}
                        onChange={(e) => setManuscriptForm({ ...manuscriptForm, cityState: e.target.value })}
                        placeholder="Ex: Belo Horizonte, MG"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                      Mini-biografia do Autor (Trajetória, atuação e formação) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={manuscriptForm.authorBio}
                      onChange={(e) => setManuscriptForm({ ...manuscriptForm, authorBio: e.target.value })}
                      placeholder="Conte brevemente sobre sua história, formação acadêmica ou ministerial..."
                      className="w-full px-3.5 py-2 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                    />
                  </div>
                </div>

                {/* Dados da Obra */}
                <div className="space-y-4 pt-4 border-t border-[#0F2C2C15]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2C2C]/70">
                    2. Dados da Obra Proposta
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                        Título Provisório da Obra *
                      </label>
                      <input
                        type="text"
                        required
                        value={manuscriptForm.bookTitle}
                        onChange={(e) => setManuscriptForm({ ...manuscriptForm, bookTitle: e.target.value })}
                        placeholder="Ex: O Poder da Esperança Silenciosa"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                        Categoria Editorial *
                      </label>
                      <select
                        value={manuscriptForm.category}
                        onChange={(e) => setManuscriptForm({ ...manuscriptForm, category: e.target.value as BookCategory })}
                        className="w-full px-3 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-xs font-medium text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                      >
                        <option value="Fé">Fé & Espiritualidade</option>
                        <option value="Liderança">Liderança Servidora</option>
                        <option value="Família">Família & Casamento</option>
                        <option value="Desenvolvimento Pessoal">Desenvolvimento Pessoal</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                        Público-Alvo Primário *
                      </label>
                      <input
                        type="text"
                        required
                        value={manuscriptForm.targetAudience}
                        onChange={(e) => setManuscriptForm({ ...manuscriptForm, targetAudience: e.target.value })}
                        placeholder="Ex: Jovens adultos, líderes comunitários, pais..."
                        className="w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                        Estimativa de Páginas
                      </label>
                      <input
                        type="number"
                        min={50}
                        max={800}
                        value={manuscriptForm.estimatedPages}
                        onChange={(e) => setManuscriptForm({ ...manuscriptForm, estimatedPages: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                      Sinopse Estruturada & Resumo dos Capítulos *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={manuscriptForm.synopsis}
                      onChange={(e) => setManuscriptForm({ ...manuscriptForm, synopsis: e.target.value })}
                      placeholder="Descreva a tese central do livro, o problema que ele resolve e a estrutura dos principais capítulos..."
                      className="w-full px-3.5 py-2 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                    />
                  </div>

                  {/* Upload box */}
                  <div>
                    <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                      Arquivo do Manuscrito ou Sumário + 2 Capítulos de Degustação (.PDF ou .DOCX)
                    </label>
                    <div className="border-2 border-dashed border-[#0F2C2C15] hover:border-[#0F2C2C] rounded-sm p-6 text-center bg-[#FDFBF7] transition-colors relative cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <Upload className="w-8 h-8 text-[#0F2C2C] mx-auto mb-2" />
                      {selectedFileName ? (
                        <p className="text-xs font-bold text-[#0F2C2C] flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-[#0F2C2C]" />
                          <span>Arquivo selecionado: {selectedFileName}</span>
                        </p>
                      ) : (
                        <>
                          <p className="text-xs font-bold text-[#0F2C2C]">
                            Clique para selecionar ou arraste o arquivo até aqui
                          </p>
                          <p className="text-[11px] text-[#0F2C2C]/60 mt-1">
                            Formatos suportados: PDF, DOC ou DOCX (Tamanho máx: 25MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Termos & Submissão */}
                <div className="space-y-4 pt-4 border-t border-[#0F2C2C15]">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={manuscriptForm.agreementAccepted}
                      onChange={(e) => setManuscriptForm({ ...manuscriptForm, agreementAccepted: e.target.checked })}
                      className="mt-1 rounded-xs text-[#0F2C2C] focus:ring-[#0F2C2C]"
                    />
                    <span className="text-xs text-[#2D2D2D]/75 leading-relaxed">
                      Declaro ser o autor ou titular dos direitos autorais deste conteúdo e autorizo a leitura confidencial pelo Conselho Editorial da Átrios Editora para fins de análise de publicação.
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
            )}
          </div>

        </section>
      )}


      {/* 4. GENERAL CONTACT SECTION (LEITORES, LIVRARIAS, IMPRENSA) */}
      {activeTab === 'contato' && (
        <section id="general-contact-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct channels & Headquarters */}
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
                    <h4 className="font-bold text-xs text-[#0F2C2C]">Sede Editorial & Correspondência</h4>
                    <p className="text-xs text-[#0F2C2C]/60 mt-0.5">
                      Av. das Nações Literárias, 1420 — Sala 804<br />
                      Belo Horizonte, MG • CEP 30120-050
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-sm bg-[#F5F1EB] flex items-center justify-center text-[#0F2C2C] flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0F2C2C]">Atendimento Editorial</h4>
                    <p className="text-xs text-[#0F2C2C]/60 mt-0.5">contato@atrioseditora.com.br</p>
                    <p className="text-xs text-[#0F2C2C]/60">pedidos@atrioseditora.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-sm bg-[#F5F1EB] flex items-center justify-center text-[#0F2C2C] flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0F2C2C]">Telefone & WhatsApp</h4>
                    <p className="text-xs text-[#0F2C2C]/60 mt-0.5">(31) 3490-8200</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-sm bg-[#F5F1EB] flex items-center justify-center text-[#0F2C2C] flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0F2C2C]">Horário de Atendimento</h4>
                    <p className="text-xs text-[#0F2C2C]/60 mt-0.5">Segunda a Sexta: 09h às 18h (Horário de Brasília)</p>
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

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-sm border border-[#0F2C2C15] shadow-xs space-y-6">
              
              <div className="border-b border-[#0F2C2C15] pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#0F2C2C]">
                  Envie sua Mensagem
                </h3>
                <p className="text-xs text-[#0F2C2C]/60 mt-1">
                  Dúvidas sobre pedidos, sugestões de pauta, eventos com autores ou parcerias comerciais.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="p-8 text-center space-y-4 bg-[#F5F1EB] rounded-sm border border-[#0F2C2C15]">
                  <CheckCircle2 className="w-12 h-12 text-[#0F2C2C] mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-[#0F2C2C]">
                    Mensagem Recebida com Sucesso!
                  </h4>
                  <p className="text-xs text-[#2D2D2D]/75 max-w-sm mx-auto">
                    Nossa equipe responderá sua solicitação em até 24 horas úteis no e-mail informado.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                        type: 'leitor'
                      });
                    }}
                    className="px-5 py-2 bg-[#0F2C2C] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer"
                  >
                    Enviar Nova Mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  
                  {/* Segment / Profile Selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#0F2C2C] mb-1.5">
                      Perfil de Atendimento
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: 'Leitor', val: 'leitor' },
                        { label: 'Livraria / Loja', val: 'livraria' },
                        { label: 'Igreja / Ministério', val: 'parceria' },
                        { label: 'Imprensa / Mídia', val: 'imprensa' }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setContactForm({ ...contactForm, type: item.val as any })}
                          className={`py-2 px-2 text-xs font-bold uppercase tracking-wider rounded-sm border text-center transition-colors cursor-pointer ${
                            contactForm.type === item.val
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
                      <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Ex: Maria Silva"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                        Seu E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="maria@exemplo.com.br"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="(31) 99999-0000"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                        Assunto *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="Ex: Compras em lote para congresso"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#0F2C2C15] rounded-sm text-sm text-[#0F2C2C] focus:outline-none focus:border-[#0F2C2C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F2C2C] mb-1">
                      Mensagem detalhada *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
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
              )}

            </div>
          </div>

        </section>
      )}

    </div>
  );
};
