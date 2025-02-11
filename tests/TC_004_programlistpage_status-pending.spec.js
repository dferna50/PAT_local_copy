const { test, expect } = require('@playwright/test'), { programListPage } = require('../BaseClass/programListPage.js');

    let context, programlist;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({storageState: 'auth.json',});
        const page = await context.newPage();
        programlist = new programListPage(page);
        await programlist.navigateToProgramsPage();
    });

    test.afterAll(async () => {await context.close();});

    test('Verify "Pending college/school submission" status for programs', async () => {
        await programlist.navigateToStatusTabAndSelect(4);
        await programlist.verifyStatusText('Pending college/school');
    });

    test('Verify "Pending Provost review" status for programs', async () => {
        await programlist.navigateToStatusTabAndSelect(5);
        await programlist.verifyStatusText('Pending Provost review');
    });

