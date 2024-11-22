const { test, expect} = require('@playwright/test');
const { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');
const { programListPage } = require('../BaseClass/programListPage.js');

test.describe('Test the program Page', () => {
    let context;
    let programSummaryPage, programlist;

    
    test.beforeAll(async ({ browser }) => {
        test.setTimeout(120000);
        context = await browser.newContext({
            storageState: 'auth.json',
        });
        const page = await context.newPage();
        programSummaryPage = new ProgramSummaryPage(page);
        programlist = new programListPage(page);
        await programlist.navigateToProgramsPage();
    });
    test.afterAll(async () => {
        await context.close();
    });

    test('01 Verify Navigation to the "Programs" Page', async () => {
        await programlist.verifyProgramsPagLoading();
    });

    test('02 Verify catalog year for "Programs" page', async () => {
        await programlist.selectCatalogYear(5, 'Accountancy, BS');
    });

    test('03 Verify "No checksheet exists" status for programs', async () => {
        await programlist.navigateToStatusTabAndSelect(2);
        expect(await programlist.page.getByText('New checksheet')).toBeVisible();
    });
    
    test('04 Verify "Pending department submission" status for programs', async () => {
        await programlist.navigateToStatusTabAndSelect(3);
        await  programlist.verifyStatusText('Pending department submission');
    });
    
    test.slow('05 Verify "Pending college/school submission" status for programs', async () => {
        await programlist.navigateToProgramsPage();
        await programlist.navigateToStatusTabAndSelect(4);
        await programlist.verifyStatusText('Pending college/school');
    });
    
    test('06 Verify "Pending Provost review" status for programs', async () => {
        await programlist.navigateToProgramsPage();
        await programlist.navigateToStatusTabAndSelect(5);
        await programlist.verifyStatusText('Pending Provost review');
    });
    
    test('07 Verify "Pending DARS encoding" status for programs', async () => {
        await programlist.navigateToProgramsPage();
        await programlist.navigateToStatusTabAndSelect(6);
        await programlist.verifyStatusText('Pending DARS encoding');
    });
    
    test('08 Verify "Completed" status for programs', async () => {
        await programlist.navigateToProgramsPage();
        await programlist.navigateToStatusTabAndSelect(7);
        await programlist.verifyStatusText('Completed');
    });
    test('09 Verify department filter for programs list page', async () => {
        test.setTimeout(120000)
        await programlist.navigateToProgramsPage();
        await programlist.page.locator('button').filter({ hasText: 'Department' }).click()
        await programlist.page.waitForTimeout(5000);
       await programlist.dropdownValues();
    });

    test('10 Verify location filter for programs list page', async () => {
        // await programlist.navigateToProgramsPage();
        await programlist.page.getByText('Location', { exact: true }).click();
         await programlist.page.waitForTimeout(5000);
        await programlist.dropdownValues();
        
     });


    
    
    test('11 Verify scrolling through to the programs list page', async () => {
        
        test.setTimeout(120000);
        await programlist.navigateToProgramsPage();
        await programlist.verifyProgramsPagLoading();
        await programlist.pagesSrolling();
        await expect(programlist.page.locator('#root').filter({ hasText: 'User Experience, BS' })).toBeVisible();
    });
});
