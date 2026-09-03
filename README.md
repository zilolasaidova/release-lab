# Учебный портал: тесты и CI/CD

[![CI / CD](https://github.com/zilolasaidova/release-lab/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/zilolasaidova/release-lab/actions/workflows/ci-cd.yml)

Небольшой русскоязычный портал онлайн-курсов для живой демонстрации традиционного тестирования и CI/CD.

- Сайт: <https://zilolasaidova.github.io/release-lab/>
- Pipeline: [GitHub Actions](https://github.com/zilolasaidova/release-lab/actions/workflows/ci-cd.yml)

> [!IMPORTANT]
> Репозиторий намеренно оставлен в **красном учебном состоянии**. На опубликованном сайте есть одна простая ошибка, а unit- и E2E-тесты корректно её обнаруживают. Не исправляйте баг до начала урока.

## Что сломано

На карточке курса «Основы веб-разработки» изначально показано 10 участников. После нажатия кнопки «Записаться на курс» число становится 12, хотя должно стать 11.

Ошибка находится в одной строке файла [`lib/enrollment.ts`](lib/enrollment.ts):

```ts
return currentParticipants + 2;
```

Исправление для зелёной части урока:

```ts
return currentParticipants + 1;
```

## Сценарий урока

### 1. Воспроизвести баг на production

1. Откройте <https://zilolasaidova.github.io/release-lab/>.
2. Найдите курс «Основы веб-разработки» — в нём 10 участников.
3. Нажмите «Записаться на курс».
4. Убедитесь, что стало 12 участников вместо 11.

### 2. Показать падающий unit-тест

```bash
npm ci
npm test
```

Ожидаемый результат: один тест падает с понятным сравнением.

```text
expected 11
received 12
```

Unit-тест проверяет чистую функцию без браузера, поэтому быстро и точно указывает на бизнес-логику.

### 3. Показать падающий E2E-тест

Один раз установите Chromium:

```bash
npx playwright install chromium
```

Затем запустите:

```bash
npm run test:e2e
```

Playwright открывает приложение, нажимает кнопку как пользователь и ожидает текст «11 участников». Фактически страница показывает «12 участников», поэтому сценарий падает.

### 4. Исправить одну строку

Откройте [`lib/enrollment.ts`](lib/enrollment.ts) и замените `+ 2` на `+ 1`.

### 5. Убедиться, что стало зелёным

```bash
npm test
npm run test:e2e
npm run build
```

После исправления unit-тесты, E2E и production-сборка должны завершиться успешно.

### 6. Запустить CI/CD

```bash
git add lib/enrollment.ts
git commit -m "Fix course enrollment counter"
git push
```

Откройте вкладку **Actions**. Pipeline последовательно:

1. проверит форматирование, линтер и TypeScript;
2. параллельно запустит unit-тесты и Playwright E2E;
3. разрешит production-сборку только после успешных тестов;
4. опубликует исправленный артефакт в GitHub Pages.

Обновите страницу после завершения job «Публикация в GitHub Pages»: счётчик будет увеличиваться с 10 до 11.

## Команды проекта

| Команда                 | Назначение              | Исходное состояние |
| ----------------------- | ----------------------- | ------------------ |
| `npm run dev`           | Локальный сервер        | работает           |
| `npm test`              | Unit-тесты Vitest       | намеренно падает   |
| `npm run test:coverage` | Unit-тесты и покрытие   | намеренно падает   |
| `npm run test:e2e`      | Сценарии Playwright     | намеренно падает   |
| `npm run format:check`  | Проверка форматирования | проходит           |
| `npm run lint`          | Статический анализ      | проходит           |
| `npm run typecheck`     | Проверка TypeScript     | проходит           |
| `npm run build`         | Production-сборка       | проходит           |

## Почему production остаётся рабочим при красном CI

История подготовлена в два шага:

1. `Bootstrap course portal on GitHub Pages` — баговое приложение успешно собрано и опубликовано.
2. `Add tests that expose the enrollment bug` — добавлены актуальные unit- и E2E-тесты. Они обнаруживают уже опубликованный баг, поэтому новый pipeline красный и до deployment не доходит.

GitHub Pages продолжает отдавать последний **успешно опубликованный** артефакт. После однострочного исправления следующий зелёный pipeline заменит его исправленной версией.

## Структура

```text
app/                        страница и стили
components/course-portal.tsx интерфейс и обработчик записи
lib/enrollment.ts           бизнес-логика и учебный баг
tests/unit/                 unit-тесты Vitest
e2e/                        E2E-тесты Playwright
.github/workflows/          постоянный CI/CD gate
```
