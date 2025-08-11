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

// Создаем папку libs для статических модулей
const libsDir = path.join(distDir, 'libs');
fs.mkdirSync(libsDir, { recursive: true });

// Копируем lit-html модули в простую структуру
const nodeModulesSrc = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesSrc)) {
  const litHtmlSrc = path.join(nodeModulesSrc, 'lit-html');
  const litHtmlDest = path.join(libsDir, 'lit-html');
  
  if (fs.existsSync(litHtmlSrc)) {
    copyDir(litHtmlSrc, litHtmlDest);
  }
}

// Исправляем пути в HTML файлах для GitHub Pages
function fixPathsInHtml(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Заменяем абсолютные пути на относительные
  content = content.replace(/src="\/([^"]+)"/g, 'src="./$1"');
  content = content.replace(/href="\/([^"]+)"/g, 'href="./$1"');
  content = content.replace(/url\(\/([^)]+)\)/g, 'url(./$1)');

  // Исправляем корневые ссылки (главная страница)
  content = content.replace(/href="\/"/g, 'href="./"');
  content = content.replace(/href='\/'/g, "href='./'");

  fs.writeFileSync(filePath, content);
}

// Исправляем пути в JS файлах
function fixPathsInJS(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      fixPathsInJS(fullPath);
    } else if (entry.name.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Исправляем различные варианты путей в JS
      content = content.replace(
        /href\s*:\s*["']\/([^"']+)["']/g,
        'href: "./$1"'
      );
      content = content.replace(
        /href\s*=\s*["']\/([^"']+)["']/g,
        'href="./$1"'
      );
      content = content.replace(/src\s*=\s*["']\/([^"']+)["']/g, 'src="./$1"');
      content = content.replace(
        /window\.location\.href\s*=\s*["']\/([^"']+)["']/g,
        'window.location.href="./$1"'
      );
      content = content.replace(
        /location\.href\s*=\s*["']\/([^"']+)["']/g,
        'location.href="./$1"'
      );

      // Исправляем корневые ссылки в JS
      content = content.replace(/href\s*:\s*["']\/["']/g, 'href: "./"');
      content = content.replace(/href\s*=\s*["']\/["']/g, 'href="./"');
      content = content.replace(
        /window\.location\.href\s*=\s*["']\/["']/g,
        'window.location.href="./"'
      );
      content = content.replace(
        /location\.href\s*=\s*["']\/["']/g,
        'location.href="./"'
      );

      // Исправляем импорты node_modules - используем простую структуру libs
      const relativePath = path.relative(
        path.dirname(fullPath),
        path.join(distDir, 'libs')
      );
      const relativeLibsPath = relativePath.replace(/\\/g, '/'); // Для Windows совместимости

      // Заменяем импорты lit-html на wrapper файлы
      content = content.replace(
        /from\s+(['"])\/node_modules\/lit-html\/lit-html\.js\1/g,
        `from $1${relativeLibsPath}/../lit-html.js$1`
      );
      content = content.replace(
        /from\s+(['"])\/node_modules\/lit-html\/directives\/unsafe-html\.js\1/g,
        `from $1${relativeLibsPath}/../unsafe-html.js$1`
      );
      
      // Общая замена для остальных node_modules
      content = content.replace(
        /from\s+(['"])\/node_modules\//g,
        `from $1${relativeLibsPath}/`
      );
      content = content.replace(
        /import\s+(['"])\/node_modules\//g,
        `import $1${relativeLibsPath}/`
      );

      fs.writeFileSync(fullPath, content);
    }
  }
}

// Исправляем пути в index.html
fixPathsInHtml(path.join(distDir, 'index.html'));

// Исправляем пути во всех JS файлах
fixPathsInJS(path.join(distDir, 'src'));

// Создаем 404.html для GitHub Pages (копия index.html для SPA routing)
fs.copyFileSync(
  path.join(distDir, 'index.html'),
  path.join(distDir, '404.html')
);

// Создаем .nojekyll файл для GitHub Pages
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

// Создаем wrapper файлы для lit-html
const litHtmlWrapper = `export { html, render } from './libs/lit-html/lit-html.js';`;
const unsafeHtmlWrapper = `export { unsafeHTML } from './libs/lit-html/directives/unsafe-html.js';`;

fs.writeFileSync(path.join(distDir, 'lit-html.js'), litHtmlWrapper);
fs.writeFileSync(path.join(distDir, 'unsafe-html.js'), unsafeHtmlWrapper);

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
