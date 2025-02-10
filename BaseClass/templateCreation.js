const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');
let  fakerGroupName = faker.lorem.words(4);

//let programSummaryPage;
class templateCreation{

    constructor(page) {
        this.page = page;
        this.rootLocator = page.locator('#root');
        this.alertcontent = page.locator(".alert-content")
        this.firstSection = page.locator('.px-0 > div:nth-child(2)').first();
        this.dropdowns = page.locator('#componentsContainer').getByRole('combobox')
        this.programSummaryPage = new ProgramSummaryPage(page);
        this.addSectionButton = this.page.locator(".btn-gold");
        this.createNewSectionButton = this.page.locator(".bg-maroon");
        this.sectionHeadingInput = this.page.locator("input.flex-grow-1");
        this.finalCreateSectionButton = this.page.locator(".btn-maroon").filter({ hasText: 'Create new section' });
        this.firstItemInTheSection = this.page.locator('#root > div > div.position-relative.routes-wrap > div.d-flex.justify-content-end > div > div > div > div.container > div > div > div.pt-2.mt-2 > div.d-flex.align-items-center.gap-2 > div:nth-child(1) > div > div.py-0.dropdown-menu.show > a:nth-child(2)')
        this.editSectionButton = this.page.getByRole('button', { name: 'Edit section' }).first();
        this.addSectionNotes = this.page.getByRole('button', { name: 'Add description/notes' });
        this.sectionNotesTextBox = this.page.getByPlaceholder('Describe this section or add');
        this.saveSectionNotes = this.page.getByRole('dialog').getByRole('button', { name: 'Save' });
        this.updateInLibraryButton = this.page.getByRole('button', { name: 'Update in library' });
        this.addRequirmentButton = this.page.getByRole('button', { name: '+ Add requirement' });
        this.textOptionsButton = this.page.getByRole('button', { name: 'Text Options' });
        this.newGroupButton = this.page.getByRole('button', { name: 'New group' });
        this.groupNameButton = this.page.getByRole('button', { name: 'Group name' })
        this.groupNameTextbox = this.page.getByRole('textbox').nth(1)
        this.createNewOption = this.page.getByRole('button', { name: 'Create new option' })
        this.addTextOption = this.page.getByRole('button', { name: 'Add text option' });
        this.deleteGroup = this.page.getByRole('button', { name: 'Delete group' }).first();
        this.deleteConformation = this.page.getByRole('button', { name: 'Yes, delete this group' });
        this.andOeratorButton = this.page.locator(".mb-5>.btn-maroon");
        this.minCreditHour = this.page.getByPlaceholder('Min');
        this.setRangeCheckbox = this.page.locator("#loneCheckbox1");
        this.validationRuleTab = this.page.getByRole('button', { name: 'Validation Rules' })
    }

    async navigateToTemplatePage() { 
        await this.programSummaryPage.goto();
        await this.programSummaryPage.clickTemplateLink();
        await this.programSummaryPage.waitForTemplatesPage();
        }
        async clickCreateTemplateButton(){
        await  this.page.getByRole('button', { name: '+ New template' }).click();
        await expect( this.rootLocator).toContainText('Untitled template');
        }
        async templatenameCreatorAndFinder(){
        let name = faker.lorem.word();
        await this.page.getByRole('textbox').nth(1).fill("New Template - " + name);   // template name name text box 
        await this.page.keyboard.press("Tab")
        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.alertcontent).toContainText("Template "+"'New Template - " + name + "' has been saved.")   // template succesfully create/Saved alter box
        await this.page.goBack();
        await expect(this.rootLocator).toContainText(name);
        }
        async createBlankTemplate(){
        await this.page.getByText('Untitled template').click();
        await this.page.getByRole('textbox').nth(1).click();
        await this.page.getByRole('textbox').nth(1).fill('')
        }
        async createNewSection() { 
            await this.addSectionButton.click(); 
            await this.createNewSectionButton.click();
            await this.sectionHeadingInput.fill('');
            let sectionName = faker.word.words(3);
            await this.sectionHeadingInput.fill(sectionName);
            await this.page.waitForTimeout(1000);   // Need the tests to slow down to appropertly click the button next.
            await expect(this.finalCreateSectionButton).toBeEnabled();
            await this.finalCreateSectionButton.click();
            await expect(this.firstSection).toContainText(sectionName , { timeout: 120000 })  // first section in the template
                }
                async existingSection(){ 
                    await this.addSectionButton.click(); 
                    await this.page.waitForTimeout(5000);
                    await this.firstItemInTheSection.click();   
                }
                async editSectionandAddSectionNotes() { 
                    await this.editSectionButton.click();
                    await this.addSectionNotes.click(); 
                    let notes = faker.lorem.paragraph();
                    await this.sectionNotesTextBox.fill(notes);
                    await this.saveSectionNotes.click();
                    await this.updateInLibraryButton.click();
                    await expect ( this.page.locator("#root")).toContainText(notes);        
                }
                async addCourseTypeRequirment(){ 
                    let courseSubject = ["ENG", "JPN","HST"], courseNumber = ["101","102","110"]
                    const randomIndexSubject = Math.floor(Math.random() * courseSubject.length);
                    const randomIndexNumber = Math.floor(Math.random() * courseSubject.length);
                    const randomSubject = courseSubject[randomIndexSubject], randomNumber = courseNumber[randomIndexNumber];
                    await this.editSectionButton.click();
                    await this.addRequirmentButton.click();
                    await this.page.selectOption('#componentSelect', { value: 'req_course' });
                    await this.page.getByPlaceholder('Subject').fill(randomSubject)
                    await this.page.getByPlaceholder('Number').fill(randomNumber)
                    await this.saveSectionNotes.click() // Save requirments /// reusing the same locator
                    await this.updateInLibraryButton.click();   
                    await this.page.waitForTimeout(2000);
                    await expect ( this.page.locator(".border-top-0").first()).toContainText(randomSubject+" "+randomNumber);
                                     
                }
                async addGeneralStudiesRequirment() { 
                let randomIndex = Math.floor(Math.random() * 8);
                await this.editSectionButton.click();
                await this.addRequirmentButton.click();
                await this.page.selectOption('#componentSelect', { value: 'req_gs' });
                await this.dropdowns.nth(2).click();  // general studies dropdown -- cannot add select
                for (let i = 0; i < randomIndex; i++) {
                    await this.page.keyboard.press("ArrowDown");
                  }
                await this.page.keyboard.press("Enter")
                await this.dropdowns.nth(3).click();  // level dropdown --- cannot add selectoption
                for (let i = 0; i < randomIndex-2; i++) {
                    await this.page.keyboard.press("ArrowDown");
                  }
                await this.page.keyboard.press("Enter")
                await this.saveSectionNotes.click() // Save requirments /// reusing the same locator
                await this.updateInLibraryButton.click();  
                }
                async customTextReq(){ 
                    await this.editSectionButton.click();
                    await this.addRequirmentButton.click();
                    await this.page.selectOption('#componentSelect', { value: 'req_text' });
                    await this.page.selectOption("#componentsContainer > div > div > div:nth-child(3) > div.d-flex.gap-2 > div.mb-2 > select", {value: "custom_text"})
                    let customText = faker.lorem.paragraph();
                    await this.page.locator('textarea[name="customText"]').fill(customText);
                    await this.saveSectionNotes.click() // Save requirments /// reusing the same locator
                    await this.updateInLibraryButton.click(); 
                   // await this.page.waitForTimeout(2000);
                    await expect( this.page.locator('.focus-off > div > .row')).toContainText(customText);
 }
                async createTextOption(number){ 
                   await this.textOptionsButton.click();
                   await this.newGroupButton.click();
                   await this.groupNameButton.click();
                   await this.groupNameTextbox.fill(fakerGroupName);
                    await this.createNewOption.nth(number).click();                
                    await this.page.locator('textarea').nth(number).fill(faker.lorem.paragraphs(2))
                    await this.addTextOption.click();
                    await expect(this.page.locator('.pt-2 > div')).toContainText(fakerGroupName);
                   // await this.page.waitForTimeout(2000);
                }
                async deleteTextOption() { 
                   await this.deleteGroup.click();
                   await this.deleteConformation.click();
                   await expect(this.page.locator('.pt-2 > div')).not.toContainText(fakerGroupName);
                   await this.page.waitForTimeout(2000);             
                }
                async addPresetTextOption(){ 
                    await this.editSectionButton.click();
                    await this.addRequirmentButton.click();
                    await this.page.selectOption('#componentSelect', { value: 'req_text' });
                    await this.page.selectOption("#componentsContainer > div > div > div:nth-child(3) > div.d-flex.gap-2 > div.mb-2 > select", {value: "0"})
                    //await this.page.keyboard.press("Tab");
                    await this.dropdowns.nth(3).selectOption({index: 1})
                    await this.saveSectionNotes.click() // Save requirments /// reusing the same locator
                    await this.updateInLibraryButton.click(); 
                   // await this.page.waitForTimeout(2000);
                    await expect( this.page.locator('.focus-off > div > .row')).toContainText(fakerGroupName);
                }
                async electiveReq(){
                    let courseSubject = ["ENG", "JPN","HST"] 
                    let randomIndexSubject = Math.floor(Math.random() * courseSubject.length);
                    let randomSubject = courseSubject[randomIndexSubject];
                    let randomIndex = Math.floor(Math.random() * 8);
                    await this.editSectionButton.click();
                    await this.addRequirmentButton.click();
                    await this.page.selectOption('#componentSelect', { value: 'req_elective' });
                    await this.dropdowns.nth(3).click();  // level dropdown --- cannot add selectoption
                for (let i = 0; i < randomIndex-2; i++) {
                    await this.page.keyboard.press("ArrowDown");
                  }
                await this.page.keyboard.press("Enter")
                await this.andOeratorButton.click();
                await this.page.selectOption('#componentSelect', { value: 'req_elective' });
                await this.page.selectOption('div:nth-child(2) > div > div:nth-child(4) > div:nth-child(2) > .text-gray-7', {value: 'subject'});
                for (let i = 0; i < randomIndex-2; i++) {
                    await this.page.keyboard.press("ArrowDown");
                  }
                await this.page.keyboard.press("Enter")
                await this.page.getByPlaceholder('Subject').fill(randomSubject)
                await this.saveSectionNotes.click() // Save requirments /// reusing the same locator
               // await this.updateInLibraryButton.click();
                                }
                async checkReq(){
                    await this.editSectionButton.click();
                    for(var i=0; i< 5 ; i++) {
                    await this.addRequirmentButton.click();
                    let randomIndex = Math.floor(Math.random() * 1) + 1
                    await this.page.selectOption('#componentSelect', { value: 'req_check' });
                    await this.page.selectOption("#componentsContainer > .border-bottom> .d-flex .d-flex > .text-gray-7", {index: randomIndex});
                    if(randomIndex ==1) {
                        let randomGPACatag = Math.floor(Math.random() * 3) +1
                    await this.page.selectOption("#componentsContainer > .border-bottom> .d-flex .d-flex> .p-1:nth-child(2)", {index: randomGPACatag } );
                    if(randomGPACatag ==3){
                        await this.page.locator("#componentsContainer input:nth-child(1)").fill("ENG")
                    }
                    
                    let randomGPA = Math.floor(Math.random() * 2) +1
                    await this.page.locator("#componentsContainer input:nth-child(2)").fill(randomGPA.toString());
                    }
                    await this.saveSectionNotes.click()// Save requirments /// reusing the same locator
                }
                 
                    // await this.updateInLibraryButton.click();
                }
                async creditHoursValidation() { 
                    await this.editSectionButton.click();
                    await this.addRequirmentButton.click();
                    var minCredit = Math.floor(Math.random()*5) + 1
                    await this.minCreditHour.fill(minCredit.toString());
                    await this.saveSectionNotes.click()// Save requirments /// reusing the same locator
                   await this.addRequirmentButton.click();
                   await this.minCreditHour.fill(minCredit.toString());
                    await this.page.getByText('Set range').click() // set input
                    var maxCredit = Math.floor(Math.random()*3) + minCredit
                    await this.page.getByPlaceholder("Max").fill(maxCredit.toString()) 
                    await this.saveSectionNotes.click()// Save requirments /// reusing the same locator
                  
                }
                async minimumGradeVald(){
                    await this.editSectionButton.click();
                    await this.addRequirmentButton.click();
                    await this.page.selectOption('#componentSelect', { value: 'req_text' });
                    await this.page.selectOption("#componentsContainer > div > div > div:nth-child(3) > div.d-flex.gap-2 > div.mb-2 > select", {value: "custom_text"})
                    let customText = faker.lorem.paragraph();
                    await this.page.locator('textarea[name="customText"]').fill(customText);
                    let randomminGrade = Math.floor(Math.random() * 7) +2
                    console.log("the random chosen min grade index - " + randomminGrade)
                    await this.page.selectOption("div:nth-child(5)> div:nth-child(2) > select" , {index:randomminGrade});
                    await this.saveSectionNotes.click()// Save requirments /// reusing the same locator

                }
                async validationRules(){
                    await this.validationRuleTab.click(); 
                    await this.page.locator('div').filter({ hasText: /^MinMaxUpper Division$/ }).getByRole('spinbutton').first().click();
                    await this.page.locator('div').filter({ hasText: /^MinMaxUpper Division$/ }).getByRole('spinbutton').first().fill('50');
                    await this.page.locator('div').filter({ hasText: /^MinMaxUpper Division$/ }).getByRole('spinbutton').nth(1).click();
                    await this.page.locator('div').filter({ hasText: /^MinMaxUpper Division$/ }).getByRole('spinbutton').nth(1).fill('20');
                    await this.page.locator('div').filter({ hasText: /^MinMaxUpper Division$/ }).getByRole('spinbutton').nth(1).press('Tab');
                    await this.page.locator('div').filter({ hasText: /^MinMaxUpper Division$/ }).getByRole('spinbutton').nth(2).fill('4');
                    await this.page.locator('div').filter({ hasText: /^MinMaxUpper Division$/ }).getByRole('spinbutton').nth(2).press('Tab');
                }
                async updateInLibrary() {
                    await this.updateInLibraryButton.click();
                }
                
                                
                    
                

                
}


module.exports = {templateCreation}


