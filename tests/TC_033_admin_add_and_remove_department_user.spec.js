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

    test("@e2e Add and delete department user", async() => {
        await adminPage.navigateToUsersPage();
        await adminPage.addAndDeleteDepartmentUser(faker.name.firstName(),"DEPARTMENT","CBA","CBADN");
    })