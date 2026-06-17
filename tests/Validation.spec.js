const { test, expect } = require('@playwright/test');

test.only('popup validation', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice');
    //await page.goto('https://www.google.com/');
    // await page.goBack();
    // await page.goForward();

    expect(await page.locator('#displayed-text').isVisible());
    await page.locator('#hide-textbox').click();
    expect(await page.locator('#displayed-text').isHidden());
    await page.pause();

    page.on('dialog', (dialog) => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
});
