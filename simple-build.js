const fs = require('fs');
const path = require('path');

// Простой скрипт сборки без сложностей
const distDir = path.join(__dirname, 'dist');

// Удаляем старую сборку
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir);

// Простая функция копирования
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

// Простая функция замены путей только для HTML
function fixPathsInHtml(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Заменяем абсолютные пути на относительные только в HTML
  content = content.replace(/src="\/([^"]+)"/g, 'src="./$1"');
  content = content.replace(/href="\/([^"]+)"/g, 'href="./$1"');
  content = content.replace(/href="\/"/g, 'href="./"');
  
  fs.writeFileSync(filePath, content);
}

// Функция для обработки JS файлов - только исправляем node_modules пути
function fixPathsInJS(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Заменяем только пути к node_modules на CDN
  content = content.replace(
    /from\s+['"]\/node_modules\/lit-html\/lit-html\.js['"]/g,
    `from 'https://cdn.skypack.dev/lit-html'`
  );
  content = content.replace(
    /from\s+['"]\/node_modules\/lit-html\/directives\/unsafe-html\.js['"]/g,
    `from 'https://cdn.skypack.dev/lit-html/directives/unsafe-html.js'`
  );
  
  fs.writeFileSync(filePath, content);
}

// Копируем все как есть
copyDir(path.join(__dirname, 'public'), distDir);
copyDir(path.join(__dirname, 'src'), path.join(distDir, 'src'));

// Исправляем HTML
fixPathsInHtml(path.join(distDir, 'index.html'));

// Исправляем JS файлы - заменяем lit-html на CDN
function processJSFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      processJSFiles(fullPath);
    } else if (entry.name.endsWith('.js')) {
      fixPathsInJS(fullPath);
    }
  }
}

processJSFiles(path.join(distDir, 'src'));

// Создаем 404.html
fs.copyFileSync(
  path.join(distDir, 'index.html'),
  path.join(distDir, '404.html')
);

// Создаем .nojekyll
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

console.log('✅ Простая сборка готова!');
console.log('📁 Файлы скопированы без изменений');
console.log('🚀 Готово для GitHub Pages!');
