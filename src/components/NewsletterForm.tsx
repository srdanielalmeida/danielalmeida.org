'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Field as FieldPrimitive } from '@base-ui/react/field';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

interface NewsletterFormProps {
  variant?: 'inline' | 'footer';
}

function Field({
  className,
  ...props
}: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      className={cn("flex flex-col items-start gap-1.5 w-full", className)}
      data-slot="field"
      {...props}
    />
  );
}

function FieldLabel({
  className,
  ...props
}: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      className={cn(
        "inline-flex items-center gap-2 font-semibold text-xs text-navy/70 uppercase tracking-wider font-ui",
        className,
      )}
      data-slot="field-label"
      {...props}
    />
  );
}

function FieldError({
  className,
  ...props
}: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      className={cn("text-red-500 text-xs font-ui mt-1", className)}
      data-slot="field-error"
      {...props}
    />
  );
}

function Input({
  className,
  ...props
}: React.ComponentProps<typeof InputPrimitive>) {
  return (
    <span
      className={cn(
        "relative inline-flex w-full rounded-md border border-bronze/20 bg-white text-navy shadow-sm transition-all focus-within:ring-2 focus-within:ring-gold/30 focus-within:border-gold has-[[aria-invalid]]:border-red-500/50 has-[[aria-invalid]]:focus-within:ring-red-500/20 text-sm font-ui",
        className,
      )}
      data-slot="input-control"
    >
      <InputPrimitive
        className="h-10 w-full min-w-0 rounded-[inherit] px-3.5 outline-none placeholder:text-bronze/40 text-sm"
        data-slot="input"
        {...props}
      />
    </span>
  );
}

function Button({
  className,
  children,
  loading = false,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-ui text-sm font-medium transition-all",
        "bg-navy hover:bg-navy-light text-cream shadow-sm border border-navy",
        "h-10 px-5",
        "focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        loading && "select-none text-transparent",
        className,
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <span className="invisible inline-flex items-center gap-2">{children}</span>
          <Loader2Icon
            aria-label="Enviando..."
            className="pointer-events-none absolute animate-spin text-cream"
            role="status"
            size={18}
          />
        </>
      ) : (
        children
      )}
    </button>
  );
}

const schema = z.object({
  name: z.string().optional(),
  email: z.string().min(1, { message: "O e-mail é obrigatório." }).email({ message: "Por favor, insira um e-mail válido." }),
});

type Errors = Record<string, string | string[]>;

export function NewsletterForm({ variant = 'footer' }: NewsletterFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObj = Object.fromEntries(formData);

    const result = schema.safeParse(dataObj);
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      const errorsMap: Errors = {};
      (Object.keys(fieldErrors) as Array<keyof typeof fieldErrors>).forEach(key => {
        const val = fieldErrors[key];
        if (val && val.length > 0) errorsMap[key] = val[0];
      });
      setErrors(errorsMap);
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: result.data.email, name: result.data.name || null }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Obrigado! Você foi inscrito com sucesso.');
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
      <div className="text-center mb-6">
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
        <Form className="max-w-lg mx-auto w-full gap-4" errors={errors} onSubmit={onSubmit}>
          <div className="flex flex-col sm:flex-row gap-4 w-full items-start">
            <Field name="name" className="w-full sm:w-44 flex-shrink-0">
              <FieldLabel>Nome</FieldLabel>
              <Input placeholder="Seu nome (opcional)" />
              <FieldError />
            </Field>
            <Field name="email" className="w-full flex-1">
              <FieldLabel>E-mail</FieldLabel>
              <Input placeholder="Seu melhor e-mail" type="email" />
              <FieldError />
            </Field>
          </div>
          <Button loading={status === 'loading'} type="submit" className="w-full">
            Inscrever-se
          </Button>
        </Form>
      )}

      {status === 'error' && (
        <p className="font-ui text-xs text-red-500 text-center mt-4 animate-fade-in">{message}</p>
      )}
    </div>
  );
}
