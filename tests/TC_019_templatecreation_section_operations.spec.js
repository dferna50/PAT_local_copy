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

    test("Create a new section with no requirement", async () => {
        await template.createBlankTemplate();
        await template.createNewSection();
    });

    test("Add an existing section to the template", async () => {
        await template.existingSection();
    });

    test("Edit the section and add section notes", async () => {
        await template.createBlankTemplate();
        await template.createNewSection();
        await template.editSectionandAddSectionNotes();
    });
