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

    test("Navigate to template creation page", async () => {
        await template.navigateToTemplatePage();
        await template.clickCreateTemplateButton();
    });

    test("Create a blank template", async () => {
        await template.createBlankTemplate();
    });

