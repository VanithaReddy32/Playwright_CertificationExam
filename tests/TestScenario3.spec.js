import{test, expect} from '@playwright/test'

test('Input Form Submit', async({page})=>{

    await page.goto('https://www.lambdatest.com/selenium-playground/' , 
    {
    waitUntil: 'domcontentloaded'
    })

    await page.getByText('Input Form Submit').click()
    await page.getByRole('button', { name: 'Submit' }).click()

    let name =page.getByRole('textbox', { name: 'Name' })

    const validationMessage = await name.evaluate((element) => {
        return element.validationMessage
    });
    await expect(validationMessage).toContain('Please fill out this field.')

    await name.fill('ABC')
    await page.getByRole('textbox', { name: 'Email*' }).fill('abc@gmail.com')
    await page.getByPlaceholder('Password').fill('Abc!1')
    await page.getByPlaceholder('Company').fill('Plantech')
    await page.getByPlaceholder('Website').fill('https://abc.com')
    await page.selectOption('select[name=country]',{ label: 'United States' } )
    await page.getByPlaceholder('City').fill('Hyd')
    await page.getByPlaceholder('Address 1').fill('Address-one')
    await page.getByPlaceholder('Address 2').fill('Address-two')
    await page.getByPlaceholder('State').fill('Telengana')
    await page.getByPlaceholder('Zip code').fill('523880')
     await page.getByRole('button', { name: 'Submit' }).click()


    const Message = await page.getByText('Thanks for contacting us, we will get back to you shortly')
    await Message.scrollIntoViewIfNeeded()
    await expect(Message).toBeVisible({timeout: 90000})

})
