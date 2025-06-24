# SkyTrack

## Project Description

**SkyTrack** — tracking flight app. Flight list, flight details, filters, add to favorites and so on.

## Как настроить автоматический деплой на GitHub Pages

### 1. Форкните или создайте репозиторий на GitHub

1. Зарегистрируйтесь на [github.com](https://github.com).
2. Создайте новый репозиторий и загрузите туда ваш проект.

### 2. Добавьте workflow для деплоя

1. В корне проекта создайте папку `.github/workflows` (если её нет).
2. Добавьте файл `gh-pages.yml` со следующим содержимым:

    ```yaml
    name: Deploy to GitHub Pages

    on:
        push:
            branches:
                - main

    jobs:
        build-and-deploy:
            runs-on: ubuntu-latest
            steps:
                - name: Checkout repository
                  uses: actions/checkout@v4

                - name: Setup Node.js
                  uses: actions/setup-node@v4
                  with:
                      node-version: 20

                - name: Install dependencies
                  run: npm ci

                - name: Build project
                  run: npm run build

                - name: Deploy to GitHub Pages
                  uses: peaceiris/actions-gh-pages@v4
                  with:
                      github_token: ${{ secrets.GITHUB_TOKEN }}
                      publish_dir: ./dist
    ```

3. Убедитесь, что ваш проект билдится в папку `dist`. Если используется другая папка, замените путь в `publish_dir`.

### 3. Запушьте изменения

```sh
git add .
git commit -m "Добавлен автодеплой на GitHub Pages"
git push
```

### 4. Настройте GitHub Pages

1. Перейдите в настройки репозитория на GitHub.
2. В разделе **Pages** выберите ветку `gh-pages` и папку `/ (root)`.
3. Сохраните настройки.

Через несколько минут сайт будет доступен по адресу:  
`https://<ваш-логин>.github.io/<имя-репозитория>/`

### 5. Готово!

Теперь при каждом пуше в ветку `main` проект будет автоматически собираться и публиковаться на GitHub Pages.

## 🚀 Автоматический деплой на GitHub Pages

### Как это работает

1. При каждом пуше в ветку `main` запускается GitHub Actions workflow.
2. Проект собирается (`npm run build`), и содержимое папки `dist` автоматически деплоится на GitHub Pages.

### Как настроить

1. Убедитесь, что ваш build складывается в папку `dist`. Если используется другая папка, измените путь в workflow.
2. В настройках репозитория на GitHub:
    - Перейдите в **Settings → Pages**.
    - В разделе **Build and deployment** выберите **GitHub Actions** как источник.
3. После пуша в `main` страница будет доступна по адресу:  
   `https://<ваш-логин>.github.io/<имя-репозитория>/`

### Примечания

- Если у вас другой build-скрипт или папка, измените шаги в `.github/workflows/gh-pages.yml`.
- Для приватных репозиториев GitHub Pages работает только на платных тарифах.
