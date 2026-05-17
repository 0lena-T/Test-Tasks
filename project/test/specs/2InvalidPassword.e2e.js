import loginPage from '../pageobjects/login.page.js'
import { expect } from 'expect-webdriverio'
import { ERROR_MESSAGES } from '../pageobjects/constants.js'

describe('Login with invalid password', () => { 
    beforeEach(async () => {     
        await loginPage.open()
    })
    it('Data is entered to the Login field.', async () => {
        await loginPage.enterUsername('standard_user')
        const entered = await loginPage.inputUsername.getValue()
        await expect(entered).toBe('standard_user')
    })
    it('Data is entered to the field and represented as dots', async () => {
        await loginPage.enterPassword('non_sauce')
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password')
    })
    it('Should login with invalid credentials.', async () => {
        await loginPage.login('standard_user', 'non_sauce')
        const errorMessage = await loginPage.getErrorMessage()
        await expect(errorMessage).toContain(ERROR_MESSAGES.INVALID_CREDENTIALS_ERROR)
    })
    it('check x icons', async () => {  
        await loginPage.login('standard_user', 'non_sauce') 
        const iconsCount = await loginPage.getErrorIconsCount()
        await expect(iconsCount).toBe(2)
        })
    it('check red fields', async () => {
        await loginPage.login('standard_user', 'non_sauce')
        const fieldsRed = await loginPage.areFieldsRed()
        await expect(fieldsRed).toBe(true)
    })
})