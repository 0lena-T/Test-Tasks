import { $, $$ } from '@wdio/globals'
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
    get checkoutForm () {
        return $('.checkout_info')
    }
    get itemTotalPrice () {
        return $('.summary_subtotal_label')
    }
    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName)
        await this.lastNameInput.setValue(lastName)
        await this.postalCodeInput.setValue(postalCode)
    }
}
export default new CheckoutPage()