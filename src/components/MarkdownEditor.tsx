'use client';

import React, { useRef } from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export function MarkdownEditor({ value, onChange, id }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormat = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const before = value.substring(0, start);
    const after = value.substring(end);

    const newText = before + prefix + (selectedText || (suffix ? 'texto' : '')) + suffix + after;
    
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const selectionStart = start + prefix.length;
      const selectionEnd = suffix 
        ? selectionStart + (selectedText ? selectedText.length : 5) 
        : selectionStart + selectedText.length;
      textarea.setSelectionRange(selectionStart, selectionEnd);
    }, 0);
  };

  const toolbarButtons = [
    { label: 'H2', title: 'Título 2', onClick: () => insertFormat('## ') },
    { label: 'H3', title: 'Título 3', onClick: () => insertFormat('### ') },
    { label: 'B', title: 'Negrito', onClick: () => insertFormat('**', '**'), className: 'font-bold' },
    { label: 'I', title: 'Itálico', onClick: () => insertFormat('_', '_'), className: 'italic font-serif' },
    { label: '"', title: 'Citação', onClick: () => insertFormat('\n> ', '\n') },
    { label: '•', title: 'Lista', onClick: () => insertFormat('\n- ') },
    { label: '🔗', title: 'Link', onClick: () => insertFormat('[', '](url)') },
  ];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:border-navy/50 transition-colors bg-white">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
        {toolbarButtons.map((btn, i) => (
          <button
            key={i}
            type="button"
            title={btn.title}
            onClick={btn.onClick}
            className={`w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 font-ui text-sm transition-colors ${btn.className || ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      
      <textarea
        id={id}
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full p-4 min-h-[400px] outline-none font-mono text-sm resize-y text-gray-800"
        placeholder="Escreva seu artigo em Markdown aqui..."
      />
    </div>
  );
}
