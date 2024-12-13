const { test, expect } = require('@playwright/test');
const { programListPage } = require('../../BaseClass/programListPage.js');

    let context, programlist;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({
            storageState: 'auth.json',
        });
        const page = await context.newPage();
        programlist = new programListPage(page);
        await programlist.navigateToProgramsPage();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('Verify location filter for programs list page', async () => {
        await programlist.page.getByText('Location', { exact: true }).click();
        await programlist.page.waitForTimeout(5000);
        await programlist.dropdownValues();
    });
