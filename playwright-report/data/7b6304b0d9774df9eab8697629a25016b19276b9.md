# Test info

- Name: @e2e @smoke Verify "No checksheet exists" status for programs
- Location: C:\PAT_Automation - Copy\tests\TC_003_programlistpage_status-verification.spec.js:14:5

# Error details

```
Error: expect(locator).toBeVisible()

Locator: getByText('New checksheet')
Expected: visible
Received: undefined
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByText('New checksheet')

    at C:\PAT_Automation - Copy\tests\TC_003_programlistpage_status-verification.spec.js:16:68
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test'), { programListPage } = require('../BaseClass/programListPage.js');
   2 |
   3 |     let context, programlist;
   4 |
   5 |     test.beforeAll(async ({ browser }) => {
   6 |         context = await browser.newContext({ storageState: 'auth.json', });
   7 |         const page = await context.newPage();
   8 |         programlist = new programListPage(page);
   9 |         await programlist.navigateToProgramsPage();
  10 |     });
  11 |
  12 |     test.afterAll(async () => { await context.close();});
  13 |
  14 |     test('@e2e @smoke Verify "No checksheet exists" status for programs', async () => {
  15 |         await programlist.navigateToStatusTabAndSelect(2);
> 16 |         expect(await programlist.page.getByText('New checksheet')).toBeVisible();
     |                                                                    ^ Error: expect(locator).toBeVisible()
  17 |     });
  18 |
  19 |     test('@e2e Verify "Pending department submission" status for programs', async () => {
  20 |         await programlist.navigateToStatusTabAndSelect(3);
  21 |         await programlist.verifyStatusText('Pending department submission');
  22 |     });
  23 |
```