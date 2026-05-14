import { browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import { expect } from 'expect-webdriverio'

describe('Login with invalid password', () => {
    
    beforeEach(async () => {     
        await LoginPage.open()
        await LoginPage.login('standard_user', 'non_sauce')
    })

    it('Data is entered to the Login field.', async () => {

        await LoginPage.open()
        await LoginPage.inputUsername.setValue('standard_user')

        const entered = await LoginPage.inputUsername.getValue()
        await expect(entered).toBe('standard_user')
    })

    it('Should login with invalid credentials.', async () => {

        const errorMessage = await LoginPage.errorMessage.getText()
        await expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service')
    })

    it('Data is entered to the field and represented as dots', async () => {

        await LoginPage.open()
        await LoginPage.inputPassword.setValue('non_sauce')

        const input = await LoginPage.inputPassword
        await expect(input).toHaveAttribute('type', 'password')
    })

    it('check x icons', async () => {
        
        const icons = await LoginPage.errorIcons
        
        if (icons.length !== 2) {

        throw new Error(`must be 2 icons, but find: ${icons.length}`)
        }})

    it('check red fields', async () => {

       const usernameClass = await LoginPage.inputUsername.getAttribute('class')

       if (!usernameClass.includes('input_error')) {
        throw new Error('Login field not red.')
       }
       const passwordClass = await LoginPage.inputPassword.getAttribute('class')

       if(!passwordClass.includes('input_error')) {
        throw new Error('Password field not red.')
       }})
})
