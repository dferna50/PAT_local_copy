const {test, expect} = require('@playwright/test')
const { faker } = require('@faker-js/faker');
const { checksheetCreation } = require('../BaseClass/checksheetCreation.js');
const { programListPage } = require('../BaseClass/programListPage.js');
let usedCourses = []

test.describe('Test the Creation of checksheets', () => {
    let context;
    let checksheet, programlist;
    test.beforeEach(async ({ browser }) => {
        //test.setTimeout(120000);
        context = await browser.newContext({
            storageState: 'auth.json',
        });
        const page = await context.newPage();
        checksheet = new checksheetCreation(page);
        programlist = new programListPage(page);
        await checksheet.navigateToChecksheetPage();
    });
    test.afterAll(async () => {
        // await checksheet.navigateToChecksheetPage();
        // await checksheet.navigateToStatusTabAndSelect(2);
        // for (const element of usedCourses) {
        //     await checksheet.page.locator('.text-gray-7', { hasText: element }).click();
        //     await checksheet.page.getByRole('button', { name: 'Delete' }).click();
        //     await checksheet.page.getByRole('button', { name: 'Confirm' }).click();
        //     await checksheet.page.waitForTimeout(1000); // Wait for deletion to complete
        // }
        await context.close();
    });

    test("test navigation to the programs summary page", async() => {

    });
    test("Create a new checksheet - create from blank checksheet", async () => { 
        await checksheet.navigateToStatusTabAndSelect(2);
        const element = await checksheet.page.locator('.text-gray-7').first().textContent();
        usedCourses.push(element);
     await checksheet.createBlankChecksheet(element);
      await  checksheet.page.waitForTimeout(2000);    

    })
    test("Create a new checksheet - add new course type requirment", async () => {
        await checksheet.navigateToStatusTabAndSelect(2);
        const element = await checksheet.page.locator('.text-gray-7').first().textContent();
        usedCourses.push(element);
     await checksheet.createBlankChecksheet(element);
        await checksheet.lockChecksheet();
        await checksheet.addRequirment();
        await checksheet.addNewCourseTypeRequirment();
        await checksheet.page.waitForTimeout(2000);    
    });
    test("Create a new checksheet - create a new course list", async () => {
        await checksheet.navigateToStatusTabAndSelect(2);
        const element = await checksheet.page.locator('.text-gray-7').first().textContent();
        usedCourses.push(element);
     await checksheet.createBlankChecksheet(element);
     await checksheet.lockChecksheet();
     await checksheet.createNewCourseList();
     await checksheet.page.waitForTimeout(2000);   



    });
    test("Create a new checksheet - edit exsiting course list", async () => {
        await checksheet.navigateToStatusTabAndSelect(2);
        const element = await checksheet.page.locator('.text-gray-7').first().textContent();
        usedCourses.push(element);
     await checksheet.createBlankChecksheet(element);
     await checksheet.lockChecksheet();
     await checksheet.createNewCourseList();
     await checksheet.editCourseList();
        await checksheet.page.waitForTimeout(2000);   


    });
    test("Approve a checksheet", async () => {
        await checksheet.navigateToStatusTabAndSelect(2);
        const element = await checksheet.page.locator('.text-gray-7').first().textContent();
        usedCourses.push(element);
     await checksheet.createBlankChecksheet(element);
     await checksheet.lockChecksheet();
     const approveMessage = faker.lorem.sentence()
    await checksheet.approveChecksheet(approveMessage);
    await checksheet.page.reload();
     await checksheet.checkChecksheetHistory(approveMessage, 'Submitted to DARS');

     await checksheet.page.waitForTimeout(2000); 
    });  
    test("return a checksheet to college", async () => {   
        await checksheet.navigateToStatusTabAndSelect(2);
        const element = await checksheet.page.locator('.text-gray-7').first().textContent();
        usedCourses.push(element);
     await checksheet.createBlankChecksheet(element);
     await checksheet.lockChecksheet();
     await checksheet.page.locator('.button-link').click(); 
     const returnReason = faker.lorem.sentence() 
     await checksheet.page.locator('.mb-6').fill(returnReason);
     await checksheet.page.getByRole('button', { name: 'Submit' }).click();
     await checksheet.page.getByRole('button', { name: 'Okay' }).click();
     await checksheet.page.waitForTimeout(2000); 
      expect( await checksheet.page.locator('.mb-1 > div').textContent()).toContain('Pending college/school submission');
      await checksheet.page.reload();
      await checksheet.checkChecksheetHistory(returnReason, 'Returned to college/school');



      
    })
    test("return a checksheet to department", async () => {   
        await checksheet.navigateToStatusTabAndSelect(2);
        const element = await checksheet.page.locator('.text-gray-7').first().textContent();
        usedCourses.push(element);
     await checksheet.createBlankChecksheet(element);
     await checksheet.lockChecksheet();
     await checksheet.page.locator('.button-link').click(); 
     const returnReason = faker.lorem.sentence() 
     await checksheet.page.locator('.mb-6').fill(returnReason)
    await checksheet.page.locator('#departmentRadio').click();
    await checksheet.page.getByRole('button', { name: 'Submit' }).click();
    await checksheet.page.getByRole('button', { name: 'Okay' }).click()
     await checksheet.page.waitForTimeout(2000); 
     expect( await checksheet.page.locator('.mb-1 > div').textContent()).toContain('Pending department submission');
      await checksheet.page.reload();
     await checksheet.checkChecksheetHistory(returnReason, 'Returned to department');

    });

    test("Create a subsection", async () => {
        await checksheet.navigateToStatusTabAndSelect(2);
        const element = await checksheet.page.locator('.text-gray-7').first().textContent();
        usedCourses.push(element);
     await checksheet.createBlankChecksheet(element);
     await checksheet.lockChecksheet();
     await checksheet.createNewSubSection();
     await checksheet.page.waitForTimeout(2000);  

    });

    test("add requirment to the subsection", async () => {
        await checksheet.navigateToStatusTabAndSelect(2);
        const element = await checksheet.page.locator('.text-gray-7').first().textContent();
        usedCourses.push(element);
     await checksheet.createBlankChecksheet(element);
     await checksheet.lockChecksheet();
      
     await checksheet.createNewSubSection();
     await checksheet.page.getByRole('button', { name: '+ Add requirement' }).nth(1).click();
     await checksheet.addNewCourseTypeRequirment();
     await checksheet.page.waitForTimeout(2000);  
    })



        });


