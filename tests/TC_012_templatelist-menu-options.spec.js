const { test, expect } = require('@playwright/test');
const { templateList } = require('../BaseClass/templateList.js');
    let context, templatelist;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({
            storageState: 'auth.json',
        });
        const page = await context.newPage();
        templatelist = new templateList(page);
        await templatelist.navigateToTemplatePage();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('Verify the template menu options', async () => {
        await templatelist.page.locator('.vertical-ellipsis').first().click();
        expect(await templatelist.page.locator('.mini-menu-container').first()).toBeVisible();
    });

    test.skip('Delete a template from the template list page', async () => {
        const templateName = await templatelist.page.locator('.border-gray-3 .fw-bold').first().textContent();
        console.log(templateName);
        await templatelist.page.locator('.vertical-ellipsis').first().click();
        await templatelist.page.locator(".mini-menu-option >> text ='Delete'").first().click();
        await templatelist.page.waitForTimeout(10000);
        expect(await templatelist.page.locator('.border-gray-3 .fw-bold').first()).not.toHaveText(templateName);
    });

