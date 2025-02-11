const { test, expect } = require('@playwright/test'), { templateList } = require('../BaseClass/templateList.js');

    let context, templatelist;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({storageState: 'auth.json',});
        const page = await context.newPage();
        templatelist = new templateList(page);
        await templatelist.navigateToTemplatePage();
    });

    test.afterAll(async () => {await context.close();});

    test('Verify labels', async () => { await templatelist.lables(); });

    test('Verify the new template button functionality', async () => {
        await templatelist.page.getByRole('button', { name: '+ New template' }).click();
        expect(await templatelist.page.locator('#root')).toContainText('Untitled template');
    });

