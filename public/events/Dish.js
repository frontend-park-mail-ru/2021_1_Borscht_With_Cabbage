/**
 *  addingDishSuccess
 *      data: { name, image, id }
 *
 *  userSignUpFailed
 *      data: { error }
 */

 class DishEvents {
    constructor () {
        this.addingDishSuccess = 'addingDishSuccess'
        this.addingDishFailed = 'addingDishFailed'
        this.getAllDishSuccess = 'getAllDishSuccess'
        this.getAllDishFailed = 'getAllDishFailed'
    }
}

export default new DishEvents()
