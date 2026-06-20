import React from 'react';
import { Arabesque } from './Arabesque';

interface ArticleContentProps {
  content: string;
}

/**
 * Parser de conteúdo bruto → HTML formatado
 * 
 * Regras:
 * - Linhas começadas com "#" → <h2>
 * - Linhas começadas com ">" → <blockquote>
 * - Linhas começadas com "-" → <li> (agrupadas em <ul>)
 * - Duas quebras de linha → divisor arabesco
 * - Texto comum → <p>
 */
export function ArticleContent({ content }: ArticleContentProps) {
  const blocks = parseContent(content);

  return (
    <div className="article-content">
      {blocks.map((block, i) => (
        <React.Fragment key={i}>
          {renderBlock(block)}
        </React.Fragment>
      ))}
    </div>
  );
}

type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'divider' };

function parseContent(content: string): Block[] {
  const blocks: Block[] = [];
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line - check for double break (divider)
    if (line.trim() === '') {
      // Check if next line is also empty (double break)
      if (i + 1 < lines.length && lines[i + 1].trim() === '') {
        blocks.push({ type: 'divider' });
        // Skip all consecutive empty lines
        while (i < lines.length && lines[i].trim() === '') i++;
        continue;
      }
      i++;
      continue;
    }

    // Heading: starts with #
    if (line.trim().startsWith('#')) {
      blocks.push({
        type: 'heading',
        text: line.trim().replace(/^#+\s*/, ''),
      });
      i++;
      continue;
    }

    // Blockquote: starts with >
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      blocks.push({
        type: 'quote',
        text: quoteLines.join(' '),
      });
      continue;
    }

    // List: starts with -
    if (line.trim().startsWith('-')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('-')) {
        items.push(lines[i].trim().replace(/^-\s*/, ''));
        i++;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    // Regular paragraph - collect consecutive non-special lines
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('-')
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }
    if (paragraphLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        text: paragraphLines.join(' '),
      });
    }
  }

  return blocks;
}

function renderBlock(block: Block): React.ReactNode {
  switch (block.type) {
    case 'paragraph':
      return <p>{block.text}</p>;
    case 'heading':
      return <h2>{block.text}</h2>;
    case 'quote':
      return <blockquote>{block.text}</blockquote>;
    case 'list':
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'divider':
      return <Arabesque variant="divider" />;
    default:
      return null;
  }
}
