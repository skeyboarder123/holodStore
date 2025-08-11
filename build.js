const fs = require('fs');
const path = require('path');

// Создаем папку dist для статической сборки
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir);

// Копируем public в dist
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Копируем все файлы из public
copyDir(path.join(__dirname, 'public'), distDir);

// Копируем src в dist/src
copyDir(path.join(__dirname, 'src'), path.join(distDir, 'src'));

// Копируем node_modules (только нужные части)
const nodeModulesSrc = path.join(__dirname, 'node_modules');
const nodeModulesDest = path.join(distDir, 'node_modules');

if (fs.existsSync(nodeModulesSrc)) {
  fs.mkdirSync(nodeModulesDest, { recursive: true });

  // Копируем только lit-html (если используется)
  const litHtmlSrc = path.join(nodeModulesSrc, 'lit-html');
  const litHtmlDest = path.join(nodeModulesDest, 'lit-html');

  if (fs.existsSync(litHtmlSrc)) {
    copyDir(litHtmlSrc, litHtmlDest);
  }
}

// Создаем 404.html для GitHub Pages (копия index.html для SPA routing)
fs.copyFileSync(
  path.join(distDir, 'index.html'),
  path.join(distDir, '404.html')
);

// Создаем .nojekyll файл для GitHub Pages
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

// Создаем _config.yml для GitHub Pages (опционально)
const githubPagesConfig = `# GitHub Pages configuration
include:
  - "_*"
  - ".nojekyll"

plugins:
  - jekyll-redirect-from

# Кастомная 404 страница
permalink: pretty
`;

fs.writeFileSync(path.join(distDir, '_config.yml'), githubPagesConfig);

console.log('Статическая сборка создана в папке dist/');
console.log(
  'Файлы подготовлены для GitHub Pages с поддержкой SPA маршрутизации'
);
console.log('Готово для деплоя на GitHub Pages!');
