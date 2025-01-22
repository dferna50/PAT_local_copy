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

    test("Add a course type requirement", async () => {
        await template.createNewSection();
        await template.addCourseTypeRequirment();
    });

    test("Add a general studies requirement type", async () => {
        await template.createNewSection();
        await template.addGeneralStudiesRequirment();
    });

    test("Add a custom text requirement", async () => {
        test.setTimeout(120000);
        await template.navigateToTemplatePage();
        await template.clickCreateTemplateButton();
        await template.createNewSection();
        await template.customTextReq();
    });


