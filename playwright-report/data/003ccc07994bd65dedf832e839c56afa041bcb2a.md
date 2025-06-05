# Test info

- Name: @e2e @smoke  Verify the template menu options
- Location: C:\PAT_Automation - Copy\tests\TC_012_templatelist-menu-options.spec.js:13:5

# Error details

```
Error: expect(locator).toBeVisible()

Locator: locator('.mini-menu-container').first()
Expected: visible
Received: undefined
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.mini-menu-container').first()

    at C:\PAT_Automation - Copy\tests\TC_012_templatelist-menu-options.spec.js:15:81
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test'), { templateList } = require('../BaseClass/templateList.js');
   2 |     let context, templatelist;
   3 |
   4 |     test.beforeAll(async ({ browser }) => {
   5 |         context = await browser.newContext({storageState: 'auth.json', });
   6 |         const page = await context.newPage();
   7 |         templatelist = new templateList(page);
   8 |         await templatelist.navigateToTemplatePage();
   9 |     });
  10 |
  11 |     test.afterAll(async () => {await context.close();});
  12 |
  13 |     test('@e2e @smoke  Verify the template menu options', async () => {
  14 |         await templatelist.page.locator('.vertical-ellipsis').first().click();
> 15 |         expect(await templatelist.page.locator('.mini-menu-container').first()).toBeVisible();
     |                                                                                 ^ Error: expect(locator).toBeVisible()
  16 |     });
  17 |
  18 |     test.skip('@e2eDelete a template from the template list page', async () => {
  19 |         const templateName = await templatelist.page.locator('.border-gray-3 .fw-bold').first().textContent();
  20 |         console.log(templateName);
  21 |         await templatelist.page.locator('.vertical-ellipsis').first().click();
  22 |         await templatelist.page.locator(".mini-menu-option >> text ='Delete'").first().click();
  23 |         await templatelist.page.waitForTimeout(10000);
  24 |         expect(await templatelist.page.locator('.border-gray-3 .fw-bold').first()).not.toHaveText(templateName);
  25 |     });
  26 |
  27 |
```