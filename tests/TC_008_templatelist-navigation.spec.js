const { test, expect } = require('@playwright/test'), { templateList } = require('../BaseClass/templateList.js');

    let context, templatelist;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({storageState: 'auth.json',});
        const page = await context.newPage();
        templatelist = new templateList(page);
        await templatelist.navigateToTemplatePage();
    });

    test.afterAll(async () => {await context.close();});

    test('@e2e @smoke Verify Navigation to the "Template List" Page', async () => {
        await templatelist.navigateToTemplatePage();
    });

    test('@e2e @smoke Verify Default Sorting of Templates', async () => {
        await expect(templatelist.page.locator('#root')).toContainText('Name (A-Z)');
    });

