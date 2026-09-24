import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'horizontal';
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'horizontal',
  inverted = false,
}) => {
  const primaryColor = inverted ? '#FFFFFF' : '#176B52';
  const textColor = inverted ? '#FFFFFF' : '#17251F';
  const subtextColor = inverted ? '#A2B8AF' : '#57655E';
  const ringColor = inverted ? 'rgba(255, 255, 255, 0.25)' : 'rgba(23, 107, 82, 0.25)';

  // Pure SVG Emblem: Minimal, Dignified, Institutional
  // NO tribal patterns, NO ethnic motifs, NO textile patterns
  const SealMark = (
    <svg
      width="44"
      height="44"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      aria-hidden="true"
    >
      {/* Outer border ring */}
      <circle cx="50" cy="50" r="46" stroke={primaryColor} strokeWidth="3" />
      <circle cx="50" cy="50" r="41" stroke={ringColor} strokeWidth="1" strokeDasharray="2 2" />

      {/* Inner background fill */}
      <circle cx="50" cy="50" r="39" fill={inverted ? 'rgba(255,255,255,0.06)' : '#EAF4EF'} />

      {/* Mountain crest of Pfutsero highland ridge */}
      <path
        d="M26 62L42 43L50 51L64 34L76 62H26Z"
        fill={primaryColor}
        fillOpacity={inverted ? "0.9" : "0.95"}
      />
      {/* Gentle sun/dawn behind ridge */}
      <circle cx="50" cy="36" r="6" fill={inverted ? "#FFFFFF" : "#176B52"} fillOpacity="0.4" />

      {/* Open pages of cultural knowledge / foundation line */}
      <path
        d="M32 67C38 65 44 65.5 50 67C56 65.5 62 65 68 67"
        stroke={primaryColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line x1="50" y1="67" x2="50" y2="72" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />

      {/* Clean letters: UCS */}
      <text
        x="50"
        y="83"
        textAnchor="middle"
        fill={primaryColor}
        fontSize="8"
        fontFamily="sans-serif"
        fontWeight="700"
        letterSpacing="2.5"
      >
        UCS
      </text>
    </svg>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{SealMark}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 group ${className}`}>
      {SealMark}
      <div className="flex flex-col justify-center">
        <span
          className="text-base sm:text-lg font-bold tracking-tight leading-tight uppercase font-['DM_Sans',sans-serif]"
          style={{ color: textColor }}
        >
          Uzho Cultural Society
        </span>
        <span
          className="text-[11px] sm:text-xs font-medium tracking-wide uppercase font-['Inter',sans-serif]"
          style={{ color: subtextColor }}
        >
          Pfutsero · Nagaland
        </span>
      </div>
    </div>
  );
};
