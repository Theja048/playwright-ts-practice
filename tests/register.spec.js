import { expect, test } from '@playwright/test';
import { loadEnvFile } from 'node:process';

test('register page', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/register');

    // await page.locator('#firstName').fill('john');
    // await page.locator('#lastName').fill('dakota');
    // await page.locator('#userEmail').fill('johnson@gmail.com');
    // await page.locator('#userMobile').fill('7864782262');
    // await page.locator("//select[@formcontrolname='occupation']").selectOption({ index: 3 });
    // await page.locator("input[type='radio'][formcontrolname='gender'][value='Male']").click();
    // await page.locator('#userPassword').fill('Rg1024@49');
    // await page.locator('#confirmPassword').fill('Rg1024@49');
    // await page.locator("input[type='checkbox'][formcontrolname='required']").check();
    // await page.locator('#login').click();
    await page.locator('//p[contains(text(),"Already have an account")]//a').click();
    await page.locator('#userEmail').fill('rg112@gmail.com');
    await page.locator('#userPassword').fill('Rg@000000');
    await expect(page.locator('#login')).toBeEnabled();
    await page.locator('#login').click();

    await expect(page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash'));
    //await page.waitForLoadState('networkidle');
    await page.locator("//div[@class='card-body']//b").first().waitFor();
    const items = await page.locator("//div[@class='card-body']//b").allTextContents();
    console.log(items);
});
