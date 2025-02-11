const { test, expect } = require('@playwright/test');
const { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');
let programSummaryPage;

class templateList{

    constructor(page) {
        this.page = page;
        this.programSummaryPage = new ProgramSummaryPage(page);
        this.rootLocator = page.locator('#root');
        this.catalogYearDropdown = page.locator('div').filter({ hasText: /^Catalog year2023-20242024-20252025-20262026-20272027-20282028-2029$/ }).getByRole('combobox');
        this.sortDropdown = page.locator('div').filter({ hasText: /^Sort byName \(A-Z\)Name \(Z-A\)$/ }).getByRole('combobox')

    }
    async navigateToTemplatePage() { 
    await this.programSummaryPage.goto();
   // await this.programSummaryPage.checkLinkAccessibility(this.programSummaryPage.templatesLink);
    await this.programSummaryPage.clickTemplateLink();
    await this.programSummaryPage.waitForTemplatesPage();
    }
    async selectCatalogYear(times, ){//text, timeout = 50000) {
        await this.catalogYearDropdown.click();
        for (let i = 0; i < times; i++) {
            await this.page.keyboard.press('ArrowDown');
            await this.page.keyboard.press('Enter');
        }
    }
    async sorting(){
        await expect(this.rootLocator).toContainText('Name (A-Z)');
        await this.sortDropdown.click();
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter')
        await expect(this.rootLocator).toContainText('Name (A-Z)Name (Z-A)');    //needs review   
    }
    async lables(){
        await expect(this.page.locator('div').filter({ hasText: /^Templates$/ })).toHaveText("Templates")
        await expect(this.page.getByText('Name', { exact: true })).toHaveText("Name");
        await expect(this.page.getByText('Program type', { exact: true })).toHaveText("Program type");
        await expect(this.page.getByText('Last modified by')).toHaveText("Last modified by");
        await expect(this.page.getByText('Catalog year').first()).toHaveText("Catalog year");
        await expect(this.page.getByText('Sort by')).toHaveText("Sort by");
        await expect(this.page.getByRole('button', { name: '+ New template' })).toHaveText("New template");
        await expect(this.page.getByText('Last modified on')).toHaveText("Last modified on");
        await expect(this.page.locator('.btn-md').first()).toHaveText("View\/edit");
    }
}
module.exports = {templateList}