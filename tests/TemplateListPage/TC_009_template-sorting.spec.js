const { test, expect } = require('@playwright/test');
const { templateList } = require('../../BaseClass/templateList.js');

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

    test('Verify Template List for the Selected Catalog Year', async () => {
        await templatelist.selectCatalogYear(5);
    });

    test('Verify Sorting Functionality', async () => {
        await templatelist.sorting();
    });

