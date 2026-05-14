import { browser } from '@wdio/globals'
import inventoryPage from '../pageobjects/inventory.page'
import { expect } from 'expect-webdriverio'
import loginPage from '../pageobjects/login.page'

describe('Saving the cart after logout .', () => {

    let savedName = ''

    it('The number near cartBtn increases by 1', async () => {

        await inventoryPage.open()

        savedName = await inventoryPage.backpackName.getText()

        await inventoryPage.addToCartBackpack.click()
        await expect(inventoryPage.cartBadge).toHaveText('1')
    })
    it('Menu is expanded, 4 items are displayed.', async () => {

        await inventoryPage.burgerBtn.click()
        await expect (inventoryPage.sidebar).toHaveAttribute('aria-hidden', 'false')
        
        const menuItems = await $$('.bm-item.menu-item')
        if (menuItems.length !== 4) {
            throw new Error(`must be 4 items, but find: ${menuItems.length}`)
        }
    })
    it('User are redirecred to the "Login" page, "Username" and "Password" field are empty', async () => {

        await inventoryPage.logoutBtn.click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        
        const userValue = await $('#user-name').getValue()

        const passwordValue = await $('#password').getValue()
            if (userValue !== '' || passwordValue !== '') {
            throw new Error('Login and Password field is not empty.')}
    })
    it('User redirected to the inventory page.Products and cart are displayed', async () => {

        await loginPage.login('standard_user','secret_sauce')

        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain('inventory.html')
        await expect(inventoryPage.cartLink).toBeDisplayed()
    })
    it('The cart page is open, the products added in step 1 are in the cart', async () => {

        await inventoryPage.cartLink.click()

        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain('cart.html')

        const productInCart = await $('.inventory_item_name').getText()
            if (productInCart !==savedName) {
                throw new Error(`Expected ${savedName}, but found ${productInCart}`)
            }
    })
})
