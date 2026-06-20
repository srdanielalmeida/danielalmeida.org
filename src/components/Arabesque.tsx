import React from 'react';

interface ArabesqueProps {
  variant?: 'divider' | 'corner' | 'section' | 'small';
  className?: string;
}

export function Arabesque({ variant = 'divider', className = '' }: ArabesqueProps) {
  if (variant === 'divider') {
    return (
      <div className={`flex items-center justify-center py-6 ${className}`}>
        <svg width="280" height="24" viewBox="0 0 280 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left line */}
          <line x1="0" y1="12" x2="100" y2="12" stroke="#8B7355" strokeWidth="0.5" strokeOpacity="0.5" />
          {/* Center ornament */}
          <g transform="translate(140, 12)">
            {/* Diamond */}
            <path d="M0 -8 L6 0 L0 8 L-6 0 Z" fill="none" stroke="#D4A574" strokeWidth="1" />
            {/* Inner diamond */}
            <path d="M0 -4 L3 0 L0 4 L-3 0 Z" fill="#D4A574" fillOpacity="0.3" />
            {/* Cross details */}
            <line x1="-10" y1="0" x2="-6" y2="0" stroke="#8B7355" strokeWidth="0.75" />
            <line x1="6" y1="0" x2="10" y2="0" stroke="#8B7355" strokeWidth="0.75" />
            <line x1="0" y1="-12" x2="0" y2="-8" stroke="#8B7355" strokeWidth="0.75" />
            <line x1="0" y1="8" x2="0" y2="12" stroke="#8B7355" strokeWidth="0.75" />
            {/* Corner dots */}
            <circle cx="-10" cy="0" r="1" fill="#D4A574" />
            <circle cx="10" cy="0" r="1" fill="#D4A574" />
            {/* Small leaf shapes */}
            <path d="M-14 -3 Q-12 0 -14 3" stroke="#8B7355" strokeWidth="0.5" fill="none" />
            <path d="M14 -3 Q12 0 14 3" stroke="#8B7355" strokeWidth="0.5" fill="none" />
          </g>
          {/* Right line */}
          <line x1="180" y1="12" x2="280" y2="12" stroke="#8B7355" strokeWidth="0.5" strokeOpacity="0.5" />
        </svg>
      </div>
    );
  }

  if (variant === 'section') {
    return (
      <div className={`flex items-center justify-center py-10 ${className}`}>
        <svg width="400" height="32" viewBox="0 0 400 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left ornamental line */}
          <line x1="0" y1="16" x2="130" y2="16" stroke="#8B7355" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="40" y1="14" x2="130" y2="14" stroke="#8B7355" strokeWidth="0.25" strokeOpacity="0.2" />
          <line x1="40" y1="18" x2="130" y2="18" stroke="#8B7355" strokeWidth="0.25" strokeOpacity="0.2" />
          
          {/* Center ornament - larger */}
          <g transform="translate(200, 16)">
            {/* Outer diamond */}
            <path d="M0 -12 L10 0 L0 12 L-10 0 Z" fill="none" stroke="#D4A574" strokeWidth="1" />
            {/* Middle diamond */}
            <path d="M0 -7 L5.5 0 L0 7 L-5.5 0 Z" fill="none" stroke="#8B7355" strokeWidth="0.75" />
            {/* Inner fill */}
            <path d="M0 -3 L2.5 0 L0 3 L-2.5 0 Z" fill="#D4A574" fillOpacity="0.4" />
            {/* Decorative extensions */}
            <path d="M-15 0 L-10 0" stroke="#D4A574" strokeWidth="0.75" />
            <path d="M10 0 L15 0" stroke="#D4A574" strokeWidth="0.75" />
            <circle cx="-16" cy="0" r="1.5" fill="none" stroke="#8B7355" strokeWidth="0.5" />
            <circle cx="16" cy="0" r="1.5" fill="none" stroke="#8B7355" strokeWidth="0.5" />
            <circle cx="-16" cy="0" r="0.5" fill="#D4A574" />
            <circle cx="16" cy="0" r="0.5" fill="#D4A574" />
            {/* Arc details */}
            <path d="M-20 -4 Q-16 0 -20 4" stroke="#8B7355" strokeWidth="0.5" fill="none" strokeOpacity="0.6" />
            <path d="M20 -4 Q16 0 20 4" stroke="#8B7355" strokeWidth="0.5" fill="none" strokeOpacity="0.6" />
          </g>

          {/* Right ornamental line */}
          <line x1="270" y1="16" x2="400" y2="16" stroke="#8B7355" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="270" y1="14" x2="360" y2="14" stroke="#8B7355" strokeWidth="0.25" strokeOpacity="0.2" />
          <line x1="270" y1="18" x2="360" y2="18" stroke="#8B7355" strokeWidth="0.25" strokeOpacity="0.2" />
        </svg>
      </div>
    );
  }

  if (variant === 'small') {
    return (
      <span className={`inline-block mx-2 ${className}`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1 L12 8 L8 15 L4 8 Z" fill="none" stroke="#D4A574" strokeWidth="0.75" />
          <path d="M8 4 L10 8 L8 12 L6 8 Z" fill="#D4A574" fillOpacity="0.3" />
        </svg>
      </span>
    );
  }

  // Corner variant
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0 0 L12 0 Q8 4 8 8 L8 12 Q4 8 0 12 L0 0 Z" 
            fill="none" stroke="#D4A574" strokeWidth="0.75" strokeOpacity="0.5" />
      <path d="M0 0 L6 0 Q4 2 4 4 L4 6 Q2 4 0 6 L0 0 Z" 
            fill="#D4A574" fillOpacity="0.1" />
    </svg>
  );
}
