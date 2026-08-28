import type { NextConfig } from "next";

// Subpasta do GitHub Pages (ex.: "/atrios-editora"). Vazio = servido na raiz,
// que é o caso de domínio próprio ou Cloudflare. Vem do ambiente para que o
// mesmo código gere os dois destinos sem edição.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Site 100% pré-renderizado: `next build` emite HTML puro em ./out, servível
  // como assets estáticos. Sem Server Actions, Route Handlers dinâmicos ou ISR.
  output: "export",
  basePath,
  // O GitHub Pages serve /catalogo/ como diretório; sem isso, links internos
  // dependem de o host resolver /catalogo -> catalogo.html, o que o Pages não faz.
  trailingSlash: true,
};

export default nextConfig;
