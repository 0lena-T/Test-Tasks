import { browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import { expect } from 'expect-webdriverio'

describe('Login with locked out test login.', () => {

    beforeEach(async () => {     
        await LoginPage.open()
    })

    it('Data is entered to the Login field.', async () => {

        await LoginPage.inputUsername.setValue('locked_out_user')

        const entered = await LoginPage.inputUsername.getValue()
        await expect(entered).toBe('locked_out_user')
    }
    )

    it('Data is entered to the field and represented as dots', async () => {

        await LoginPage.inputPassword.setValue('secret_sauce')

        const input = await LoginPage.inputPassword
        await expect(input).toHaveAttribute('type', 'password')
    })

    it('Should show error for locked out user.', async () => {

        await LoginPage.login('locked_out_user', 'secret_sauce')

        const errorMessage = await LoginPage.errorMessage.getText()
        await expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.')
    })

    it('check x icons', async () => {
        
        await LoginPage.login('locked_out_user', 'secret_sauce')

        const icons = await LoginPage.errorIcons
        if (icons.length !== 2) {
        throw new Error(`must be 2 icons, but find: ${icons.length}`)
        }
    })
    
    it('Check red fields.', async () => {

        await LoginPage.login('locked_out_user', 'secret_sauce')

       const usernameClass = await LoginPage.inputUsername.getAttribute('class')
       if (!usernameClass.includes('input_error')) {
        throw new Error('Login field not red.')}

       const passwordClass = await LoginPage.inputPassword.getAttribute('class')
       if(!passwordClass.includes('input_error')) {
        throw new Error('Password field not red.')
       }})
})

