const fs = require('fs');
const path = require('path');

/**
 * Скрипт для сборки проекта для GitHub Pages
 * Копирует файлы из папки public и src в dist с правильными настройками
 */

const buildDir = 'dist';
const publicDir = 'public';
const srcDir = 'src';

// Очищаем директорию dist
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
}

// Создаем директорию dist
fs.mkdirSync(buildDir, { recursive: true });

// Функция для копирования директории
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Источник не найден: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Функция для копирования файла
function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Скопирован: ${src} -> ${dest}`);
  } else {
    console.warn(`Файл не найден: ${src}`);
  }
}

try {
  console.log('🚀 Начинаем сборку для GitHub Pages...');

  // Копируем содержимое public директории
  console.log('📁 Копируем файлы из public...');
  copyDir(publicDir, buildDir);

  // Копируем src директорию
  console.log('📁 Копируем src директорию...');
  copyDir(srcDir, path.join(buildDir, 'src'));

  // Копируем 404.html в корень
  console.log('📄 Копируем 404.html...');
  copyFile('404.html', path.join(buildDir, '404.html'));

  // Копируем README.md
  console.log('📄 Копируем README.md...');
  copyFile('README.md', path.join(buildDir, 'README.md'));

  // Создаем .nojekyll файл для GitHub Pages
  console.log('📄 Создаем .nojekyll...');
  fs.writeFileSync(path.join(buildDir, '.nojekyll'), '');

  console.log('✅ Сборка завершена успешно!');
  console.log(`📦 Результат сборки находится в директории: ${buildDir}`);
  console.log('🌐 Готово для деплоя на GitHub Pages');
} catch (error) {
  console.error('❌ Ошибка при сборке:', error);
  process.exit(1);
}
