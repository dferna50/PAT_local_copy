const { test, expect } = require('@playwright/test');
const { programListPage } = require('../BaseClass/programListPage.js');

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

    test('Verify "No checksheet exists" status for programs', async () => {
        await programlist.navigateToStatusTabAndSelect(2);
        expect(await programlist.page.getByText('New checksheet')).toBeVisible();
    });

    test('Verify "Pending department submission" status for programs', async () => {
        await programlist.navigateToStatusTabAndSelect(3);
        await programlist.verifyStatusText('Pending department submission');
    });
