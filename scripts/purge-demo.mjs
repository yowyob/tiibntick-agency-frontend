import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === '.next' || ent.name === 'scripts') continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

function purge(content) {
  let s = content;
  s = s.replace(/^import \{ DEMO_MODE[^}]*\} from '@\/lib\/config';\n/gm, '');
  s = s.replace(/^import \{ DEMO_MODE,[^\n]+\n/gm, '');
  s = s.replace(/, DEMO_MODE/g, '');
  s = s.replace(/DEMO_MODE, /g, '');
  s = s.replace(/^import [^;]*mock-data[^;]*;\n/gm, '');
  // single-line if (DEMO_MODE) return ...;
  s = s.replace(/^\s*if \(DEMO_MODE\) return[^;]*;\n/gm, '');
  s = s.replace(/^\s*if \(DEMO_MODE\) return;\n/gm, '');
  s = s.replace(/^\s*if \(DEMO_MODE \|\| typeof window[^)]*\) return null;\n/gm, '');
  s = s.replace(/^\s*if \(DEMO_MODE\) \{\n[\s\S]*?\n\s*\}\n/gm, (block) => {
    // keep empty blocks removal only for simple demo blocks - skip multiline for safety
    return block.includes('mock') ? '' : block;
  });
  return s;
}

for (const file of walk(root)) {
  const orig = fs.readFileSync(file, 'utf8');
  if (!orig.includes('DEMO_MODE') && !orig.includes('mock-data')) continue;
  const next = purge(orig);
  if (next !== orig) {
    fs.writeFileSync(file, next);
    console.log('purged', path.relative(root, file));
  }
}
