const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');
class checksheetCreation{

    constructor(page) {
        this.page = page;
        this.programSummaryPage = new ProgramSummaryPage(page);

    }
    async navigateToChecksheetPage() { 
        await this.programSummaryPage.goto();
        await this.page.waitForTimeout(2000);
        await this.programSummaryPage.checkLinkAccessibility(this.programSummaryPage.programsLink);
        await this.programSummaryPage.clickProgramsLink();
        await this.programSummaryPage.waitForProgramsPage();
        }


}
module.exports = {checksheetCreation}

