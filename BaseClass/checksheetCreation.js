const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');
class checksheetCreation{

    constructor(page) {
        this.page = page;
        this.programSummaryPage = new ProgramSummaryPage(page);
        this.statusButton = page.locator('button').filter({ hasText: 'Status' });
        this.programsList = page.locator('.text-gray-7');
        this.newChecksheetLabel = page.getByText('New checksheet');
        this.createFromBlankChecksheetRadio = page.locator('.form-check-label').first();
        this.createChecksheetButton = page.getByRole('button', { name: 'Create checksheet' });
        this.validationRulesHeading = page.getByRole('heading', { name: 'Validation Rules' });
        this.addRequirmentButton = page.getByRole('button', { name: '+ Add requirement' }).first();
        this.lockChecksheetButton = page.getByRole('button', { name: ' Lock' })
        this.subjectTextBox = page.getByPlaceholder('Subject');
        this.courseNumberTextBox = page.getByPlaceholder('Number'); 
        this.courseListButton = page.getByRole('button', { name: 'Course Lists' })
        this.newCourseListButton = page.getByRole('button', { name: 'New Course List' })
        this.defaultCourseListName = page.getByPlaceholder('Untitled course list');
        this.newItemButton = page.getByRole('button', { name: 'New item' })
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }
    async navigateToChecksheetPage() { 
        await this.programSummaryPage.goto();
        await this.page.waitForTimeout(2000);
        await this.programSummaryPage.checkLinkAccessibility(this.programSummaryPage.programsLink);
        await this.programSummaryPage.clickProgramsLink();
        await this.programSummaryPage.waitForProgramsPage();
        }

        async navigateToStatusTabAndSelect(optionIndex) {
            await this.statusButton.click();
            for (let i = 0; i < optionIndex; i++) {
                await this.page.keyboard.press('Tab');
            }
            await this.page.keyboard.press('Space');
//            await this.statusButton.click();  
        }
        async createBlankChecksheet() {
           // console.log("The element pushed is = "+ element)  //
           await this.programsList.first().waitFor({ state: 'visible' });
          // await this.page.waitForTimeout(10000);
           const elements = await this.programsList.all({ timeout: 15000 });
           if (elements.length === 0) {
               throw new Error("No program elements found to select.");
           }
           const randomIndex2 = Math.floor(Math.random() * 20);
           await elements[randomIndex2].scrollIntoViewIfNeeded({ timeout: 15000 });
           if (await elements[randomIndex2].isVisible({ timeout: 15000 })) {
               await elements[randomIndex2].click({ timeout: 15000 });
           } else {
               console.error("Element is not visible");
               await this.page.waitForTimeout(5000);
               await elements[randomIndex2].click({ timeout: 15000 });
           }


       expect(await this.page.getByText('New checksheet')).toBeVisible({timeout: 15000});
       await this.createFromBlankChecksheetRadio.click({timeout: 15000});
       await this.createChecksheetButton.click({timeout: 15000});
        await this.page.getByText('Choose Template').click({timeout: 15000});
        await  this.page.waitForTimeout(5000);  // timeout to wait for drop-down to load, can be handled better :)
        await this.page.waitForSelector('.dropdown-menu.show');
        const dropdownItems = await this.page.$$('.dropdown-menu.show .dropdown-item');
        const randomIndex = Math.floor(Math.random() * dropdownItems.length);
        await dropdownItems[randomIndex].click();
        //console.log(`Clicked item: ${await dropdownItems[randomIndex].innerText()}`);
        await expect(this.validationRulesHeading).toBeVisible({timeout: 15000});
        }
        async addRequirment(){
            await this.addRequirmentButton.click();
        }
        async lockChecksheet(){
            await this.lockChecksheetButton.click();
            await this.page.waitForTimeout(2000);

        }
        async addNewCourseTypeRequirment(){
            await this.page.selectOption("#componentSelect", {value: "req_course"});
            await this.subjectTextBox.fill(faker.lorem.word(3).toString());
            await this.courseNumberTextBox .fill(faker.lorem.word(3).toString());
            await this.saveButton.click(); 
        }

        async createNewCourseList(){  
            await this.page.waitForTimeout(2000);   
            await this.courseListButton.click();
            await this.newCourseListButton.click();
            await this.defaultCourseListName.click();
            await this.defaultCourseListName.fill(faker.lorem.words(2).toString());
            for(let i = 0; i < 10; i++){
            await this.newItemButton.click();
            await this.subjectTextBox.click();
            await this.subjectTextBox.fill(faker.lorem.word(3) .toString());
            await this.courseNumberTextBox.click();
            await this.courseNumberTextBox .fill(faker.lorem.word(3).toString());
            }
            await this.saveButton.click();
        }
        async editCourseList(){
            await this.page.locator('.pt-1>div').first().click();
            await this.page.locator('.mb-6 > input').click();
            await this.page.locator('.mb-6 > input').fill("Edited Course List");
            await this.page.locator('div:nth-child(3) > svg').first().click(); // delete the item in the course list
            await this.page.locator('.border-gray-2 > div > div:nth-child(2)').first().click(); // edit the item in the course list
            for(let i = 0; i < 5; i++){
               await this.newItemButton.click();
               await this.subjectTextBox.click();
               await this.subjectTextBox.fill(faker.lorem.word(3) .toString());
               await this.courseNumberTextBox .click();
               await this.courseNumberTextBox .fill(faker.lorem.word(3).toString());
               }
               await this.saveButton.click();     
              
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
            const element2 = await this.page.locator('.flex-grow-1 > div:nth-child(1) > div.fw-bold').first().textContent();
            expect(element2).toContain(type);
            const element3 = await this.page.locator('.flex-grow-1 > div.mt-2').first().textContent();
              expect(await element3).toContain("Message: " + approveMessage);
        }




}
module.exports = {checksheetCreation}

