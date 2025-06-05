const { test, expect } = require('@playwright/test'), faker = require('faker'), { adminPages } = require('../BaseClass/adminPages.js');
//const { programListPage } = require('../BaseClass/programListPage.js');

    let context, adminPage;
    

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({
            storageState: 'auth.json',
            
        });
        const page = await context.newPage();
        adminPage = new adminPages(page);
    });

    test("@e2e Add and delete PROVOST user", async() => {
        await adminPage.navigateToUsersPage();
        await adminPage.addAndDeletePROVOSTUser(faker.name.firstName(),"PROVOST");
    })