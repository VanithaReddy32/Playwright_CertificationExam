import{test, expect} from '@playwright/test'

test('Drag & Drop Sliders', async({page})=>{

  await page.goto('https://www.lambdatest.com/selenium-playground', 
  {
    waitUntil: 'domcontentloaded'
  }) 
await page.getByText('Drag & Drop Sliders').click()
 await page.locator('#slider3').getByRole('slider').fill('95');

})