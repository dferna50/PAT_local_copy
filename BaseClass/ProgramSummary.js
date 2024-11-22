const { test, expect } = require('@playwright/test');
class ProgramSummaryPage {
    constructor(page) {
        this.page = page;
        this.rootLocator = page.locator('#root');
        this.catalogYearDropdown = page.getByRole('combobox');
        this.statusButton = page.getByRole('button', { name: 'What do these statuses mean?' });
        this.dialogLocator = page.getByRole('dialog');
        this.programRows = page.locator('.summary-row-head');
        this.expandedDetails = page.locator('.summary-row-expansion');
        this.titleLink =page.locator('a.title-subunit-name');
    this.homeLink = page.locator('a[title="Program Architecture Tool home page"]');
    this.programsLink = page.locator('a[title="Programs"]');
    this.templatesLink = page.getByRole('link', { name: 'Templates' });
    this.usersLink = page.getByRole('link', { name: 'Users' });
    this.subplansLink = page.getByRole('link', { name: 'Subplans' });
    this.viewAllPrograms = page.getByRole('link', { name: 'View all programs' })
    this.adminLink = page.getByTitle('Admin');
    this.settings = page.getByRole('link', { name: 'Settings' });
    }

    async programsLink(){
         this.programsLink;
    }
    async goto() {
        await this.page.goto('https://pat-dev.apps.asu.edu/');
        await this.page.waitForTimeout(5000); 
    }

    async verifyProgramText(text, timeout = 50000) {
        await expect(this.rootLocator).toContainText(text, { timeout });
    }

    async selectCatalogYear(times, text, timeout = 50000) {
        await this.catalogYearDropdown.click();
        for (let i = 0; i < times; i++) {
            await this.page.keyboard.press('ArrowDown');
            await this.page.keyboard.press('Enter');
            await expect(this.rootLocator).toContainText(text, { timeout });
        }
    }

    async clickStatusesButtonAndVerifyDialogText(expectedText, timeout = 50000) {
        await this.statusButton.click({ timeout });
        await expect(this.dialogLocator).toContainText(expectedText, { timeout });
    }

    async verifyStatusIndicators(statuses) {
        for (const status of statuses) {
            await this.verifyProgramText(status);
        }
    }

    async expandProgramRowsAndVerifyDetails() {
        const rowsCount = await this.programRows.count();
        for (let i = 0; i < rowsCount; i++) {
            await this.programRows.nth(i).click();
            const expandedDetailsCount = await this.expandedDetails.count();
            expect(expandedDetailsCount).toBeGreaterThan(i);
        }
        
    } 
     async clickProgramsLink() {
        this.checkLinkAccessibility(this.programsLink);
        await this.programsLink.click();
        await this.viewAllPrograms.click();
     }
     async clickSettingsLink() {
        await this.adminLink.click();
        this.checkLinkAccessibility(this.settings);
        await this.settings.click();
     }
     async clickTemplateLink() {
        await this.adminLink.click();
        this.checkLinkAccessibility(this.templatesLink);
        await this.templatesLink.click();
     }
     async clickUsersLink() {
        await this.adminLink.click();
        this.checkLinkAccessibility(this.usersLink);
        await this.usersLink.click();
     }
     async clickSubplanLink() {
        await this.adminLink.click();
        this.checkLinkAccessibility(this.subplansLink);
        await this.subplansLink.click();
     }
     async checkLinkAccessibility(link) {
        await link.isVisible();
        await link.isEnabled();
     }
     async waitForProgramsPage(){
       await  this.page.waitForURL('https://pat-dev.apps.asu.edu/programs');
     }
     async waitForTemplatesPage(){
        await  this.page.waitForURL('https://pat-dev.apps.asu.edu/templates');
      }
      async waitForUsersPage(){
        await  this.page.waitForURL('https://pat-dev.apps.asu.edu/users');
      }
      async waitForSubplanPage(){
        await  this.page.waitForURL('https://pat-dev.apps.asu.edu/subplanactivation');
      }
      async waitForSettingsPage(){
        await this.page.waitForURL('https://pat-dev.apps.asu.edu/settings');
      }
     async noNetworkSimulation(){
        await this.page.route('**/*', route => route.abort());
        await this.page.reload();
     }
}

module.exports = { ProgramSummaryPage };