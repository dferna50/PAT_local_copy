# Test info

- Name: @e2e @smoke Verify the new template button functionality
- Location: C:\PAT_Automation - Copy\tests\TC_010_templatelist-ui-verification.spec.js:16:5

# Error details

```
Error: expect(locator).toContainText(expected)

Locator: locator('#root')
Expected string: "Untitled template"
Received string: ""
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('#root')

    at C:\PAT_Automation - Copy\tests\TC_010_templatelist-ui-verification.spec.js:18:58
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test'), { templateList } = require('../BaseClass/templateList.js');
   2 |
   3 |     let context, templatelist;
   4 |
   5 |     test.beforeAll(async ({ browser }) => {
   6 |         context = await browser.newContext({storageState: 'auth.json',});
   7 |         const page = await context.newPage();
   8 |         templatelist = new templateList(page);
   9 |         await templatelist.navigateToTemplatePage();
  10 |     });
  11 |
  12 |     test.afterAll(async () => {await context.close();});
  13 |
  14 |     test('@e2e @smoke Verify labels', async () => { await templatelist.lables(); });
  15 |
  16 |     test('@e2e @smoke Verify the new template button functionality', async () => {
  17 |         await templatelist.page.getByRole('button', { name: '+ New template' }).click();
> 18 |         expect(await templatelist.page.locator('#root')).toContainText('Untitled template');
     |                                                          ^ Error: expect(locator).toContainText(expected)
  19 |     });
  20 |
  21 |
```