const {test, except} = require('@playwright/test')

const { templateCreation } = require('../BaseClass/templateCreation.js');
test.describe('Test the Creation of templates', () => {
    let context;
    let template;

    test.beforeAll(async ({ browser }) => {
        test.setTimeout(120000);
        context = await browser.newContext({
            storageState: 'auth.json',
        });
        const page = await context.newPage();
        template = new templateCreation(page);
        await template.navigateToTemplatePage();
        await template.clickCreateTemplateButton();

    });
    test.afterAll(async () => {
        await context.close();
    });
    test("01 Navigate to template creation page", async () => {
        await template.navigateToTemplatePage();
      await template.clickCreateTemplateButton();
    });
    test("02 Create a blank template", async () => {
        await template.createBlankTemplate(); 
       // await template.templatenameCreatorAndFinder();
    });
    test("03 crearte a new section with no requirment", async () => {
        await template.createBlankTemplate();
        await template.createNewSection();
       // await template.templatenameCreatorAndFinder();
    
    });

    test("04 add an exisiting section to the template", async () => { 
        await template.existingSection();
       // await template.templatenameCreatorAndFinder();
    })
    test("05 Edit the section and add section notes", async () => { 
       // await template.clickCreateTemplateButton();
        await template.createBlankTemplate();
        await template.createNewSection();
        await template.editSectionandAddSectionNotes();
       // await template.templatenameCreatorAndFinder();
    })
    test("06 Add a couse type requirment", async () => { 
        await template.addCourseTypeRequirment();
        // await template.templatenameCreatorAndFinder();

    });
     test("07 Add a general studies requitment type" ,async () => {
    await template.createNewSection();
    await template.addGeneralStudiesRequirment();
    // await template.templatenameCreatorAndFinder();
     });
     test("08 add a text type requirment (custome text)" ,async () => {
        await template.navigateToTemplatePage();
        await template.clickCreateTemplateButton();
        await template.createNewSection();
        await template.customTextReq();  
         // await template.templatenameCreatorAndFinder();
         });
     test("09 create a text group" ,async () => {
            await template.createTextOption(0);
            // await template.templatenameCreatorAndFinder();
             });
    test("10 delete a text group" ,async () => {
            await template.createTextOption(0);
            await template.deleteTextOption();
            // await template.templatenameCreatorAndFinder();
                 });

            test("11 Create multiple text groups" ,async () => {
                for(let i =0; i<3; i++){
                await template.createTextOption(i);
                }
               // await template.templatenameCreatorAndFinder();
            });
            test("12 Add text type requirment (prset)" ,async () => {
               await template.createTextOption(0);
               await template.page.getByRole('button', { name: 'Sections', exact: true }).click(); //navigate to sections tab 
               //await template.page.locator(".inactive-tab").nth(1).
               await template.createNewSection();
               await template.addPresetTextOption()
            });
            test("13 Add a elective type requirment " ,async () => {
                await template.createNewSection();
                await template.electiveReq();

                });
             test("14 Add a Check type requirment " ,async () => {
                    await template.createNewSection();
                    await template.checkReq();
                    await template.page.waitForTimeout(2000)
                });
                test.only("verifiy the credit hours with and without range", async () => {
                    await template.createNewSection();
                    await template.creditHoursValidation();
                    //await template.updateInLibrary();  // current bug is blocking this.
                });
                            



    
    
    //add a milestone   - - -  -- 
    //
    // verify the optional field minimun grade 
    //verifiy the optional notes insidee the requirment 
    // veryfy the preview 
    // verifiy valdiation rules - with only min credit hours 
    // verifiy validation rules - with only max credit hours 
    // verifiy valdation rules - with only upper division 
    // verify validation riles - all theree (min, max, upper division)
    //general studies specific - credit hour, ud and gpa min 
    //crete milestones 
    //select from exisitig  seciton 
    // creste subsections 
    // add requirment to subsection 
    //create multiple subsections 
    // add multiple requirment 
    //reorder sections
    // add multiple requirmet to section 
    // add multiple requirment to subsection 
    // reorder requirment 
    // delete section
    // delete subseection 
    // delete requirment 
    // edit requirment 
    // edit subsection 
    // edit section



});
