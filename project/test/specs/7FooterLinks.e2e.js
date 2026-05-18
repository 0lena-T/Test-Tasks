import inventoryPage from '../pageobjects/inventory.page'
import { ERROR_MESSAGES } from '../pageobjects/constants'

describe('Footer links.', () => {
    it('Twitter of the company is opened on the new tab', async () => {
        await inventoryPage.open()
        const twitterLink = await inventoryPage.footerLinkClick('twitter')
        if (!twitterLink) {
                throw new Error(`Expect Sauce Labs in twitter but that another page.`)
        }
    })
    it('Facebook of the company is opened on the new tab', async () => {
        const facebookLink = await inventoryPage.footerLinkClick('facebook')
        if (!facebookLink) {
            throw new Error(`Expect Sauce Labs in Facebook but that another page.`)
        }
    })
    it('Linkedin of the company is opened on the new tab', async () => {
        const linkedinLink = await inventoryPage.footerLinkClick('linkedin')
        if (!linkedinLink) {
            throw new Error(`Expect Sauce Labs in Linkedin but that another page.`)
        }
    })
})