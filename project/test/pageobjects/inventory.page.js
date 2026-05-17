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