import{test, expect} from '@playwright/test'

test('Simple Form Demo', async({page})=>{

  await page.goto('https://www.lambdatest.com/selenium-playground', 
  {
    waitUntil: 'domcontentloaded'
  }) 
  await page.getByText('Simple Form Demo').click({timeout:50000})
  await expect(page).toHaveURL(/.*simple-form-demo/)
  
  const InpuMessage = "Welcome to LambdaTest"
  await page.getByPlaceholder('Please enter your Message').fill(InpuMessage)
  await page.getByText('Get Checked Value').click()
  await expect(page.locator('#message')).toHaveText(InpuMessage, {timeout: 90000})
  

})