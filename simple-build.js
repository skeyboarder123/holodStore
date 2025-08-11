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

// Простая функция замены путей
function fixPaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Заменяем абсолютные пути на относительные
  content = content.replace(/src="\/([^"]+)"/g, 'src="./$1"');
  content = content.replace(/href="\/([^"]+)"/g, 'href="./$1"');
  content = content.replace(/href="\/"/g, 'href="./"');
  
  fs.writeFileSync(filePath, content);
}

// Копируем все как есть
copyDir(path.join(__dirname, 'public'), distDir);
copyDir(path.join(__dirname, 'src'), path.join(distDir, 'src'));

// Исправляем только HTML
fixPaths(path.join(distDir, 'index.html'));

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
