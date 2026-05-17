import { browser } from '@wdio/globals'
import inventoryPage from '../pageobjects/inventory.page'
import { expect } from 'expect-webdriverio'
import checkoutPage from '../pageobjects/checkout.page'

describe('Valid checkout.', () => {

    let savedName = ''
    let savedPrice = ''

    it('Product is added to cart, cart page is displayed', async () => {

        await inventoryPage.open()
         savedName = await inventoryPage.backpackName.getText()
         savedPrice = await inventoryPage.backpackPrice.getText()
        await inventoryPage.addToCartBackpack.click()
        await expect(inventoryPage.cartBadge).toHaveText('1')

        await inventoryPage.cartLink.click()
        const currentUrl = await browser.getUrl()
        await expect(currentUrl).toContain('cart.html')

        const productInCart = await $('.inventory_item_name').getText()
            if (productInCart !==savedName) {
                throw new Error(`Expected ${savedName}, but found ${productInCart}`)
            }
    })

    it('Checkout form are displayed, data is entered to the field.', async () => {
        
        await checkoutPage.checkoutBtn.click()
        await expect(checkoutPage.checkoutForm).toBeDisplayed()

        await checkoutPage.fillCheckoutForm('Abc', 'Qwerty', '12345')

        await expect(checkoutPage.firstNameInput).toHaveValue('Abc')
        await expect(checkoutPage.lastNameInput).toHaveValue('Qwerty')
        await expect(checkoutPage.postalCodeInput).toHaveValue('12345')
    })
  
    it ('Check price, message displayed, redirect to the inventory', async () => {

        await checkoutPage.continueCheckBtn.click()
            const currentUrl = await browser.getUrl()
            await expect(currentUrl).toContain('checkout-step-two.html')
        
        const overviewItemName = await $('.inventory_item_name').getText()
            if (overviewItemName !== savedName) {
                throw new Error(`That is different item. Expect: ${savedName}, but now ${overviewItemName}`)
            }
        const overviewItemPrice = await $('.inventory_item_price').getText()
            if (overviewItemPrice !== savedPrice) {
                throw new Error(`Price is changed. Was: ${savedPrice}, now: ${overviewItemPrice}.`)
            }
    })

    it ('Message displayed, redirect to the inventory', async () => {
        await checkoutPage.finishCheckBtn.waitForDisplayed({ timeout: 3000 })

        await checkoutPage.finishCheckBtn.click()
            const currentUrl = await browser.getUrl()
            await expect(currentUrl).toContain('checkout-complete.html')
        
        const thankMessage = await $('.complete-header').getText()
        await expect(thankMessage).toBe('Thank you for your order!')

        await checkoutPage.backHomeCheckBtn.click()
        await expect(inventoryPage.cartBadge).not.toBeDisplayed()
    })
})