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

    test.afterAll(async () => {await context.close(); });

    test("@e2e Add a course type requirement", async () => {
        await template.createNewSection();
        await template.addCourseTypeRequirment();
    });

    test("@e2e Add a general studies requirement type", async () => {
        await template.createNewSection();
        await template.addGeneralStudiesRequirment();
    });

    test("@e2e Add a custom text requirement", async () => {
        test.setTimeout(120000);
        await template.navigateToTemplatePage();
        await template.clickCreateTemplateButton();
        await template.createNewSection();
        await template.customTextReq();
    });


