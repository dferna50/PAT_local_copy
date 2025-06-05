const { test, expect } = require('@playwright/test'), { templateCreation } = require('../BaseClass/templateCreation.js');
// faker.lorem.words(2).toString().replace(/,/g, ' '); // Generate a random template name
    let context, template;
    test.describe.serial('Template Creation Flow', () => {

    test.beforeAll(async ({ browser }) => {
        test.setTimeout(120000)
        context = await browser.newContext({ storageState: 'auth.json' });
        const page = await context.newPage();
        template = new templateCreation(page);
    });

    test.afterAll(async () => {await context.close();});

    test("@e2e  Navigate to template creation page", async () => {
        await template.navigateToTemplatePage();
        await template.clickCreateTemplateButton();
    });

    test("@e2e Create a blank template", async () => {
        await template.navigateToTemplatePage();
        await template.clickCreateTemplateButton();
        await template.createBlankTemplate();
        await template.templatenameCreatorAndFinder()
        });
        
    test("@e2e delete the created template", async () => {
        await template.navigateToTemplatePage();
        await template.deleteBlankTemplate();
    });
});

