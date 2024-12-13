const { chromium } = require('playwright');
//const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: false }); // headless: false to manually approve Duo Push
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setDefaultTimeout(120000);
  // Navigate to login page and log in manually, including Duo 2FA
  await page.goto('https://pat-dev.apps.asu.edu/');
  await page.waitForURL('https://weblogin.asu.edu/cas/login?service*');
  // Fill in username and password (manual Duo interaction required for 2FA)
  await page.locator('#username').click();
  await page.locator('#username').fill('dferna50');
  await page.locator('#username').press('Tab');
  await page.locator('#password').fill('M$y3Aws4@202');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL('https://api-ab654001.duosecurity.com/**');
  await page.getByRole('button', { name: 'Yes, this is my device' }).click();
  // Wait for Duo 2FA approval manually
  // Save session state
  await page.waitForURL('https://pat-dev.apps.asu.edu/**');
  //const cookies = await page.context().cookies();
  await context.storageState({ path: 'auth.json' });
  //fs.writeFileSync('cookies.json', JSON.stringify(cookies));
  await browser.close();
  
})();