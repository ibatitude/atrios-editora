import React from 'react';

/**
 * Marca da Átrios, a partir da arte oficial (public/assets/logo-original.svg).
 *
 * O SVG oficial só existe na versão vertical. A horizontal foi remontada movendo
 * o símbolo de cima para a esquerda, sem redesenhar nada e preservando a relação
 * entre "ÁTRIOS" e "EDITORA".
 *
 * O "A" do símbolo é vazado, não pintado — mostra o fundo através dele. Por isso
 * a mesma silhueta serve nos dois temas, mudando só a cor do traço.
 */

type Variant = 'horizontal' | 'vertical' | 'symbol-only';

interface LogoProps {
  variant?: Variant;
  /** 'dark' = marca escura sobre fundo claro. 'light' = marca clara sobre fundo escuro. */
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/** Proporções reais das artes, para reservar o espaço e não causar CLS. */
const RATIO: Record<Variant, { w: number; h: number }> = {
  horizontal: { w: 1440, h: 382 },
  vertical: { w: 1038, h: 792 },
  'symbol-only': { w: 289, h: 361 },
};

/** Alturas em px. A horizontal não desce de 28: abaixo disso "EDITORA" fica ilegível. */
const HEIGHT: Record<Variant, Record<'sm' | 'md' | 'lg', number>> = {
  horizontal: { sm: 30, md: 40, lg: 56 },
  vertical: { sm: 56, md: 80, lg: 112 },
  'symbol-only': { sm: 28, md: 40, lg: 56 },
};

const FILE: Record<Variant, string> = {
  horizontal: 'logo-horizontal',
  vertical: 'logo-vertical',
  'symbol-only': 'simbolo',
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  className = '',
  size = 'md',
}) => {
  const h = HEIGHT[variant][size];
  const w = Math.round((RATIO[variant].w / RATIO[variant].h) * h);

  return (
    <img
      src={`/assets/${FILE[variant]}-${theme}.svg`}
      alt="Átrios Editora"
      width={w}
      height={h}
      className={`block w-auto transition-all duration-300 ${className}`}
      style={{ height: h }}
    />
  );
};
