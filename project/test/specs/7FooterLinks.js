import { browser } from '@wdio/globals'
import inventoryPage from '../pageobjects/inventory.page'
import { expect } from 'expect-webdriverio'

describe('Footer links.', () => {

    it('Twitter of the company is opened on the new tab', async () => {

        await inventoryPage.open()
        await inventoryPage.twitterLink.click()

        let handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
            const twitterUrl = await browser.getUrl()
            if (!twitterUrl.includes('x.com') || !twitterUrl.includes('saucelabs')) {
                throw new Error(`Expect Sauce Labs in twitter but that ${twitterUrl}`)
            }
        await browser.closeWindow()
        await browser.switchToWindow(handles[0])
    })
    it('Facebook of the company is opened on the new tab', async () => {

        await inventoryPage.facebookLink.click()

        let handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
            const facebookUrl = await browser.getUrl()
            if (!facebookUrl.includes('facebook.com') || !facebookUrl.includes('saucelabs')) {
                throw new Error(`Expect Sauce Labs in Facebook but that ${facebookUrl}`)
            }
        await browser.closeWindow()
        await browser.switchToWindow(handles[0])
    })
        it('Linkedin of the company is opened on the new tab', async () => {

        await inventoryPage.linkedinLink.click()

        let handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
            const linkedinUrl = await browser.getUrl()
            if (!linkedinUrl.includes('linkedin.com') || !linkedinUrl.includes('sauce-labs')) {
                throw new Error(`Expect Sauce Labs in Linkedin but that ${linkedinUrl}`)
            }
    })
})