const { test, expect } = require('@playwright/test'),
 { programListPage } = require('../BaseClass/programListPage.js');

    let context, programlist;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({ storageState: 'auth.json', });
        //context = await browser.newContext();
        const page = await context.newPage();
        programlist = new programListPage(page);
        await programlist.navigateToProgramsPage();
    });

    test.afterAll(async () => { await context.close(); });

    test(' @e2e @smoke Verify Navigation to the "Programs" Page ', async () => {
        await programlist.verifyProgramsPagLoading();
    });

