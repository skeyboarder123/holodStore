# Интернет-магазин климатической техники

> SPA приложение на Vanilla JavaScript с поддержкой GitHub Pages

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск локального сервера для разработки
npm start
```

Сервер будет доступен на `http://localhost:3000`

### Деплой на GitHub Pages

```bash
# Создание статической сборки
npm run build

# Автоматический деплой через GitHub Actions
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## 📁 Структура проекта

```
InternetStore/
├── public/          # Статические файлы
├── src/            # Исходный код
│   ├── api/        # API запросы
│   ├── scripts/    # Основная логика
│   └── styles/     # Стили CSS
├── server.js       # Express сервер для разработки
├── build.js        # Скрипт сборки для GitHub Pages
└── dist/           # Собранные файлы (создается автоматически)
```

## 🛠 Технологии

- **Frontend**: Vanilla JavaScript, CSS3, HTML5
- **Build**: Node.js, Express.js (только для разработки)
- **Deploy**: GitHub Pages + GitHub Actions
- **API**: Внешний REST API

## 📋 Возможности

- ✅ SPA маршрутизация
- ✅ Каталог товаров
- ✅ Корзина покупок
- ✅ Поиск товаров
- ✅ Обратные звонки
- ✅ Адаптивный дизайн
- ✅ Оптимизация производительности

## 🌐 Деплой

Проект автоматически деплоится на GitHub Pages при каждом push в ветку `main`.

**URL сайта**: `https://username.github.io/repository-name/`

Подробную инструкцию по деплою смотрите в [DEPLOY.md](./DEPLOY.md)

## 🔧 API

Приложение использует внешний API сервер для получения данных о товарах и обработки заказов.

Конфигурация API находится в `src/api/routes.js`

## 📝 Лицензия

Этот проект лицензирован под MIT License.
