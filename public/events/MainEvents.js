/**
 *  mainGetRestaurantsSuccess
 *      data: { restaurants }
 *
 *  mainGetRestaurantsFailed
 *      data: { error }
 */

class MainEvents {
    constructor () {
        this.mainGetRestaurantsSuccess = 'mainGetRestaurantsSuccess'
        this.mainGetRestaurantsFailed = 'mainGetRestaurantsFailed'
        this.mainClearContent = 'mainClearContent'
    }
}

export default new MainEvents()
