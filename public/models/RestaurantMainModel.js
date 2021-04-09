import { restaurantAddDishPost, allDishesGet, restaurantUpdateDishImagePut, restaurantPut, sectionAddPost, sectionUpdatePut, sectionDelete } from '../modules/api.js';
import { restaurantUpdateDishDataPut, restaurantDeleteDish } from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import { DishEvents } from '../events/DishEvents.js';
import { ProfileEvents } from '../events/ProfileEvents.js';
import { SectionEvents } from '../events/SectionEvents.js';

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

    addDish ({ name, description, price, weight, section }) {
        restaurantAddDishPost({ name, description, price, weight, section })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(DishEvents.addingDishSuccess + section, res.parsedJSON);
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
            .catch(res => {});
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
            .catch(res => {});
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
