const { test, expect } = require('@playwright/test'), { checksheetCreation } = require('../BaseClass/checksheetCreation.js');

let context, checksheet, usedCourses = [];

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({        storageState: 'auth.json',    });
    const page = await context.newPage();
    checksheet = new checksheetCreation(page);
    await checksheet.navigateToChecksheetPage();
});

test.afterAll(async () => {    await context.close();});

test("@e2e @smoke Create a new blank checksheet", async () => { 
    await checksheet.navigateToStatusTabAndSelect(2);
    // const element = await checksheet.page.locator('.text-gray-7').first().textContent();
    // usedCourses.push(element);  // for destroying the created checksheet // currently not in use. 
    await checksheet.createBlankChecksheet();
    await checksheet.page.waitForTimeout(2000);    
});