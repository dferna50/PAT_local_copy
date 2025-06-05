const { test, expect } = require('@playwright/test'), { templateCreation } = require('../BaseClass/templateCreation.js');
// faker.lorem.words(2).toString().replace(/,/g, ' '); // Generate a random template name
    let context, template;
test.describe("loop" , async() => { 
    test.beforeAll(async ({ browser }) => {
        test.setTimeout(120000)
        context = await browser.newContext({ storageState: 'auth.json' });
        const page = await context.newPage();
        template = new templateCreation(page);
    });
//     for( let i = 0; i < 100; i++){


// test('test '+i+' repo', async () => {
//   test.setTimeout(120000)
//   await template.navigateToTemplatePage();
//   //await template.page.getByRole('link', { name: 'Templates' }).click();
//   for( let i = 0; i < 10; i++){
//   await template.page.locator('.vertical-ellipsis').first().click({timeout:120000});
//   await template.page.getByRole('button', { name: 'Delete' }).click({timeout:120000});
//   }
// });    
//     }   
//     for( let i = 0; i < 1000; i++){

// test('delete '+i+ 'section', async () => {
//     test.setTimeout(120000)
//     await template.navigateToTemplatePage();
//     await template.clickCreateTemplateButton();
 
//     await template.page.locator(".position-relative").nth(3).click({timeout:120000});
//     await template.page.getByRole('button', { name: 'Delete' }).click({timeout:120000});
    
//    // await template

// });
//     }
});