import { restaurantAddDishPost, allDishesGet, restaurantUpdateDishImagePut, restaurantPut } from '../modules/api.js';
import { restaurantUpdateDishDataPut, restaurantDeleteDish } from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import { DishEvents } from '../events/DishEvents.js';
import { ProfileEvents } from '../events/ProfileEvents.js';

export class RestaurantMainModel {
    getDish () {
        allDishesGet().then(res => {
                if (res.status === 200) {
                    eventBus.emit(DishEvents.getAllDishSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(DishEvents.getAllDishFailed, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(DishEvents.getAllDishFailed, res.parsedJSON));
    }

    addDish ({ name, description, price, weight }) {
        restaurantAddDishPost({ name, description, price, weight})
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(DishEvents.addingDishSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(DishEvents.addingDishFailed, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(DishEvents.addingDishFailed, res.parsedJSON));
    }

    updateDataDish ({ id, name, description, price, weight }) {
        restaurantUpdateDishDataPut({ id, name, description, price, weight})
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(DishEvents.updateDishDataSuccess + id, res.parsedJSON);
                    eventBus.emit(DishEvents.updateDishDataSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(DishEvents.updateDishDataFailed, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(DishEvents.updateDishDataFailed, res.parsedJSON));
    }

    updateImageDish ({ id, data }) {
        restaurantUpdateDishImagePut({ data: data })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(DishEvents.updateDishImageSuccess + id, res.parsedJSON);
                    eventBus.emit(DishEvents.updateDishImageSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(DishEvents.updateDishImageFailed, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(DishEvents.updateDishImageFailed, res.parsedJSON));
    }

    deleteDish ({ id }) {
        restaurantDeleteDish({ id: id })
            .then(res => {
                if (res.status === 200) {
                    console.log('model success');
                    eventBus.emit(DishEvents.deleteDishSuccess);
                } else {
                    console.log('model failed');
                    eventBus.emit(DishEvents.deleteDishFailed, res.parsedJSON);
                }
            })
            .catch(res => {
                console.log('model failed');
                // TODO: понять почему здесь вызывается когда проходит по then
            });
    }

    setRestaurantData (data) {
        restaurantPut({
            data: data
        })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(ProfileEvents.profileSetUserDataSuccess, {
                        info: res.parsedJSON,
                        status: res.status
                    });
                } else {
                    eventBus.emit(ProfileEvents.profileSetUserDataFailed, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(ProfileEvents.profileSetUserDataFailed, res.parsedJSON));
    }
}
