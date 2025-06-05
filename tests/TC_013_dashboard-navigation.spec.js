const { test, expect } = require('@playwright/test'), { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');

    let context, programSummaryPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({storageState: 'auth.json',});
        const page = await context.newPage();
        programSummaryPage = new ProgramSummaryPage(page);
        await programSummaryPage.goto();
    });

    test.afterAll(async () => {await context.close();
    });

    test('@e2e @smoke Verify Login as a PROVOST user', async () => {
        await programSummaryPage.verifyProgramText('Business, W. P. Carey School of');
    });

    test('@e2e @smoke Verify all catalog years on the dashboard', async () => {
        await programSummaryPage.selectCatalogYear(5, 'Business, W. P. Carey School of');
    });

