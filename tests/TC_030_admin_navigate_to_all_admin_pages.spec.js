const { test, expect } = require('@playwright/test'), { adminPages } = require('../BaseClass/adminPages.js');

    let context, adminPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({storageState: 'auth.json',        });
        const page = await context.newPage();
        adminPage = new adminPages(page);
        await adminPage.navigateToTemplatePage();
    });

    test.afterAll(async () => {        await context.close();    });

    test('Verify Navigation to the "Template List" Page', async () => {
        await adminPage.navigateToTemplatePage();
    });
    test('Verify Navigation to the "Subplans" Page', async () => {
      await adminPage.navigateToSubplansPage();
    });
    test('Verify navigation to the"Users" page' , async ()=> {
        await adminPage.navigateToUsersPage();

    })
    test('Verify navigation to "Settings" page', async () => {
        await adminPage.navigateToSettingsPage();
    })
    test('Verify Navigation to "Rollover" page' , async () =>{ 
        await adminPage.navigateToRolloverPage();
    }) 



    
