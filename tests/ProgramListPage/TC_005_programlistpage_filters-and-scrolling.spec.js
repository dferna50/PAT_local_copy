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

    test('Verify department filter for programs list page', async () => {
        test.setTimeout(250000)
        await programlist.page.locator('button').filter({ hasText: 'Department' }).click();
        await programlist.page.waitForTimeout(5000);
        await programlist.dropdownValues();
    });

    test('Verify scrolling through to the programs list page', async () => {
        await programlist.verifyProgramsPagLoading();
        await programlist.pagesSrolling();
       // await expect(programlist.page.locator('#root').filter({ hasText: 'User Experience, BS' })).toBeVisible();
    });
