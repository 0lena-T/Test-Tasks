import inventoryPage from '../pageobjects/inventory.page'
import checkoutPage from '../pageobjects/checkout.page'
import { ERROR_MESSAGES, URLS } from '../pageobjects/constants'

describe('Valid checkout.', () => {
    it('Cart page is displayed, products are not displayed', async () => {
        await inventoryPage.open()
        await inventoryPage.clickCartLink()
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain(URLS.CART_PAGE)
        await checkoutPage.verifyCartIsEmpty()
    })
    it('Error message "Cart is empty" is displayed', async () => {
        await checkoutPage.clickCheckoutBtn()
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain(URLS.CART_PAGE)
        await checkoutPage.verifyCartErrorMessage(ERROR_MESSAGES.CART_IS_EMPTY)
    })
})