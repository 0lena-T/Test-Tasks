import loginPage from '../pageobjects/login.page.js'
import { expect } from 'expect-webdriverio'
import { URLS } from '../pageobjects/constants.js'

describe('User on the login page', () => {
    beforeEach(async () => {     
        await loginPage.open()
    })
    it('Data is entered to the Login field.', async () => {
        await loginPage.enterUsername('standard_user')
        const entered = await loginPage.inputUsername.getValue()
        await expect(entered).toBe('standard_user')
    })
    it('Data is entered to the password field and represented as dots.', async () => {
        await loginPage.enterPassword('secret_sauce')
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password')
    })
    it('Should login with valid credentials.', async () => {
        await loginPage.login('standard_user', 'secret_sauce')
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain(URLS.INVENTORY_PAGE)
    })
    it('User redirected to the inventory page.', async () => {
        await loginPage.login('standard_user', 'secret_sauce')
        await expect(loginPage.pageTitle).toBeDisplayed()
        await expect(loginPage.pageTitle).toHaveText('Products')
        await expect(loginPage.cartLink).toBeDisplayed()
    })
})