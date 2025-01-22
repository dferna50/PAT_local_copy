const { test, expect } = require('@playwright/test');
const { checksheetCreation } = require('../BaseClass/checksheetCreation.js');

let context, checksheet;

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

test("Verify navigation to the checksheet page", async() => {
    await checksheet.navigateToStatusTabAndSelect(2);
})