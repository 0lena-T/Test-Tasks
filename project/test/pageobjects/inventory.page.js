import Page from './page.js'
import loginPage from './login.page.js'
class InventoryPage extends Page {
    get burgerBtn () {
        return $('#react-burger-menu-btn')
    }
    get cartLink () {
        return $('.shopping_cart_link')
    }
    get cartBadge () {
        return $('.shopping_cart_badge')
    }
    get sortBtn () {
        return $('.product_sort_container')
    }
    get sidebar () {
        return $('.bm-menu-wrap')
    }
    get logoutBtn () {
        return $('#logout_sidebar_link')
    }
    get backpackName () {
        return $('#item_4_title_link .inventory_item_name')
    }
    get addToCartBackpack () {
        return $('#add-to-cart-sauce-labs-backpack')
    }
    get inventItemName () {
        return $$('.inventory_item_name')
    }
    get inventItemPrice () {
        return $$('.inventory_item_price')
    }
    get twitterLink () {
        return $('.social_twitter a')
    }
    get facebookLink () {
        return $('.social_facebook a')
    }
    get linkedinLink () {
        return $('.social_linkedin a')
    }
    get backpackPrice () {
        return $('.inventory_item:has(#add-to-cart-sauce-labs-backpack) .inventory_item_price')
    }
    get menuItems () {
        return $$('.bm-item.menu-item')
    }
    get cartItemName () {
        return $('.cart_item .inventory_item_name')
    }
    async clickCartLink() {
        await this.cartLink.click()
    }
    async addToCartBackpackClick() {
        await this.addToCartBackpack.click()
    }
    async getBackpackPriceText() {
        return await this.backpackPrice.getText()
    }
    async getBackpackNameText() {
        return await this.backpackName.getText()
    }
    async openSortMenu() {
        await this.sortBtn.click()
    }
    async footerLinkClick(link) {
        if (link === 'twitter') await this.twitterLink.click()
        if (link === 'facebook') await this.facebookLink.click()
        if (link === 'linkedin') await this.linkedinLink.click()
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[1])
            const url = await browser.getUrl()
        let isValid = false
        if (link === 'twitter' && (url.includes('x.com') || url.includes('twitter.com')) && url.includes('saucelabs')) isValid = true
        if (link === 'facebook' && url.includes('facebook.com') && url.includes('saucelabs')) isValid = true
        if (link === 'linkedin' && url.includes('linkedin.com') && url.includes('sauce-labs')) isValid = true
            await browser.closeWindow()
            await browser.switchToWindow(handles[0])
            return isValid
    }
    async sortedNames(sortType) {
        const names = await this.getAllProdNames()
        for (let i = 0; i < names.length - 1; i++) {
            if (sortType === 'A-Z' && names[i] > names[i+1]) return false
            if (sortType === 'Z-A' && names[i] < names[i+1]) return false
        }
        return true
    }
    async sortedPrices(sortType) {
        const prices = await this.getAllProdPrices()
        for (let i = 0; i < prices.length - 1; i++) {
            if (sortType === 'Low-High' && prices[i] > prices[i+1]) return false
            if (sortType === 'High-Low' && prices[i] < prices[i+1]) return false
        }        return true
    }
    async getMenuItemsCount() {
        const items = await this.menuItems
        return items.length
    }
    async selectSortType(sortType) {
        const options = {
            'A-Z': 'az',
            'Z-A': 'za',
            'Low-High': 'lohi',
            'High-Low': 'hilo'
        }
        await this.sortBtn.selectByAttribute('value',options[sortType])
    }
    async getAllProdNames() {
        const elements = await this.inventItemName
        const names = []
            for (const el of elements) {
                const text = await el.getText()
                names.push(text)
            }
        return names
    }
    async getAllProdPrices() {
        const elements = await this.inventItemPrice
        const prices = []
            for (const el of elements) {
                const text = await el.getText()
                const number = parseFloat(text.replace('$',''))
                prices.push(number)
            }
        return prices
    }
    async open () {
        await loginPage.open()
        await loginPage.login('standard_user','secret_sauce')
        return super.open('inventory.html')
    }
}
export default new InventoryPage()