
const { test, expect } = require('@playwright/test');
const { templateCreation } = require('../BaseClass/templateCreation.js');

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

  test("Add a preset text type requirement", async () => {
        await template.createTextOption(0);
        await template.page.getByRole('button', { name: 'Sections', exact: true }).click();
        await template.createNewSection();
        await template.addPresetTextOption();
    });

    test("Add an elective type requirement", async () => {
        await template.createNewSection();
        await template.electiveReq();
    });

    test("Add a check type requirement", async () => {
        await template.createNewSection();
        await template.checkReq();
    });