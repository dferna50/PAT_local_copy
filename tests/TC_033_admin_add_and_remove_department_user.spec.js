const { test, expect } = require('@playwright/test');
const faker = require('faker');
const { adminPages } = require('../BaseClass/adminPages.js');
//const { programListPage } = require('../BaseClass/programListPage.js');

    let context, adminPage, programlist;
    

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({
            storageState: 'auth.json',
            
        });
        const page = await context.newPage();
        adminPage = new adminPages(page);
       // programlist = new programListPage(page);
    });

    test.skip("Add and delete a department user", async() => {
        await adminPage.navigateToUsersPage();
        await adminPage.addAndDeleteUser(faker.name.firstName());
        await adminPage.page.waitForTimeout(2000);
    })