const { test, expect } = require('@playwright/test');
const { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');
class programListPage{

    constructor(page) {
        this.page = page;
        this.programSummaryPage = new ProgramSummaryPage(page);
        this.catalogYearDropdown = page.locator('div').filter({ hasText: /^Catalog year2023-20242024-20252025-20262026-20272027-20282028-2029$/ }).getByRole('combobox');
        this.rootLocator = page.locator('#root');
        this.statusButton = page.locator('button').filter({ hasText: 'Status' })
        this.statusValues = page.locator('.text-gray-7').first();
        this.firstProgram = page.locator(".underline-hover").first()


    }
    async navigateToProgramsPage() { 
    await this.programSummaryPage.goto();
  
    await this.page.waitForTimeout(2000);
    await this.programSummaryPage.checkLinkAccessibility(this.programSummaryPage.programsLink);
    await this.programSummaryPage.clickProgramsLink();
        await this.programSummaryPage.waitForProgramsPage();
    }
    async verifyProgramsPagLoading() {
        await expect( this.firstProgram).toBeVisible( { timeout: 100000 });
        await expect( this.rootLocator).toContainText('Accountancy, BS', { timeout: 100000 });
    }
    async selectCatalogYear(times, text, timeout = 50000) {
        await this.catalogYearDropdown.click();
        for (let i = 0; i < times; i++) {
            await this.page.keyboard.press('ArrowDown');
            await this.page.keyboard.press('Enter');
            await expect(this.rootLocator).toContainText(text, { timeout });
        }
    }
    async pagesSrolling() {
        await this.page.evaluate(async () => {
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
            for (let i = 0; i < document.body.scrollHeight; i += 1000) {
              window.scrollTo(0, i);
              await delay(300);
            }
          });

    }
    async  navigateToStatusTabAndSelect(optionIndex) {
        await this.statusButton.click();
        for (let i = 0; i < optionIndex; i++) {
            await this.page.keyboard.press('Tab');
        }
        await this.page.keyboard.press('Space');
       // await this.page.locator('.pt-1').click();
        await this.statusValues.click();
    }
    
    async  verifyStatusText(expectedText) {
        await this.page.waitForTimeout(2000);
        await this.page.waitForURL("https://pat-dev.apps.asu.edu/checksheet*");
        expect(await this.page.getByText(expectedText).first()).toBeVisible();
    }
    async dropdownValues() { 
        const dropdownoption =  await this.page.locator('.show .dropdown-item-text').all();
        for (const option of dropdownoption) {
         await option.click();
         await expect (await this.statusValues).toBeVisible();
     }
    }
}

module.exports = {programListPage}