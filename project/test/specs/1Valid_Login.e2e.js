import { browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import { expect } from 'expect-webdriverio'

describe('User on the login page', () => {

    beforeEach(async () => {     
        await LoginPage.open()
    })

    it('Data is entered to the Login field.', async () => {

        await LoginPage.inputUsername.setValue('standard_user')

        const entered = await LoginPage.inputUsername.getValue()
        await expect(entered).toBe('standard_user')
    }
    )

    it('Data is entered to the password field and represented as dots.', async () => {
        
        await LoginPage.inputPassword.setValue('secret_sauce')

        const input = await LoginPage.inputPassword
        await expect(input).toHaveAttribute('type', 'password')
    })

    it('Should login with valid credentials.', async () => {

        await LoginPage.login('standard_user', 'secret_sauce')

        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain('inventory.html')
    })
    
    it('User redirected to the inventory page.', async () => {

        await LoginPage.login('standard_user', 'secret_sauce')
        const title = await $('.title')
        await expect(title).toBeDisplayed()
        await expect(title).toHaveText('Products')

        const cart = await $('.shopping_cart_link')
        await expect(cart).toBeDisplayed()
    })
})
