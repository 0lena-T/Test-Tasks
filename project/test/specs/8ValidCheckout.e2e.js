import inventoryPage from '../pageobjects/inventory.page'
import checkoutPage from '../pageobjects/checkout.page'
import { URLS, ERROR_MESSAGES } from '../pageobjects/constants'

describe('Valid checkout.', () => {
    let savedName = ''
    let savedPrice = ''
    it('Product is added to cart, cart page is displayed', async () => {
        await inventoryPage.open()
         savedName = await inventoryPage.getBackpackNameText()
         savedPrice = await inventoryPage.getBackpackPriceText()
        await inventoryPage.addToCartBackpackClick()
        await expect(inventoryPage.cartBadge).toHaveText('1')
        await inventoryPage.clickCartLink()
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain(URLS.CART_PAGE)
        await checkoutPage.nameItemInCart(savedName)
    })
    it('Checkout form are displayed, data is entered to the field.', async () => {
        await checkoutPage.clickCheckoutBtn()
        await expect(checkoutPage.checkoutForm).toBeDisplayed()
        await checkoutPage.fillVerifyCheckoutForm('Abc', 'Qwerty', '12345')
    })
    it ('Check price, message displayed, redirect to the inventory', async () => {
        await checkoutPage.clickContinueBtn()
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain(URLS.CHECKOUT_STEP_TWO)
        await checkoutPage.verifyOverviewDetails(savedName, savedPrice)
    })
    it ('Message displayed, redirect to the inventory', async () => {
        await checkoutPage.waitForFinishBtnDisplayed()
        await checkoutPage.clickFinishBtn()
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain(URLS.CHECKOUT_COMPLETE)
        await checkoutPage.verifyThankYouMessage()
        await checkoutPage.clickBackHomeBtn()
        await expect(inventoryPage.cartBadge).not.toBeDisplayed()
    })
})