
import { test, expect, chromium } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

// Helper to connect to LambdaTest
async function connectLT(testName) {
  const capabilities = {
    browserName: 'Chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'Playwright Sample Build',
      name: testName,
      network: true,
      console: true,
      video: true,
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY
    }
  };

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
      JSON.stringify(capabilities)
    )}`
  });

  const page = await browser.newPage();
  return { browser, page };
}

// ------------------ Test Scenario 1 ------------------
test('Simple Form Demo', async () => {
  const { browser, page } = await connectLT('Simple Form Demo');

  await page.goto('https://www.lambdatest.com/selenium-playground', {
    waitUntil: 'domcontentloaded'
  });
  await page.getByText('Simple Form Demo').click({ timeout: 50000 });
  await expect(page).toHaveURL(/.*simple-form-demo/);

  const InpuMessage = 'Welcome to LambdaTest';
  await page.getByPlaceholder('Please enter your Message').fill(InpuMessage);
  await page.getByText('Get Checked Value').click();
  await expect(page.locator('#message')).toHaveText(InpuMessage, { timeout: 90000 });

  await browser.close();
});

// ------------------ Test Scenario 2 ------------------
test('Drag & Drop Sliders', async () => {
  const { browser, page } = await connectLT('Drag & Drop Sliders');

  await page.goto('https://www.lambdatest.com/selenium-playground', {
    waitUntil: 'domcontentloaded'
  });
  await page.getByText('Drag & Drop Sliders').click();
  await page.locator('#slider3').getByRole('slider').fill('95');

  await browser.close();
});

// ------------------ Test Scenario 3 ------------------
test('Input Form Submit', async () => {
  const { browser, page } = await connectLT('Input Form Submit');

  await page.goto('https://www.lambdatest.com/selenium-playground', {
    waitUntil: 'domcontentloaded'
  });

  await page.getByText('Input Form Submit').click();
  await page.getByRole('button', { name: 'Submit' }).click();

  const name = page.getByRole('textbox', { name: 'Name' });
  const validationMessage = await name.evaluate(el => el.validationMessage);
  await expect(validationMessage).toContain('Please fill out this field.');

  await name.fill('ABC');
  await page.getByRole('textbox', { name: 'Email*' }).fill('abc@gmail.com');
  await page.getByPlaceholder('Password').fill('Abc!1');
  await page.getByPlaceholder('Company').fill('Plantech');
  await page.getByPlaceholder('Website').fill('https://abc.com');
  await page.selectOption('select[name=country]', { label: 'United States' });
  await page.getByPlaceholder('City').fill('Hyd');
  await page.getByPlaceholder('Address 1').fill('Address-one');
  await page.getByPlaceholder('Address 2').fill('Address-two');
  await page.getByPlaceholder('State').fill('Telengana');
  await page.getByPlaceholder('Zip code').fill('523880');
  await page.getByRole('button', { name: 'Submit' }).click();

  const Message = await page.getByText('Thanks for contacting us, we will get back to you shortly');
  await Message.scrollIntoViewIfNeeded();
  await expect(Message).toBeVisible({ timeout: 90000 });

  await browser.close();
});


