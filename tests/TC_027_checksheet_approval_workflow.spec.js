const { test, expect } = require('@playwright/test');
const { checksheetCreation } = require('../BaseClass/checksheetCreation.js');
const { faker } = require('@faker-js/faker');

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

test("Approve a checksheet", async () => {
    await checksheet.navigateToStatusTabAndSelect(2);
    const element = await checksheet.page.locator('.text-gray-7').first().textContent();
    usedCourses.push(element);
    await checksheet.createBlankChecksheet(element);
    await checksheet.lockChecksheet();
    const approveMessage = faker.lorem.sentence();
    await checksheet.approveChecksheet(approveMessage);
    await checksheet.page.reload();
    await checksheet.checkChecksheetHistory(approveMessage, 'Submitted to DARS');
});