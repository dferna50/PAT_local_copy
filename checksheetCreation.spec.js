const {test, except} = require('@playwright/test')
const { checksheetCreation } = require('./BaseClass/checksheetCreation.js');
test.describe('Test the Creation of checksheets', () => {
    let context;
    let checksheet;
    test.beforeAll(async ({ browser }) => {
        //test.setTimeout(120000);
        context = await browser.newContext({
            storageState: 'auth.json',
        });
        const page = await context.newPage();
        checksheet = new checksheetCreation(page);
        await checksheet.navigateToChecksheetPage();
    });
    test.afterAll(async () => {
        await context.close();
    });

    test("01 test navigation to the programs summary page", async() => {

    });
    test("02 Create a new checksheet - create from blank checksheet", async () => { 
        await checksheet.page.locator('button').filter({ hasText: 'Status' }).click();
        await checksheet.page.keyboard.press('Tab');
        await checksheet.page.keyboard.press('Tab');
        await checksheet.page.keyboard.press('Enter');
        //await checksheet.page.locator(".btn-gold").click(); 
        await checksheet.page.waitForTimeout(2000);

    })
});


