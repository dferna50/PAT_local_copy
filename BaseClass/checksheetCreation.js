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

        async navigateToStatusTabAndSelect(optionIndex) {
            await this.page.locator('button').filter({ hasText: 'Status' }).click();
            for (let i = 0; i < optionIndex; i++) {
                await this.page.keyboard.press('Tab');
            }
            await this.page.keyboard.press('Space');
        }
        async createBlankChecksheet(element) {
            console.log("The element pused is = "+ element)
           const elements = await this.page.locator('.text-gray-7').all();
           const randomIndex2 = Math.floor(Math.random() * elements.length);
           if (await elements[randomIndex2].isVisible()) {
            await elements[randomIndex2].click();
        } else {
            console.error("Element is not visible");
        }

       expect(await this.page.getByText('New checksheet')).toBeVisible();
       await this.page.locator('.form-check-label').first().click();
       await this.page.locator(".btn-gold").click();
        await this.page.getByText('Choose Template').click();
        await  this.page.waitForTimeout(5000);
        await this.page.waitForSelector('.dropdown-menu.show');
        const dropdownItems = await this.page.$$('.dropdown-menu.show .dropdown-item');
        const randomIndex = Math.floor(Math.random() * dropdownItems.length);
        await dropdownItems[randomIndex].click();
        console.log(`Clicked item: ${await dropdownItems[randomIndex].innerText()}`);
        await expect(this.page.getByRole('heading', { name: 'Validation Rules' })).toBeVisible();
        }
        async addRequirment(){
            await this.page.getByRole('button', { name: '+ Add requirement' }).click();
        }
        async lockChecksheet(){
            await this.page.getByRole('button', { name: ' Lock' }).click();
            await this.page.waitForTimeout(2000);

        }
        async addNewCourseTypeRequirment(){
            await this.page.selectOption("#componentSelect", {value: "req_course"});
            await this.page.getByPlaceholder('Subject').fill("ENG");
            await this.page.getByPlaceholder('Number').fill("101");
            await this.page.getByRole('button', { name: 'Save' }).click(); 
        }

        async createNewCourseList(){  
            await this.page.waitForTimeout(2000);   
            await this.page.getByRole('button', { name: 'Course Lists' }).click();
            await this.page.getByRole('button', { name: 'New Course List' }).click();
            await this.page.getByPlaceholder('Untitled course list').click();
            await this.page.getByPlaceholder('Untitled course list').fill(faker.lorem.words(2).toString());
            for(let i = 0; i < 10; i++){
            await this.page.getByRole('button', { name: 'New item' }).click();
            await this.page.getByPlaceholder('Subject').click();
            await this.page.getByPlaceholder('Subject').fill(faker.lorem.word(3) .toString());
            await this.page.getByPlaceholder('Number').click();
            await this.page.getByPlaceholder('Number').fill(faker.lorem.word(3).toString());
            }
            await this.page.getByRole('button', { name: 'Save' }).click();
        }
        async editCourseList(){
            await this.page.locator('.pt-1>div').first().click();
            await this.page.locator('.mb-6 > input').click();
            await this.page.locator('.mb-6 > input').fill("Edited Course List");
            await this.page.locator('div:nth-child(3) > svg').first().click(); // delete the item in the course list
            await this.page.locator('.border-gray-2 > div > div:nth-child(2)').first().click(); // edit the item in the course list
            for(let i = 0; i < 5; i++){
               await this.page.getByRole('button', { name: 'New item' }).click();
               await this.page.getByPlaceholder('Subject').click();
               await this.page.getByPlaceholder('Subject').fill(faker.lorem.word(3) .toString());
               await this.page.getByPlaceholder('Number').click();
               await this.page.getByPlaceholder('Number').fill(faker.lorem.word(3).toString());
               }
               await this.page.getByRole('button', { name: 'Save' }).click();     
              
            }
            async approveChecksheet(element){ 
                await this.page.getByRole('button', { name: ' Approve' }).click();
            await this.page.getByPlaceholder('Write your message here...').click();
            await this.page.getByPlaceholder('Write your message here...').fill(element);
            await this.page.getByRole('button', { name: 'Submit' }).click();
            await expect(this.page.getByText('Checksheet submitted.')).toBeVisible();
            await this.page.getByRole('button', { name: 'Okay' }).click();
            await expect(this.page.getByText('Pending DARS encoding')).toBeVisible();

        }
        async createNewSubSection(){
            await this.page.getByRole('button', { name: 'Create subsection' }).first().click();
            await this.page.locator('.p-1').click();
            await this.page.locator('.p-1').fill(faker.lorem.words(2).toString());
            await this.page.keyboard.press('Tab');


        }

        async checkChecksheetHistory(approveMessage, type){
            await this.page.getByRole('button', { name: 'History' }).click();
            const element2 = await this.page.locator('.scrollbox > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(1) > div.fw-bold').textContent();
            expect(element2).toContain(type);
            const element3 = await this.page.locator('.scrollbox > div > div:nth-child(1) > div > div:nth-child(2) > div.mt-2').textContent();
              expect(await element3).toContain("Message: " + approveMessage);
        }




}
module.exports = {checksheetCreation}

