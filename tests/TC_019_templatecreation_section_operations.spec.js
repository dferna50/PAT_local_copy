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

    test.afterAll(async () => {await context.close();});

    test("@e2e Create a new section with no requirement", async () => {
        await template.createBlankTemplate();
        await template.createNewSection();
    });

    test("@e2e Add an existing section to the template", async () => {
        await template.existingSection();
    });

    test("@e2e Edit the section and add section notes", async () => {
        await template.createBlankTemplate();
        await template.createNewSection();
        await template.editSectionandAddSectionNotes();
    });
