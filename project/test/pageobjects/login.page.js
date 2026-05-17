import Page from './page.js'
class LoginPage extends Page {
    get inputUsername () {
        return $('#user-name')
    }
    get inputPassword () {
        return $('#password')
    }
    get btnSubmit () {
        return $('[data-test="login-button"]')
    }
    get errorMessage () {
        return $('[class="error-message-container error"]')
    }
    get errorIcons () {
        return $$('.error_icon')
    }
    get pageTitle () {
        return $('.title')
    }
    get cartLink () {
        return $('.shopping_cart_link')
    }
    async enterUsername (username) {
        await this.inputUsername.setValue(username)
    }
    async enterPassword (password) {
        await this.inputPassword.setValue(password)
    }
    async login (username, password) {
        await this.enterUsername(username)
        await this.enterPassword(password)
        await this.btnSubmit.click()
    }
    async getErrorMessage () {
        return await this.errorMessage.getText()
    }
    async getErrorIconsCount () {
        const icons = await this.errorIcons
        return icons.length
    }
    async areFieldsRed () {
        const usernameClass = await this.inputUsername.getAttribute('class')
        const passwordClass = await this.inputPassword.getAttribute('class')
        return usernameClass.includes('input_error') && passwordClass.includes('input_error')
    }
    open () {
        return super.open('')
    }
}
export default new LoginPage()