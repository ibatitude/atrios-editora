/**
 * Ajustes do `out/` para hospedagem estática genérica.
 *
 * `.nojekyll`: o GitHub Pages roda Jekyll por padrão, e Jekyll ignora todo
 * arquivo ou pasta que comece com underscore — ou seja, `_next/` inteiro
 * sumiria e o site iria ao ar sem CSS e sem JS. O arquivo vazio desliga isso.
 * É inofensivo nos outros hosts, então roda sempre.
 */
import { writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const OUT = 'out';

try {
  await stat(OUT);
} catch {
  console.error(`[static-host] "${OUT}/" não existe — rode o build antes.`);
  process.exit(0);
}

await writeFile(join(OUT, '.nojekyll'), '');
console.log('[static-host] .nojekyll criado');
