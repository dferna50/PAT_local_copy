const { test, expect } = require('@playwright/test'), { checksheetCreation } = require('../BaseClass/checksheetCreation.js'), { faker } = require('@faker-js/faker');

let context, checksheet, usedCourses = [];

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({ storageState: 'auth.json',});
    const page = await context.newPage();
    checksheet = new checksheetCreation(page);
    await checksheet.navigateToChecksheetPage();
});

test.afterAll(async () => { await context.close(); });

test("Return checksheet to college", async () => {   
    await checksheet.navigateToStatusTabAndSelect(2);
    const element = await checksheet.page.locator('.text-gray-7').first().textContent();
    usedCourses.push(element);
    await checksheet.createBlankChecksheet(element);
    await checksheet.lockChecksheet();
    await checksheet.page.locator('.button-link').click(); 
    const returnReason = faker.lorem.sentence();
    await checksheet.page.locator('.mb-6').first().fill(returnReason);
    await checksheet.page.getByRole('button', { name: 'Submit' }).click();
    await checksheet.page.getByRole('button', { name: 'Okay' }).click();
    await checksheet.page.waitForTimeout(2000)
    await checksheet.page.reload();
    expect(await checksheet.page.locator('.mb-1 > div').first().textContent()).toContain('Pending college/school submission');
    await checksheet.page.reload();
    await checksheet.checkChecksheetHistory(returnReason, 'Returned to college/school');
});

test("Return checksheet to department", async () => {   
    await checksheet.navigateToStatusTabAndSelect(2);
    const element = await checksheet.page.locator('.text-gray-7').first().textContent();
    usedCourses.push(element);  // for destroying the created checksheet // currently not in use. 
    await checksheet.createBlankChecksheet(element);
    await checksheet.lockChecksheet();
    await checksheet.page.locator('.button-link').click(); 
    const returnReason = faker.lorem.sentence();
    await checksheet.page.locator('.mb-6').fill(returnReason);
    await checksheet.page.locator('#departmentRadio').click();
    await checksheet.page.getByRole('button', { name: 'Submit' }).click();
    await checksheet.page.getByRole('button', { name: 'Okay' }).click();
    await checksheet.page.waitForTimeout(2000)
    await checksheet.page.reload();
    expect(await checksheet.page.locator('.mb-1 > div').first().textContent()).toContain('Pending department submission');
    await checksheet.page.reload();
    await checksheet.checkChecksheetHistory(returnReason, 'Returned to department');
});