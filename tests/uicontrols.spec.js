import { expect, test } from '@playwright/test';
import { X509Certificate } from 'node:crypto';
import { promises } from 'node:dns';

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
test('UI controls', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinkLink = page.locator("[href*='documents-request']");

    const dropsdowns = await page.locator('select.form-control');
    dropsdowns.selectOption('Teacher');
    await page.locator('.radiotextsty').last().click();
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#okayBtn').click();

    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();

    await page.locator('#terms').uncheck();
    await expect(page.locator('#terms')).not.toBeChecked();
    await expect(blinkLink).toHaveAttribute('class', 'blinkingText');
    await page.pause();
});

test('child window handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinkLink = page.locator("[href*='documents-request']");

    const [newpage] = await Promise.all([context.waitForEvent('page'), blinkLink.click()]);

    const text = await newpage.locator('.red').textContent();
    //console.log(text);
    const artext = text.split('@');
    const domain = artext[1].split(' ')[0];
    console.log(domain);
    page.locator('#username').fill(domain);
    await page.pause();
});
