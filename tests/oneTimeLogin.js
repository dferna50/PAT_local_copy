const { chromium } = require('playwright');
//const loginData = require('./BaseClass/loginData.json');

(async () => {
  const browser = await chromium.launch({ headless: false }); // Forcefully opening the browser in headful mode
  const context = await browser.newContext(); //creating new browser context
  const page = await context.newPage();  //creating new page in the browser context
  page.setDefaultTimeout(120000);   //setting the default timeout for the page so that the page would not timeout before the test completes(because of the time it takes to login via duo push )
  // Navigate to login page and log in manually, including Duo 2FA
  await page.goto('https://pat-dev.apps.asu.edu/'); 
  await page.waitForURL('https://weblogin.asu.edu/cas/login?service*'); // waiting for the redirect page(i.e the duo login page) to load
  // Fill in username and password (manual Duo interaction required for 2FA)
  await page.locator('#username').click();
  await page.locator('#username').fill('dferna50'); 
  await page.locator('#username').press('Tab');
  await page.locator('#password').fill('M$y3Aws4@202');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL('https://api-ab654001.duosecurity.com/**');
  await page.getByRole('button', { name: 'Yes, this is my device' }).click();
  await page.waitForURL('https://pat-dev.apps.asu.edu/**');
  await context.storageState({ path: 'auth.json' });
  await browser.close();
  
})();