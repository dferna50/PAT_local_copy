const { test, expect } = require('@playwright/test');
const { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');
 let coursecode;

class adminPages{

    constructor(page) {
        this.page = page;
        this.programSummaryPage = new ProgramSummaryPage(page);
        this.subplanCollegeLink = page.locator(".accordion-item").first();
        this.programsSearchBox = page.locator("div.d-flex.gap-3 > div:nth-child(1) > input");
        this.userAsurite = page.locator("#asurite");
        this.userRole = page.locator("#role");
        this.userColege = page.locator("#college");
        this.userDepartment = page.locator("#department");
        this.addUser = page.locator(".btn-primary");
        this.asuriteField = page.getByRole('cell', { name: 'asurite' });
       // this.subplanActivateToggle = 
        //this.subplanCourseCode = page.locator("#card-body-1 > div:nth-child(2) > .col-md-4")
    }
    async validateSubplanActivation(coursecode){
        await this.programsSearchBox.click();
        await this.programsSearchBox.fill(coursecode);
        //await expect( this.page.locator(".underline-hover").first()).toBeVisible( { timeout: 100000 }); 
       // expect(await this.page.locator("div:nth-child(5) > div > div:nth-child(3)").textContent()).toContain(coursecode);

    }
    async addAndDeleteUser(asurite, role, college, department){ 
        await this.userAsurite.fill(asurite.toString());   //enter asurite for adding new user// for testing adding random values
        await this.userRole.selectOption("DEPARTMENT");
        await this.userColege.selectOption("CBA");
        await this.page.department.selectOption("CBADN"); 
        await this.page.addUser; //add user  btton
        await this.page.reload();
        await expect(await this.asuriteField).toBeVisible();
        for(let i=1; i<=100; i++){
            {
                if (await this.page.locator('div > div > div > table > tbody > tr:nth-child('+i+') td').first().textContent() === asurite){  // looped in condititon to find newly created asurite 
                    this.page.on('dialog', async (dialog) => {  // handling dialog box
                        console.log(`Dialog message: ${dialog.message()}`);
                        await dialog.accept(); // Click "OK" on the confirmation dialog
                      });
                    await this.page.locator('div > div > div > table > tbody > tr:nth-child('+i+') .btn-gray').click(); //
                    await this.page.reload(); // relading the page 
                    break;
                }
                    
            }
        }
        //await this.page.locator('row', { name: asurite+ ' DEPARTMENT W. P. Carey' }).getByRole('button').click();
    }
    async activateSubplan(newStatus) { 
        let coursecode = null;
        let status;
    
        await this.subplanCollegeLink.click();
    
        for (let i = 1; i <= 100; i++) {
            if (await this.page.locator(`#card-body-1 > div:nth-child(${i}) > div.col-md-2 > div > label`).isVisible()) {
                status = await this.page.locator(`#card-body-1 > div:nth-child(${i}) > div.col-md-2 > div > label`).textContent();
    
                if (status === newStatus) {
                    if (await this.page.locator(`#card-body-1 > div:nth-child(${i}) > .col-md-4`).isVisible()) {
                        coursecode = await this.page.locator(`#card-body-1 > div:nth-child(${i}) > .col-md-4`).textContent();
                        await this.page.locator(`#card-body-1 > div:nth-child(${i}) > div.col-md-2 > div > .toggle-switch`).click();
                        await this.page.locator('[title="Programs"]').click();
                        await this.page.locator('#dropdown-1-dropdown-item-1-1 > li.nav-button > a').click();
                        await this.programsSearchBox.fill(coursecode);
                        break;
                    }
                }
            }
        }
    
        if (!coursecode) {
            throw new Error("No inactive subplan found to activate!");
        }
    
        console.log("The activated course code is:", coursecode);
        return coursecode;
    }

    async navigateToTemplatePage() { 
    await this.programSummaryPage.goto();
    await this.programSummaryPage.clickTemplateLink();
    await this.programSummaryPage.waitForTemplatesPage();
    }
    async navigateToSubplansPage(){
        await this.programSummaryPage.goto();
         await this.programSummaryPage.clickSubplanLink();
         await this.programSummaryPage.waitForSubplanPage();
    }
    async navigateToUsersPage(){
        await this.programSummaryPage.goto();
         await this.programSummaryPage.clickUsersLink();
         await this.programSummaryPage.waitForUsersPage();
    }
    async navigateToSettingsPage() { 
        await this.programSummaryPage.goto();
         await this.programSummaryPage.clickSettingsLink();
         await this.programSummaryPage.waitForSettingsPage();
    }
    async navigateToRolloverPage() { 
        await this.programSummaryPage.goto();
         await this.programSummaryPage.clickRolloverLink();
         await this.programSummaryPage.waitForRolloverPage();
    }
}
module.exports = {adminPages}