const { test, expect } = require('@playwright/test');
const { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');

    let context, programSummaryPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({
            storageState: 'auth.json',
        });
        const page = await context.newPage();
        programSummaryPage = new ProgramSummaryPage(page);
        await programSummaryPage.goto();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('Verify the status definitions.', async () => {
        await programSummaryPage.clickStatusesButtonAndVerifyDialogText(
            'Status DefinitionsPending department submissionSome colleges/schools utilize department-level reviewers.Pending college/school submissionAction is required from a college/school to submit for Provost review.'
        );
    });

    test('Verify current status', async () => {
        const expectedStatuses = [
            'Pending department submission',
            'Pending college / school submission',
            'Pending provost review',
            'Pending DARS encoding',
            'Completed',
        ];
        await programSummaryPage.verifyStatusIndicators(expectedStatuses);
    });

