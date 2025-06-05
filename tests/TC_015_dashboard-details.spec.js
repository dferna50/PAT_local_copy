const { test, expect } = require('@playwright/test'), { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');

    let context, programSummaryPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({storageState: 'auth.json',});
        const page = await context.newPage();
        programSummaryPage = new ProgramSummaryPage(page);
        await programSummaryPage.goto();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('@e2e @smoke  Verify college details page', async () => {
        await programSummaryPage.expandProgramRowsAndVerifyDetails();
    });

