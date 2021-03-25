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
    }
}

export default new MainEvents()
