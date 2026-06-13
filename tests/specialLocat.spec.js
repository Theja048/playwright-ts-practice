import { test } from '@playwright/test';

test('special locators', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    await page.getByPlaceholder('password').fill('abc123');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByLabel('Employed').check();
    await page.getByRole('button', { name: 'submit' }).click();
    await page.getByText('Success! The Form has been submitted uccessfully!.').isVisible();
    await page.getByRole('link', { name: 'shop' }).click();
    await page
        .locator('app-card')
        .filter({ hasText: 'Blackberry' })
        .getByRole('button', { name: 'Add' })
        .click();
});
