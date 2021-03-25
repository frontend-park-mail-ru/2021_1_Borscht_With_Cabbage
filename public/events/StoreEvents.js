/**
 *  storeGetDishesSuccess
 *      data: { foods }
 *
 *  storeGetDishesFailed
 *      data: { error }
 */

class StoreEvents {
    constructor () {
        this.storeGetDishesSuccess = 'storeGetDishesSuccess'
        this.storeGetDishesFailed = 'storeGetDishesFailed'
    }
}

export default new StoreEvents()
