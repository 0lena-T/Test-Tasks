import inventoryPage from '../pageobjects/inventory.page'
import { expect } from 'expect-webdriverio'
import loginPage from '../pageobjects/login.page'
import { URLS } from '../pageobjects/constants'

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
        await expect(inventoryPage.sidebar).toHaveAttribute('aria-hidden', 'false')
        const menuItemsCount = await inventoryPage.getMenuItemsCount()
        await expect(menuItemsCount).toBe(4)
    })
    it('User are redirecred to the "Login" page, "Username" and "Password" field are empty', async () => {
        await inventoryPage.logoutBtn.click()
        await expect(browser).toHaveUrl(URLS.BASE_URL)
        await expect(loginPage.inputUsername).toHaveValue('')
        await expect(loginPage.inputPassword).toHaveValue('')
    })
    it('User redirected to the inventory page.Products and cart are displayed', async () => {
        await loginPage.login('standard_user','secret_sauce')
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain(URLS.INVENTORY_PAGE)
        await expect(inventoryPage.cartLink).toBeDisplayed()
    })
    it('The cart page is open, the products added in step 1 are in the cart', async () => {
        await inventoryPage.cartLink.click()
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain(URLS.CART_PAGE)
        await expect(inventoryPage.cartItemName).toHaveText(savedName)
    })
})