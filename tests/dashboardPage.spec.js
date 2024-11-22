const { test, expect } = require('@playwright/test');
const { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');

test.describe('Test the Dashboard page and navigation', () => {
    let context;
    let programSummaryPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({
            storageState: 'auth.json',
            //recordVideo: { dir: 'videos/', size: { width: 1280, height: 720 } },

        });
        const page = await context.newPage();
        programSummaryPage = new ProgramSummaryPage(page);
        await programSummaryPage.goto();

    });

    test.afterAll(async () => {
        await context.close(); 
       // await browserContext.close()
    });

    test('01 Verify Login without Duo login', async () => {
        await programSummaryPage.verifyProgramText('Business, W. P. Carey School of');
    });

    test('02 Verify all catalog years on the dashboard', async () => {
        await programSummaryPage.selectCatalogYear(5, 'Business, W. P. Carey School of');
    });

    test('03 Verify the status defination.', async () => {
        await programSummaryPage.clickStatusesButtonAndVerifyDialogText('Status DefinitionsPending department submissionSome colleges/schools utilize department-level reviewers.Pending college/school submissionAction is required from a college/school to submit for Provost review.');
    });

    test('04 Verify current status', async () => {
        const expectedStatuses = [
            'Pending department submission',
            'Pending college / school submission',
            'Pending provost review',
            'Pending DARS encoding',
            'Completed'
        ];
        await programSummaryPage.verifyStatusIndicators(expectedStatuses);
    });

    test('05 Verify college details page', async () => {
        await programSummaryPage.expandProgramRowsAndVerifyDetails();
    });

    // test.skip('Inprogress Validate that an error message is displayed if the program summary data fails to load due to network issues.', async () => {
    //     //const page = await context.newPage();
    //     let  errorMessage;
    //     await programSummaryPage.goto();
    //     await programSummaryPage.noNetworkSimulation();
    //     errorMessage = await programSummaryPage.page.locator('.error-message').textContent();
    //     expect(errorMessage).toContain('Failed to load program data');
    // });
    test('06 Verify navigation to Programs page', async () => {
        //await programSummaryPage.checkLinkAccessibility(programSummaryPage.programsLink);
        await programSummaryPage.clickProgramsLink();
        await programSummaryPage.waitForProgramsPage();
});
test('07 Verify navigation to Template list page.', async () => {
   // await programSummaryPage.checkLinkAccessibility(programSummaryPage.templatesLink);
    await programSummaryPage.clickTemplateLink();
    await programSummaryPage.waitForTemplatesPage();
});
test('08 Verify navigation to Users page.', async () => {
   // await programSummaryPage.checkLinkAccessibility(programSummaryPage.usersLink);
    await programSummaryPage.clickUsersLink();
    await programSummaryPage.waitForUsersPage();
});
test('09 Verify navigation to Subplan page', async () => {
   // await programSummaryPage.checkLinkAccessibility(programSummaryPage.subplansLink);
    await programSummaryPage.clickSubplanLink();
    await programSummaryPage.waitForSubplanPage();
});
// added code to navigate to navigate to settings page
test('10 Verify navigation to settings page', async () => {
     await programSummaryPage.clickSettingsLink();
     await programSummaryPage.waitForSettingsPage();
 });
});