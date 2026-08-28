/**
 * Workaround para o static export do Next 16.
 *
 * O runtime pede os payloads de prefetch com os segmentos separados por PONTO
 * (`/catalogo/__next.catalogo.__PAGE__.txt`), mas `output: 'export'` grava esses
 * mesmos payloads como diretórios aninhados (`/catalogo/__next.catalogo/__PAGE__.txt`).
 * Num host estático não há quem traduza um no outro: todo <Link> visível dispara
 * um 404 e o prefetch deixa de funcionar — a navegação passa a pagar latência cheia.
 *
 * Este script copia cada payload para o nome achatado que o runtime realmente pede.
 * Copia em vez de mover para não quebrar quem espere o layout original.
 *
 * Verificação: depois do build, nenhum 404 de `__next.*` no console ao navegar.
 */
import { readdir, copyFile, stat } from 'node:fs/promises';
import { join, sep } from 'node:path';

const OUT = 'out';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

try {
  await stat(OUT);
} catch {
  console.error(`[flatten-rsc] "${OUT}/" não existe — rode o build antes.`);
  process.exit(0);
}

const files = await walk(OUT);
let copied = 0;

for (const file of files) {
  const parts = file.split(sep);
  // Localiza o primeiro segmento de DIRETÓRIO que começa com "__next."
  const i = parts.findIndex((p, idx) => idx < parts.length - 1 && p.startsWith('__next.'));
  if (i === -1) continue;

  const base = parts.slice(0, i).join(sep);
  const flattened = parts.slice(i).join('.');
  const target = join(base, flattened);
  if (target === file) continue;

  await copyFile(file, target);
  copied++;
}

console.log(`[flatten-rsc] ${copied} payload(s) de prefetch achatado(s) em ${OUT}/`);
