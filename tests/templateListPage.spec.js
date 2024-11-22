const { test, expect } = require('@playwright/test');
const { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');
const {templateList} = require('../BaseClass/templateList.js');


test.describe('Test the Template list Page', () => {
    let context;
    let programSummaryPage , templatelist;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({
            storageState: 'auth.json',
           // recordVideo: { dir: 'videos/', size: { width: 1280, height: 720 } },
        });
        const page = await context.newPage();
        programSummaryPage = new ProgramSummaryPage(page);
        templatelist = new templateList(page);
        await templatelist.navigateToTemplatePage();
       
       

    });
    test.afterAll(async () => {
        await context.close(); 
      //  await browserContext.close()
    });
    
    test('01 Verify Navigation to the "Template List" Page', async () => {
       await templatelist.navigateToTemplatePage();
    });
    test('02 Verify Default Sorting of Templates', async () => {
        await expect(templatelist.page.locator('#root')).toContainText('Name (A-Z)');
    });
    test('03 Verify Template List for the Selected Catalog Year', async () => {
        await templatelist.selectCatalogYear(5);
    });
    test('04 Verify Sorting Functionality', async () => {
        await templatelist.sorting(); 
    });
    test('05 Verify labels', async () => {
        await templatelist.lables();
    });
    test('06 Verify the new template button functionality', async () => {
       await  templatelist.page.getByRole('button', { name: '+ New template' }).click();
       expect(await templatelist.page.locator('#root')).toContainText('Untitled template');
    });
    test('07 Verify the template menu options ', async () => {
       await templatelist.page.locator(".vertical-ellipsis").first().click();
       expect(await  templatelist.page.locator(".mini-menu-container").first()).toBeVisible();
     });
     test.skip('08 Detele a template from the template list page', async () => {
       const templateName =  await templatelist.page.locator(".border-gray-3 .fw-bold").first().textContent();
       console.log(templateName);
       await templatelist.page.locator(".vertical-ellipsis").first().click();
       await templatelist.page.locator(".mini-menu-option >> text ='Delete'").first().click();
       await templatelist.page.waitForTimeout(10000);
       expect(await templatelist.page.locator(".border-gray-3 .fw-bold").first()).not.toHaveText(templateName)
      });
});



