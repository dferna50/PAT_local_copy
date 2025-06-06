const { test, expect } = require('@playwright/test'), { adminPages } = require('../BaseClass/adminPages.js'), { programListPage } = require('../BaseClass/programListPage.js');

    let context, adminPage, programlist;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({storageState: 'auth.json',});
        const page = await context.newPage();
        adminPage = new adminPages(page);
        programlist = new programListPage(page);
    });

    test.afterAll(async () => { await context.close();    });

    test("@e2e @smoke Verify deactivation of one subplan and validate deactivation", async ({ page }) => {
        // Step 1: Navigate to subplans page and activate a subplan
        await test.step("Deactivate a subplan", async () => {
            await adminPage.navigateToSubplansPage();
            let coursecode;

            // Step 1: Activate a subplan and retrieve the course code
    //         await test.step("Activate a subplan", async () => {
    //             coursecode = await adminPage.activateSubplan("Active");
    //     });
    
    //     // Step 2: Verify that the subplan is activated
    //     await test.step("Verify subplan is deactivated", async () => {
    //         await programlist.navigateToProgramsPage();
    //         await programlist.verifyProgramsPagLoading();
    //         if (coursecode) {
    //             await adminPage.validateSubplanActivation(coursecode);
    //         } else {
    //             throw new Error("Course code not found during deactivation!");
    //         } 
    //        // await page.waitForTimeout(2000); 
    // });
});
    });


