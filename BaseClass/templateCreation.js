const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { ProgramSummaryPage } = require('../BaseClass/ProgramSummary.js');
//let programSummaryPage;
class templateCreation{

    constructor(page) {
        this.page = page;
        this.programSummaryPage = new ProgramSummaryPage(page);
        this.addSectionButton = this.page.locator(".btn-gold");
        this.createNewSectionButton = this.page.locator(".bg-maroon");
        this.sectionHeadingInput = this.page.locator("input.flex-grow-1");
        this.finalCreateSectionButton = this.page.locator(".btn-maroon").filter({ hasText: 'Create new section' });
        this.firstItemInTheSection = this.page.locator('#root > div > div.position-relative.routes-wrap > div.d-flex.justify-content-end > div > div > div > div.container > div > div > div.pt-2.mt-2 > div.d-flex.align-items-center.gap-2 > div:nth-child(1) > div > div.py-0.dropdown-menu.show > a:nth-child(2)')
        //this.firstSectionname = this.page.locator(".lh-1");
        this.editSectionButton = this.page.getByRole('button', { name: 'Edit section' });
        this.addSectionNotes = this.page.getByRole('button', { name: 'Add description/notes' });
        this.sectionNotesTextBox = this.page.getByPlaceholder('Describe this section or add');
        this.saveSectionNotes = this.page.getByRole('dialog').getByRole('button', { name: 'Save' });
        this.updateInLibraryButton = this.page.getByRole('button', { name: 'Update in library' });
        this.addRequirmentButton = this.page.getByRole('button', { name: '+ Add requirement' });
    }

    async navigateToTemplatePage() { 
        await this.programSummaryPage.goto();
//await this.programSummaryPage.checkLinkAccessibility(this.programSummaryPage.templatesLink);
        await this.programSummaryPage.clickTemplateLink();
        await this.programSummaryPage.waitForTemplatesPage();
        }
        async clickCreateTemplateButton(){
        await  this.page.getByRole('button', { name: '+ New template' }).click();
       expect(await this.page.locator('#root')).toContainText('Untitled template');
        }
        async templatenameCreatorAndFinder(){
        let name = faker.lorem.word();
        await this.page.getByRole('textbox').nth(1).fill("New Template - " + name);   // template name name text box 
        await this.page.keyboard.press("Tab")
        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.page.locator(".alert-content")).toContainText("Template "+"'New Template - " + name + "' has been saved.")   // template succesfully create/Saved alter box
        await this.page.goBack();
        await expect(this.page.locator('#root')).toContainText(name);
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
            let sectionName = faker.location.street();
            await this.sectionHeadingInput.fill("New Section - " + sectionName);
            await this.finalCreateSectionButton.click();
            await expect(this.page.locator(".lh-1")).toContainText("New Section - " + sectionName)  // first section in the template
                }
                async existingSection(){ 
                    await this.addSectionButton.click(); 
                    await this.page.waitForTimeout(2000);
                    await this.firstItemInTheSection.click();   
                }
                async editSectionandAddSectionNotes() { 
                    await this.editSectionButton.click();
                    await this.addSectionNotes.click(); 
                    let notes = faker.lorem.paragraph();
                    await this.sectionNotesTextBox.fill(notes);
                    await this.saveSectionNotes.click();
                    await this.updateInLibraryButton.click();
                    expect (await this.page.locator("#root")).toContainText(notes);        
                }
                async addCourseTypeRequirment(){ 
                    let courseSubject = ["ENG", "JPN","HST"] 
                    let randomIndexSubject = Math.floor(Math.random() * courseSubject.length);
                    let randomSubject = courseSubject[randomIndexSubject];
                    let courseNumber = ["101","102","110"]
                    let randomIndexNumber = Math.floor(Math.random() * courseSubject.length);
                    let randomNumber = courseNumber[randomIndexNumber];
                    await this.editSectionButton.click();
                    await this.addRequirmentButton.click();
                    await this.page.selectOption('#componentSelect', { value: 'req_course' });
                    await this.page.getByPlaceholder('Subject').fill(randomSubject)
                    await this.page.getByPlaceholder('Number').fill(randomNumber)
                    await this.saveSectionNotes.click() // Save requirments /// reusing the same locator
                    await this.updateInLibraryButton.click();   
                    await this.page.waitForTimeout(2000);
                    expect (await this.page.locator(".border-top-0").first()).toContainText(randomSubject+" "+randomNumber);
                                     
                }
                async addGeneralStudiesRequirment() { 
                let randomIndex = Math.floor(Math.random() * 8);
                await this.editSectionButton.click();
                await this.addRequirmentButton.click();
                await this.page.selectOption('#componentSelect', { value: 'req_gs' });
                await this.page.locator('#componentsContainer').getByRole('combobox').nth(2).click();  // general studies dropdown -- cannot add select
                for (let i = 0; i < randomIndex; i++) {
                    await this.page.keyboard.press("ArrowDown");
                  }
                await this.page.keyboard.press("Enter")
                await this.page.locator('#componentsContainer').getByRole('combobox').nth(3).click();  // level dropdown --- cannot add selectoption
                for (let i = 0; i < randomIndex-2; i++) {
                    await this.page.keyboard.press("ArrowDown");
                  }
                await this.page.keyboard.press("Enter")
                await this.saveSectionNotes.click() // Save requirments /// reusing the same locator
                await this.updateInLibraryButton.click();  
              // expect( await this.page.getByText('No requirements added')).toBeHidden();
                //await this.page.waitForTimeout(2000);


                

                }
                
}


module.exports = {templateCreation}


