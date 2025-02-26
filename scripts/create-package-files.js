import fs from 'fs';
import path from 'path';

// Crie o diretório se não existir
const cjsDir = path.resolve('./dist/cjs');
if (!fs.existsSync(cjsDir)) {
  fs.mkdirSync(cjsDir, { recursive: true });
}

// Criar package.json para CJS
fs.writeFileSync(
  path.join(cjsDir, 'package.json'),
  JSON.stringify({ type: 'commonjs' }, null, 2)
);

// Criar package.json para o diretório raiz dist (ESM)
fs.writeFileSync(
  path.join('./dist', 'package.json'),
  JSON.stringify({ type: 'module' }, null, 2)
);

console.log('Arquivos package.json criados com sucesso.');