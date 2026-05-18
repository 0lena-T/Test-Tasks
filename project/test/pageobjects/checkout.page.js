import Page from './page.js'
class CheckoutPage extends Page {
    get checkoutBtn () {
        return $('#checkout')
    }
    get continueCheckBtn () {
        return $('#continue')
    }
    get finishCheckBtn () {
        return $('#finish')
    }
    get backHomeCheckBtn () {
        return $('#back-to-products')
    }
    get firstNameInput () {
        return $('#first-name')
    }
    get lastNameInput () {
        return $('#last-name')
    }
    get postalCodeInput () {
        return $('#postal-code')
    }
    get thankYouHeader () {
        return $('.complete-header')
    }
    get checkoutForm () {
        return $('.checkout_info')
    }
    get itemTotalPrice () {
        return $('.summary_subtotal_label')
    }
    get overviewItemName () {
        return $('.checkout_summary_container .inventory_item_name')
    }
    get overviewItemPrice () {
        return $('.checkout_summary_container .inventory_item_price')
    }
    get cartItemName () {
        return $('.cart_item .inventory_item_name')
    }
    get cartErrorMessage () {
        return $('.error_message')
    }
    async clickCheckoutBtn() {
        await this.checkoutBtn.click()
    }
    async clickContinueBtn() {
        await this.continueCheckBtn.click()
    }
    async clickFinishBtn() {
        await this.finishCheckBtn.click()
    }
    async clickBackHomeBtn() {
        await this.backHomeCheckBtn.click()
    }
    async waitForFinishBtnDisplayed() {
        await this.finishCheckBtn.waitForDisplayed({ timeout: 3000 })
    }
    async getCartItemNameText() {
        return await this.cartItemName.getText()
    }
    async getOverviewItemNameText() {
        return await this.overviewItemName.getText()
    }
    async getOverviewItemPriceText() {
        return await this.overviewItemPrice.getText()
    }
    async getItemTotalPriceText() {
        return await this.itemTotalPrice.getText()
    }
    async getThankYouMessageText() {
        return await this.thankYouHeader.getText()
    }
    async verifyThankYouMessage() {
        await expect(this.thankYouHeader).toHaveText('Thank you for your order!')
    }
    async fillVerifyCheckoutForm(firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName)
        await this.lastNameInput.setValue(lastName)
        await this.postalCodeInput.setValue(postalCode)
        //
        await expect(this.firstNameInput).toHaveValue(firstName)
        await expect(this.lastNameInput).toHaveValue(lastName)
        await expect(this.postalCodeInput).toHaveValue(postalCode)
    }
    async nameItemInCart(savedName) {
        const productInCart = await this.cartItemName.getText()
        if (productInCart !== savedName) {
            throw new Error(`Product error in cart`)
        }
    }
    async verifyOverviewDetails(expectedName, expectedPrice) {
        const overviewItemName = await this.getOverviewItemNameText()
        if (overviewItemName !== expectedName) {
            throw new Error(`That is different item. Expect: ${expectedName}, but now ${overviewItemName}`)
        }
        const overviewItemPrice = await this.getOverviewItemPriceText()
        if (overviewItemPrice !== expectedPrice) {
            throw new Error(`Price is changed. Was: ${expectedPrice}, now: ${overviewItemPrice}.`)
        }
    }
    async verifyCartIsEmpty() {
        const cartItems = await $$('.cart_item')
        if (cartItems.length !== 0) {
            throw new Error(`Cart must be empty,but found item: ${cartItems.length} `)
        }
    }
    async verifyCartErrorMessage() {
        await expect(this.cartErrorMessage).toBeDisplayed()
        const currentErrorMessage = await this.cartErrorMessage.getText()
        await expect(currentErrorMessage).toContain('Cart is empty')
    }
}
export default new CheckoutPage()