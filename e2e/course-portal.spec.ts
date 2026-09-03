import { expect, test } from '@playwright/test';

test('каталог показывает доступные курсы', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Выберите курс и начните учиться' }),
  ).toBeVisible();
  await expect(page.getByRole('article')).toHaveCount(3);
  await expect(
    page.getByRole('heading', { name: 'Основы веб-разработки' }),
  ).toBeVisible();
});

test('запись увеличивает количество участников на одного', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('participant-count')).toHaveText(
    '10 участников',
  );
  await page.getByRole('button', { name: 'Записаться на курс' }).click();

  await expect(
    page.getByRole('button', { name: 'Вы записаны' }),
  ).toBeDisabled();
  await expect(page.getByTestId('participant-count')).toHaveText(
    '11 участников',
  );
});
