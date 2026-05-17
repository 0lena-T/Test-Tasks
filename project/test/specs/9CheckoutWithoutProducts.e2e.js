import inventoryPage from '../pageobjects/inventory.page'
import { expect } from 'expect-webdriverio'
import checkoutPage from '../pageobjects/checkout.page'

describe('Valid checkout.', () => {
    it('Cart page is displayed, products are not displayed', async () => {
        await inventoryPage.open()
        await inventoryPage.cartLink.click()
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain('cart.html')
        const cartItems = await $$('.cart_item')
            if (cartItems.length !== 0) {
                throw new Error(`Cart must be empty,but found item: ${cartItems.length} `)
            }
    })
    it('Error message "Cart is empty" is displayed', async () => {
        await checkoutPage.checkoutBtn.click()
        const currentUrl = await browser.getUrl()
        if (!currentUrl.includes('cart.html')) {
            throw new Error(`Error. Redirect occurred, current URL: ${currentUrl}`);
        }
        const errorMessage = await $('.error_message').getText()
        await expect(errorMessage).toContain('Cart is empty')
    })
})