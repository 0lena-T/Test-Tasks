import inventoryPage from '../pageobjects/inventory.page'
import { ERROR_MESSAGES } from '../pageobjects/constants'

describe('Sorting products.', () => {
    it('Products was sorted due chosen sorting.', async () => {
        await inventoryPage.open()
        await inventoryPage.openSortMenu()
    // A-Z
        await inventoryPage.selectSortType('A-Z')
        const namesAZ = await inventoryPage.sortedNames('A-Z')
            if (!namesAZ) throw new Error(`${ERROR_MESSAGES.SORTING_ERROR}: A-Z`)
    // Z-A
        await inventoryPage.selectSortType('Z-A')
        const namesZA = await inventoryPage.sortedNames('Z-A')
            if (!namesZA) throw new Error(`${ERROR_MESSAGES.SORTING_ERROR}: Z-A`)
    // Low-High
        await inventoryPage.selectSortType('Low-High')
        const pricesLH = await inventoryPage.sortedPrices('Low-High')
            if (!pricesLH) throw new Error(`${ERROR_MESSAGES.SORTING_ERROR}: Low-High`)
    // High-Low
        await inventoryPage.selectSortType('High-Low')
        const pricesHL = await inventoryPage.sortedPrices('High-Low')
            if (!pricesHL) throw new Error(`${ERROR_MESSAGES.SORTING_ERROR}: High-Low`)
    })
})