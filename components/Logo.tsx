import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'symbol-only';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  className = '',
  size = 'md'
}) => {
  // theme 'dark' means dark text/symbol on light bg
  // theme 'light' means white/gold text/symbol on dark bg
  const isLightMode = theme === 'light'; // white on dark

  const symbolBg = isLightMode ? '#ffffff' : '#0F2C2C';
  const symbolFill = isLightMode ? '#0F2C2C' : '#ffffff';
  const textColor = isLightMode ? 'text-[#FDFBF7]' : 'text-[#0F2C2C]';
  const subTextColor = isLightMode ? 'text-[#D9D1C5]' : 'text-[#0F2C2C]/60';

  const symbolSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const titleSizes = {
    sm: 'text-base tracking-tight',
    md: 'text-xl tracking-tight',
    lg: 'text-3xl tracking-tight'
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.2em]',
    lg: 'text-xs tracking-[0.25em]'
  };

  const symbol = (
    <div
      className={`${symbolSizes[size]} flex-shrink-0 flex items-center justify-center rounded-xs relative overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-xs`}
      style={{ backgroundColor: symbolBg }}
    >
      <span className="font-serif text-2xl font-bold" style={{ color: symbolFill }}>
        Á
      </span>
    </div>
  );

  if (variant === 'symbol-only') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {symbol}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center text-center group select-none ${className}`}>
        {symbol}
        <div className="mt-2.5 flex flex-col items-center">
          <div className="flex items-start">
            <span className={`font-serif font-bold uppercase leading-none ${titleSizes[size]} ${textColor}`}>
              ÁTRIOS
            </span>
            <span className={`text-[8px] font-sans ml-0.5 mt-0.5 opacity-80 ${subTextColor}`}>TM</span>
          </div>
          <span className={`font-sans uppercase font-medium mt-1 ${subtitleSizes[size]} ${subTextColor}`}>
            E D I T O R A
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {symbol}
      <div className="flex flex-col">
        <div className="flex items-start">
          <span className={`font-serif font-bold uppercase leading-tight ${titleSizes[size]} ${textColor}`}>
            ÁTRIOS
          </span>
          <span className={`text-[9px] font-sans ml-0.5 mt-0.5 opacity-80 ${subTextColor}`}>TM</span>
        </div>
        <span className={`font-sans uppercase font-semibold -mt-0.5 ${subtitleSizes[size]} ${subTextColor}`}>
          E D I T O R A
        </span>
      </div>
    </div>
  );
};
