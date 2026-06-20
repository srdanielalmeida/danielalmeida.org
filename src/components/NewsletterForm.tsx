'use client';

import React, { useState } from 'react';
import { isValidEmail } from '@/lib/utils';

interface NewsletterFormProps {
  variant?: 'inline' | 'footer';
}

export function NewsletterForm({ variant = 'footer' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Por favor, insira um email válido.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || null }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Obrigado! Você foi inscrito com sucesso.');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Ocorreu um erro. Tente novamente.');
      }
    } catch {
      setStatus('error');
      setMessage('Erro de conexão. Tente novamente.');
    }
  };

  return (
    <div className={`${variant === 'footer' ? 'bg-cream-dark/50 rounded-lg p-8 border border-bronze/10' : ''}`} id="newsletter-form">
      <div className="text-center mb-5">
        <h3 className="font-heading text-xl text-navy font-semibold mb-1">
          Receba novos textos
        </h3>
        <p className="font-ui text-sm text-bronze/60">
          Inscreva-se para receber novos artigos na sua caixa de entrada.
        </p>
      </div>

      {status === 'success' ? (
        <div className="text-center py-4 animate-fade-in">
          <div className="flex items-center justify-center mb-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#22c55e" strokeWidth="1.5" />
              <path d="M10 16 L14 20 L22 12" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-ui text-sm text-green-600 font-medium">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Seu nome (opcional)"
            className="input-field text-sm flex-shrink-0 sm:w-36"
            id="newsletter-name"
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Seu melhor email"
            required
            className="input-field text-sm flex-1"
            id="newsletter-email"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary whitespace-nowrap text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            id="newsletter-submit"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin-slow h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                  <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Enviando...
              </span>
            ) : (
              'Inscrever-se'
            )}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="font-ui text-xs text-red-500 text-center mt-3 animate-fade-in">{message}</p>
      )}
    </div>
  );
}
