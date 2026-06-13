const { test, expect } = require('@playwright/test');

test.only('calender test', async ({ page }) => {
    const date = '24';
    const month = '5';
    const year = '2027';

    const expectedResult = [month, date, year];

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    await page
        .locator('.react-calendar__year-view__months__month')
        .nth(parseInt(month) - 1)
        .click();
    await page.locator("//abbr[text()='" + date + "']").click();

    const input = page.locator('.react-date-picker__inputGroup__input');

    for (let i = 0; i < expectedResult.length; i++) {
        const value = await input.nth(i).inputValue();
        console.log(`Index ${i} value is: ${value}`); // Debug helper
        expect(value).toEqual(expectedResult[i]);
    }
});
