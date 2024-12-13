const { test, expect } = require('@playwright/test');
const { templateCreation } = require('../../BaseClass/templateCreation.js');

    let context;
    let template;

    test.beforeAll(async ({ browser }) => {
        test.setTimeout(120000)
        context = await browser.newContext({ storageState: 'auth.json' });
        const page = await context.newPage();
        template = new templateCreation(page);
        await template.navigateToTemplatePage();
        await template.clickCreateTemplateButton();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test("Create a text group", async () => {
        await template.createTextOption(0);
    });

    test("Delete a text group", async () => {
        await template.createTextOption(0);
        await template.deleteTextOption();
    });

    test("Create multiple text groups", async () => {
        for (let i = 0; i < 3; i++) {
            await template.createTextOption(i);
        }
    });
