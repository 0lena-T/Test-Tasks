import loginPage from '../pageobjects/login.page.js'
import { expect } from 'expect-webdriverio'
import { ERROR_MESSAGES } from '../pageobjects/constants.js'

describe('Login with locked out test login.', () => {
    beforeEach(async () => {     
        await loginPage.open()
    })
    it('Data is entered to the Login field.', async () => {
        await loginPage.enterUsername('locked_out_user')
        const entered = await loginPage.inputUsername.getValue()
        await expect(entered).toBe('locked_out_user')
    })
    it('Data is entered to the field and represented as dots', async () => {
        await loginPage.enterPassword('secret_sauce')
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password')
    })
    it('Should show error for locked out user.', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce')
        const errorMessage = await loginPage.getErrorMessage()
        await expect(errorMessage).toContain(ERROR_MESSAGES.LOCKED_OUT_USER_ERROR)
    })
    it('check x icons', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce')
        const iconsCount = await loginPage.getErrorIconsCount()
        await expect(iconsCount).toBe(2)
    })
    it('Check red fields.', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce')
        const fieldsRed = await loginPage.areFieldsRed()
        await expect(fieldsRed).toBe(true)
    })
})