import { test, expect } from '@playwright/test';

test('find the product', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const email = 'rg112@gmail.com';
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const products = page.locator('.card-body');
    await username.fill('rg112@gmail.com');
    await password.fill('Rg@000000');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    //clicking the add to cart button for iphone 13 pro
    await page.locator('.card-body b').first().waitFor();

    await page
        .locator('.card-body')
        .filter({ hasText: 'ZARA COAT 3' })
        .getByRole('button', { name: 'Add to Cart' })
        .click();
    //clicking the cart button
    await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();
    await page.locator('div li').first().waitFor();
    await page.getByRole('button', { name: 'Checkout' }).click();

    //personal info
    await page.getByPlaceholder('Country').pressSequentially('india', { delay: 150 });
    await page.getByRole('button', { name: 'India' }).nth(1).click();
    await page.pause();
    await page.getByText('Place Order ').click();
    expect(await page.getByText('Thankyou for the order.')).toBeVisible();

    const orderid = await page.locator('.em-spacer-1 .ng-star-inserted ').first().textContent();
    console.log(orderid);
    await page.pause();
    await page.locator("button[routerlink*='myorders']").click();
    expect(await page.locator('h1')).toHaveText('Your Orders');
    await page.pause();

    await page.locator('tbody').waitFor();
    await page.pause();
    const rows = await page.locator('tbody tr');

    for (let i = 0; i < (await rows.count()); ++i) {
        const rowsOrderid = await rows.nth(i).locator('th').textContent();

        if (orderid.includes(rowsOrderid)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    //await page.pause();
});
