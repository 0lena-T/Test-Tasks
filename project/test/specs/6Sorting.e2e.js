import { browser } from '@wdio/globals'
import inventoryPage from '../pageobjects/inventory.page'
import { expect } from 'expect-webdriverio'

describe('Sorting products.', () => {

    it('Products was sorted due chosen sorting.', async () => {

        await inventoryPage.open()
        await inventoryPage.sortBtn.click()

        await inventoryPage.selectSortType('A-Z')
        const namesAZ = await inventoryPage.getAllProdNames()
            for (let i = 0; i < namesAZ.length - 1; i++) {
                if (namesAZ[i] > namesAZ[i+1]) {
                throw new Error(`A-Z broken: ${namesAZ[i]} comes before ${namesAZ[i+1]}`)
            }
        }

        await inventoryPage.selectSortType('Z-A')
        const namesZA = await inventoryPage.getAllProdNames()
            for (let i = 0; i < namesZA.length - 1; i++) {
                if ( namesZA[i] < namesZA[i+1]) {
                    throw new Error(`Z-A broken: ${namesZA[i]} comes after ${namesZA[i+1]}`)
            }
        }

        await inventoryPage.selectSortType('Low-High')
        const pricesLH = await inventoryPage.getAllProdPrices()
            for (let i = 0; i < pricesLH.length - 1; i++) {
                if (pricesLH[i] > pricesLH[i+1]) {
                throw new Error(`Low-High broken: ${pricesLH[i]} comes before ${pricesLH[i+1]}`)
            }
        }

        await inventoryPage.selectSortType('High-Low')
        const pricesHL = await inventoryPage.getAllProdPrices()
            for (let i = 0; i < pricesHL.length - 1; i++) {
                if ( pricesHL[i] < pricesHL[i+1]) {
                    throw new Error(`High-Low broken: ${pricesHL[i]} comes after ${pricesHL[i+1]}`)
            }
        }
    })
})