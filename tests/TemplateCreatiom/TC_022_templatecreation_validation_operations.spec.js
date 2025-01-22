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

    test("Verify the credit hours with and without range", async () => {
        await template.createNewSection();
        await template.creditHoursValidation();
        await template.updateInLibrary();
    });

    test("Verify the optional field minimum grade", async () => {
        await template.createNewSection();
        await template.minimumGradeVald();
        await template.updateInLibrary();
    });

    test("Verify validation rules", async () => {
        test.setTimeout(120000);
        await template.validationRules();
        await template.page.waitForTimeout(2000);
    });

