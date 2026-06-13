const { test, expect } = require('@playwright/test');

test('first testcase', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const sbtbtn = page.locator('#signInBtn');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const cartItems = page.locator('.card-body a');

    await username.fill('rahulshetty');
    await page.locator("[type='password']").fill('Learning@830$3mK2');
    await page.locator('[type=checkbox]').check();
    await sbtbtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await username.fill(' ');
    await username.fill('rahulshettyacademy');
    await sbtbtn.click();

    // console.log(await cartItems.first().textContent());
    // console.log(await cartItems.nth(1).textContent());
    const allItems = await cartItems.allTextContents();
    console.log(allItems);
});

test('second testcase', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
    console.log(await page.title());
});
