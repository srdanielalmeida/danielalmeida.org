import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gera slug a partir de um título
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calcula tempo de leitura em minutos
 */
export function calculateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Gera excerpt dos primeiros 150 caracteres
 */
export function generateExcerpt(content: string, maxLength = 150): string {
  // Remove formatação (#, >, -)
  const cleanContent = content
    .split('\n')
    .map(line => line.replace(/^[#>-]\s*/, ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  if (cleanContent.length <= maxLength) return cleanContent;
  
  return cleanContent.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

/**
 * Formata data para exibição em pt-BR
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Formata data curta para tabelas
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Gera classe CSS com delay para animação staggered
 */
export function staggerDelay(index: number, baseMs = 100): string {
  return `${index * baseMs}ms`;
}
