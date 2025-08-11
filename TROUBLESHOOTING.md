# Решение проблем с GitHub Pages

## Ошибка "Permission denied" в GitHub Actions

### Проблема:

```
remote: Permission to username/repository.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/username/repository.git/': The requested URL returned error: 403
Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

### Решение:

#### Шаг 1: Настройка прав доступа для Actions

1. Перейдите в ваш репозиторий на GitHub
2. Откройте **Settings** (Настройки)
3. В левом меню выберите **Actions** → **General**
4. В разделе **"Workflow permissions"** выберите:
   - ✅ **"Read and write permissions"**
   - ✅ **"Allow GitHub Actions to create and approve pull requests"**
5. Нажмите **"Save"**

#### Шаг 2: Настройка GitHub Pages

1. В том же разделе **Settings**, выберите **"Pages"**
2. В разделе **"Source"** выберите **"GitHub Actions"**
3. Нажмите **"Save"**

#### Шаг 3: Перезапуск Actions

1. Перейдите во вкладку **"Actions"** в вашем репозитории
2. Найдите последний неудачный запуск
3. Нажмите **"Re-run all jobs"**

### Альтернативное решение (если проблема остается):

Если проблема не решается, попробуйте использовать Personal Access Token:

1. Создайте Personal Access Token:

   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Нажмите "Generate new token (classic)"
   - Выберите область действия: `repo`, `workflow`
   - Скопируйте токен

2. Добавьте токен в секреты репозитория:

   - Репозиторий → Settings → Secrets and variables → Actions
   - Нажмите "New repository secret"
   - Name: `PERSONAL_TOKEN`
   - Value: ваш токен

3. Обновите workflow файл (замените github_token на ваш токен):
   ```yaml
   - name: Deploy to GitHub Pages
     uses: peaceiris/actions-gh-pages@v3
     with:
       personal_token: ${{ secrets.PERSONAL_TOKEN }}
       publish_dir: ./dist
   ```

## Другие частые проблемы:

### 1. Deprecated Actions версии

**Проблема:**

```
Error: This request has been automatically failed because it uses a deprecated version of `actions/upload-artifact: v3`
```

**Решение:** Уже исправлено в актуальной версии workflow файла. Используются последние версии:

- `actions/configure-pages@v4`
- `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v4`

### 2. Ошибки сборки (Build failed)

Проверьте логи в Actions:

- Убедитесь, что все зависимости установлены
- Проверьте, что команда `npm run build` работает локально

### 2. 404 ошибки на сайте

- Убедитесь, что файл `.nojekyll` присутствует в папке `dist/`
- Проверьте, что `404.html` создается при сборке

### 3. Сайт загружается без стилей и скриптов

**Проблема:** HTML загружается, но CSS и JavaScript не работают.

**Причина:** Абсолютные пути (начинающиеся с `/`) не работают на GitHub Pages в подпапке.

**Решение:** Уже исправлено в актуальной версии скрипта сборки. При сборке все пути автоматически конвертируются в относительные (с `./`).

**Как работает:**

- `/src/styles/styles.css` → `./src/styles/styles.css`
- `/svgs/logo.svg` → `./svgs/logo.svg`
- Исправление происходит в HTML и JS файлах

### 4. Проблемы с API и Mixed Content

**Проблема:** Контент с API сервера не загружается, логотип ведет на корневой домен.

**Причины:**

- Mixed Content: GitHub Pages использует HTTPS, а API сервер может быть на HTTP
- Неправильные абсолютные пути в навигации
- Проблемы с импортами node_modules

**Решение:** Уже исправлено в актуальной версии:

- ✅ Автоматический fallback HTTPS → HTTP для API
- ✅ Исправление корневых ссылок (`href="/"` → `href="./"`)
- ✅ Исправление импортов (`/node_modules/` → `./node_modules/`)
- ✅ Fallback данные на случай недоступности API

### 5. 404 ошибки для lit-html модулей

**Проблема:**

```
lit-html.js GET 404 script home.js:4
unsafe-html.js GET 404 script product.js:3
```

**Причина:** Неправильные относительные пути к `node_modules` для файлов на разной глубине вложенности.

**Решение:** Уже исправлено в актуальной версии скрипта сборки:

- ✅ Автоматический расчет относительных путей в зависимости от глубины файла
- ✅ `src/scripts/Pages/product.js` использует `../../../node_modules/`
- ✅ `src/scripts/main.js` использует `./node_modules/`

### 6. Синтаксические ошибки в импортах

**Проблема:**

```
Uncaught SyntaxError: Invalid or unexpected token (at home.js:4:30)
import { html, render } from "./node_modules/lit-html/lit-html.js';
```

**Причина:** Смешанные кавычки в import statements (начинается `"`, заканчивается `'`).

**Решение:** Уже исправлено в актуальной версии скрипта сборки:

- ✅ Сохранение оригинального типа кавычек при замене путей
- ✅ Использование групп в регулярных выражениях для корректной замены

### 7. CORS ошибки

Если API запросы не работают:

- Убедитесь, что ваш API сервер разрешает запросы с домена GitHub Pages
- Добавьте домен `https://username.github.io` в CORS настройки вашего API

### 4. Проблемы с кешированием

Если изменения не отображаются:

- Очистите кеш браузера (Ctrl+F5)
- Подождите несколько минут - GitHub Pages может кешировать контент

## Полезные ссылки:

- [GitHub Pages документация](https://docs.github.com/en/pages)
- [GitHub Actions документация](https://docs.github.com/en/actions)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-jekyll-build-errors-for-github-pages-sites)
