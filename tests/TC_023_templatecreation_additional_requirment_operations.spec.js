
const { test, expect } = require('@playwright/test'), { templateCreation } = require('../BaseClass/templateCreation.js');

    let context, template;

    test.beforeAll(async ({ browser }) => {
        test.setTimeout(120000)
        context = await browser.newContext({ storageState: 'auth.json' });
        const page = await context.newPage();
        template = new templateCreation(page);
        await template.navigateToTemplatePage();
        await template.clickCreateTemplateButton();
    });

    test.afterAll(async () => {await context.close();    });

  test("@e2e Add a preset text type requirement", async () => {
        await template.createTextOption(0);
        await template.page.getByRole('button', { name: 'Sections', exact: true }).click();
        await template.createNewSection();
        await template.addPresetTextOption();
    });

    test("@e2e Add an elective type requirement", async () => {
        await template.createNewSection();
        await template.electiveReq();
    });

    test("@e2e Add a check type requirement", async () => {
        await template.createNewSection();
        await template.checkReq();
    });