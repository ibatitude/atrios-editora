'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <form onSubmit={handleNewsletterSubmit} className="mt-6">
      {newsletterSubscribed ? (
        <div className="flex items-center gap-2 p-3 bg-[#133838] text-[#9ee3c4] rounded-sm text-sm border border-[#1f5252]">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Gratidão! Você receberá nossos próximos conteúdos com propósito.</span>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Mail className="w-4 h-4 opacity-50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              id="newsletter-email-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Seu melhor e-mail..."
              aria-label="Seu melhor e-mail"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-[#051111] border border-white/15 rounded-sm text-sm text-[#FDFBF7] placeholder-white/40 focus:outline-none focus:border-[#D9D1C5] focus:ring-1 focus:ring-[#D9D1C5]"
            />
          </div>
          <button
            type="submit"
            id="newsletter-submit-btn"
            className="px-5 py-2.5 bg-[#D9D1C5] hover:bg-[#E8E2D9] text-[#0F2C2C] font-bold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Inscrever</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </form>
  );
};
