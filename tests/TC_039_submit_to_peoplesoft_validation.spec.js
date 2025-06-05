const { test, expect } = require('@playwright/test'), faker = require('faker'), { adminPages } = require('../BaseClass/adminPages.js');
//const { programListPage } = require('../BaseClass/programListPage.js');

    let context, adminPage;
    

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({
            storageState: 'auth.json',});
        const page = await context.newPage();
        adminPage = new adminPages(page);
    });

    test("@e2e check if the college name is visible", async() => {
        await adminPage.navigateToSubmitToPeopleSoft();
        expect(await adminPage.page.getByRole('link', { name: 'Accountancy, BS' })).toBeVisible({timeout:15000});
    })
    test("@e2e check if the sumbit button is visible", async() => {
        await adminPage.navigateToSubmitToPeopleSoft();
        expect(await adminPage.page.locator('.col-auto > .btn').first()).toBeVisible({timeout:15000});
    })
    test("@e2e check if sumbit all button is visible", async() => {
        await adminPage.navigateToSubmitToPeopleSoft();
        expect(await adminPage.page.getByRole('button', { name: 'Submit all for 2023 -' })).toBeVisible({timeout:15000});
    })
