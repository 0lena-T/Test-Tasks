import { URLS } from '../pageobjects/constants'
import inventoryPage from '../pageobjects/inventory.page'
import loginPage from '../pageobjects/login.page'
import { expect } from 'expect-webdriverio'

describe('Logout.', () => {
    it('Menu is expanded, 4 items are displayed.', async () => {
        await inventoryPage.open()
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
})