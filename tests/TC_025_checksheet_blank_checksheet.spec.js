const { test, expect } = require('@playwright/test');
const { checksheetCreation } = require('../BaseClass/checksheetCreation.js');

let context, checksheet;
let usedCourses = [];

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({
        storageState: 'auth.json',
    });
    const page = await context.newPage();
    checksheet = new checksheetCreation(page);
    await checksheet.navigateToChecksheetPage();
});

test.afterAll(async () => {
    await context.close();
});

test("Create a new blank checksheet", async () => { 
    await checksheet.navigateToStatusTabAndSelect(2);
    const element = await checksheet.page.locator('.text-gray-7').first().textContent();
    usedCourses.push(element);
    await checksheet.createBlankChecksheet(element);
    await checksheet.page.waitForTimeout(2000);    
});