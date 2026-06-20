import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const dimensions = {
    sm: 24,
    md: 40,
    lg: 56,
  };

  const dim = dimensions[size];
  const strokeWidth = size === 'sm' ? 2 : size === 'md' ? 2.5 : 3;
  const radius = (dim - strokeWidth * 2) / 2;

  return (
    <div className={`flex items-center justify-center ${className}`} role="status">
      <svg
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin-slow"
      >
        {/* Background circle */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          stroke="#EDE8E0"
          strokeWidth={strokeWidth}
        />
        {/* Animated arc */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          stroke="#0F3460"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${radius * Math.PI * 0.75} ${radius * Math.PI * 1.25}`}
        />
        {/* Inner accent dot */}
        <circle
          cx={dim / 2}
          cy={strokeWidth + 1}
          r={strokeWidth * 0.6}
          fill="#D4A574"
        />
      </svg>
      <span className="sr-only">Carregando...</span>
    </div>
  );
}
