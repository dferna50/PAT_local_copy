const { test, expect } = require('@playwright/test'), { programListPage } = require('../BaseClass/programListPage.js');

    let context, programlist;

    test.beforeAll(async ({ browser }) => 
        {        
            context = await browser.newContext({storageState: 'auth.json', });
        const page = await context.newPage();
        programlist = new programListPage(page);
        await programlist.navigateToProgramsPage();
    });

    test.afterAll(async () => {        await context.close();    });

    test('Verify "Pending DARS encoding" status for programs', async () => {
        await programlist.navigateToStatusTabAndSelect(6);
        await programlist.verifyStatusText('Pending DARS encoding');
    });

    test('Verify "Completed" status for programs', async () => {
        await programlist.navigateToStatusTabAndSelect(7);
        await programlist.verifyStatusText('Completed');
    });
