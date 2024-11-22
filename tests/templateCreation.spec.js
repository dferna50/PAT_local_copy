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
    test("Navigate to template creation page", async () => {
        await template.navigateToTemplatePage();
      await template.clickCreateTemplateButton();
    });
    test("Create a blank template", async () => {
        //await template.clickCreateTemplateButton();
        await template.createBlankTemplate(); 
       // await template.templatenameCreatorAndFinder();
    });
    test("crearte a new section with no requirment", async () => {
        //for (let i = 0; i < 10; i++){
       // await template.clickCreateTemplateButton();
        await template.createBlankTemplate();
        await template.createNewSection();
       // await template.templatenameCreatorAndFinder();
    
    });

    test("add an exisiting section to the template", async () => { 
        //await template.clickCreateTemplateButton();
       // await template.createBlankTemplate();
        await template.existingSection();
       // await template.templatenameCreatorAndFinder();
    })
    test("Edit the section and add section notes", async () => { 
       // await template.clickCreateTemplateButton();
        await template.createBlankTemplate();
        await template.createNewSection();
        await template.editSectionandAddSectionNotes();
       // await template.page.waitForTimeout(5000);
       // await template.templatenameCreatorAndFinder();
    })
    test("Add a couse type requirment", async () => { 
       // await template.clickCreateTemplateButton();
       //await template.createBlankTemplate();
        //await template.createNewSection();
        await template.addCourseTypeRequirment();
       // await template.page.waitForTimeout(5000);

        // await template.templatenameCreatorAndFinder();

    });
     test("Add a general studies requitment type" ,async () => {
    await template.createNewSection();
    await template.addGeneralStudiesRequirment();
    await template.page.waitForTimeout(2000);


     });
    //  test("add a text type requirment (custome text)" ,async () => {
    //     await template.createNewSection();
        
    //      });
    // 
    // 
    //create a text group
    // add text type requirment (prset) 
    //add a elective type requirment 
    // add a check type requirment
    //verifiy the credit hours with and without range 
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
