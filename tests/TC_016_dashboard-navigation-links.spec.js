const { test, expect } = require('@playwright/test'), { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');

    let context, programSummaryPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({storageState: 'auth.json',});
        const page = await context.newPage();
        programSummaryPage = new ProgramSummaryPage(page);
        await programSummaryPage.goto();
    });

    test.afterAll(async () => {await context.close();});

    test('@e2e @smoke Verify navigation to Programs page', async () => {
        await programSummaryPage.clickProgramsLink();
        await programSummaryPage.waitForProgramsPage();
    });

    test('@e2e @smoke Verify navigation to Template list page.', async () => {
        await programSummaryPage.clickTemplateLink();
        await programSummaryPage.waitForTemplatesPage();
    });

    test('@e2e @smoke Verify navigation to Users page.', async () => {
        await programSummaryPage.clickUsersLink();
        await programSummaryPage.waitForUsersPage();
    });

