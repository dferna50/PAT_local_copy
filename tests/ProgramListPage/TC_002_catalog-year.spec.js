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

    test('Verify catalog year for "Programs" page', async () => {
        test.setTimeout(120000)
        await programlist.selectCatalogYear(5, 'Accountancy, BS');

    });

