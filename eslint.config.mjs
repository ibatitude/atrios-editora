import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

// O Next 16 removeu `next lint` e o eslint-config-next passou a exportar flat
// config nativo — por isso não há FlatCompat aqui. O binário do eslint lê este
// arquivo direto (script "lint" do package.json).
const config = [
  { ignores: ['.next/**', 'out/**', '.wrangler/**', 'node_modules/**', 'next-env.d.ts'] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Decisão de arquitetura, não descuido: o alvo é `output: 'export'` servido
      // como assets estáticos, onde a otimização nativa do next/image não roda.
      // As capas já chegam redimensionadas do Unsplash (w=800&q=80).
      '@next/next/no-img-element': 'off',
    },
  },
];

export default config;
