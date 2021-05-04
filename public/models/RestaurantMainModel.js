import {
    restaurantAddDishPost,
    allDishesGet,
    restaurantUpdateDishImagePut,
    restaurantPut,
    sectionAddPost,
    sectionUpdatePut,
    sectionDelete, restaurantAvatarPut, restaurantOrdersGet, updateStatus, userPut, userAvatarPut
} from 'Modules/api.js';
import { restaurantUpdateDishDataPut, restaurantDeleteDish } from 'Modules/api.js';
import eventBus from 'Modules/eventBus.js';
import { DishEvents } from 'Events/DishEvents';
import { ProfileEvents } from 'Events/ProfileEvents.js';
import { SectionEvents } from 'Events/SectionEvents.js';
import {RestaurantOrdersEvents} from "Events/RestaurantOrdersEvents.js";


export class RestaurantMainModel {
    getOrders () {
        restaurantOrdersGet()
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(RestaurantOrdersEvents.restaurantGetOrdersSuccess, res.parsedJSON)
                } else {
                    eventBus.emit(RestaurantOrdersEvents.restaurantGetOrdersFailed, res.parsedJSON)
                }
            })
            .catch(res => eventBus.emit(RestaurantOrdersEvents.restaurantGetOrdersFailed, res.parsedJSON));
    }

    updateStatus (status, deliveryTime, order) {
        updateStatus(status, deliveryTime, order)
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(RestaurantOrdersEvents.restaurantOrderUpdateStatusSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(RestaurantOrdersEvents.restaurantOrderUpdateStatusFailed, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(RestaurantOrdersEvents.restaurantOrderUpdateStatusFailed, res.parsedJSON));
    }


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

    addDish ({ name, description, price, weight, section }) {
        restaurantAddDishPost({ name, description, price, weight, section })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(DishEvents.addingDishSuccess + section, res.parsedJSON);
                    eventBus.emit(DishEvents.addingDishSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(DishEvents.addingDishFailed, res);
                }
            })
            .catch(res => eventBus.emit(DishEvents.addingDishFailed, res));
    }

    updateDataDish ({ id, name, description, price, weight }) {
        restaurantUpdateDishDataPut({ id, name, description, price, weight })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(DishEvents.updateDishDataSuccess + id, res.parsedJSON);
                    eventBus.emit(DishEvents.updateDishDataSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(DishEvents.updateDishDataFailed, res);
                }
            })
            .catch(res => eventBus.emit(DishEvents.updateDishDataFailed, res));
    }

    updateImageDish ({ id, data }) {
        restaurantUpdateDishImagePut({ data: data })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(DishEvents.updateDishImageSuccess + id, res.parsedJSON);
                    eventBus.emit(DishEvents.updateDishImageSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(DishEvents.updateDishImageFailed, res);
                }
            })
            .catch(res => eventBus.emit(DishEvents.updateDishImageFailed, res));
    }

    deleteDish ({ id, sectionId }) {
        restaurantDeleteDish({ id: id })
            .then(res => {
                if (res.status === 200) {
                    console.log('model success');
                    eventBus.emit(DishEvents.deleteDishSuccess + sectionId, res.parsedJSON);
                } else {
                    console.log('model failed');
                    eventBus.emit(DishEvents.deleteDishFailed + sectionId, res.parsedJSON);
                }
            })
            .catch(res => {
                console.log('model failed');
                // TODO: понять почему здесь вызывается когда проходит по then
            });
    }

    setRestaurantData (data, avatar) {
        const promise = [];
        promise.push(restaurantPut({ data }));
        if (avatar.get('avatar')) {
            promise.push(restaurantAvatarPut({ avatar }));
        }

        Promise.all(promise)
            .then(res => {
                const data_ = {};
                data_.status = Math.max(...res.map(value => value.status));
                if (data_.status !== 200) {
                    data_.parsedJSON = res.find(value => value.status !== 200).parsedJSON;
                } else {
                    data_.parsedJSON = Object.assign(...res.map(value => value.parsedJSON));
                }
                if (data_.status === 200) {
                    eventBus.emit(ProfileEvents.restaurantSetUserDataSuccess, {
                        info: data_.parsedJSON,
                        status: data_.status
                    });
                } else {
                    eventBus.emit(ProfileEvents.restaurantSetUserDataFailed, data_);
                }
            })
            .catch(res => eventBus.emit(ProfileEvents.restaurantSetUserDataFailed, res));
    }

    addSection ({ name }) {
        sectionAddPost({ name })
            .then(res => {
                if (res.status === 200) {
                    console.log('success');
                    eventBus.emit(SectionEvents.addingSectionSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(SectionEvents.addingSectionFailed, res.parsedJSON);
                }
            })
            .catch(res => {
            });
    }

    updateSection ({ id, name }) {
        sectionUpdatePut({ id, name })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(SectionEvents.updateSectionSuccess, res.parsedJSON);
                    eventBus.emit(SectionEvents.updateSectionSuccess + id, res.parsedJSON);
                } else {
                    eventBus.emit(SectionEvents.updateSectionFailed, res.parsedJSON);
                }
            })
            .catch(res => {
            });
    }

    deleteSection ({ id }) {
        sectionDelete({ id })
            .then(res => {
                if (res.status === 200) {
                    console.log('model success');
                    eventBus.emit(SectionEvents.deleteSectionSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(SectionEvents.deleteSectionFailed, res.parsedJSON);
                }
            })
            .catch(res => {
                console.log('model failed');
                // TODO: понять почему здесь вызывается когда проходит по then
            });
    }
}
