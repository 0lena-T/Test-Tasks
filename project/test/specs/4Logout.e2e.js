import { URLS } from '../pageobjects/constants'
import inventoryPage from '../pageobjects/inventory.page'
import { expect } from 'expect-webdriverio'

describe('Logout.', () => {
    it('Menu is expanded, 4 items are displayed.', async () => {
        await inventoryPage.open()
        await inventoryPage.burgerBtn.click()
        await expect (inventoryPage.sidebar).toHaveAttribute('aria-hidden', 'false')
        const menuItems = await $$('.bm-item.menu-item')
        if (menuItems.length !== 4) {
            throw new Error(`must be 4 items, but find: ${menuItems.length}`)
        }
    })
    it('User are redirecred to the "Login" page, "Username" and "Password" field are empty', async () => {
        await inventoryPage.logoutBtn.click()
        await expect(browser).toHaveUrl(URLS.BASE_URL)
        const userValue = await $('#user-name').getValue()
        const passwordValue = await $('#password').getValue()
            if (userValue !== '' || passwordValue !== '') {
            throw new Error('Login and Password field is not empty.')}
    })
})
