/**
 *  addingDishSuccess
 *      data: { name, image, id }
 *
 *  userSignUpFailed
 *      data: { error }
 */

 class AddingDishEvents {
    constructor () {
        this.addingDishSuccess = 'addingDishSuccess'
        this.addingDishFailed = 'addingDishFailed'
    }
}

export default new AddingDishEvents()
