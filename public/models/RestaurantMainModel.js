import {
    restaurantAddDishPost,
    allDishesGet,
    restaurantUpdateDishImagePut,
    restaurantPut,
    sectionAddPost,
    sectionUpdatePut,
    sectionDelete, restaurantAvatarPut
} from 'Modules/api.js';
import { restaurantUpdateDishDataPut, restaurantDeleteDish } from 'Modules/api.js';
import eventBus from 'Modules/eventBus.js';
import { DishEvents } from 'Events/DishEvents';
import { ProfileEvents } from 'Events/ProfileEvents.js';
import { SectionEvents } from 'Events/SectionEvents.js';

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
        restaurantUpdateDishDataPut({ id, name, description, price, weight })
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

    setRestaurantData (data, avatar) {
        const textData = restaurantPut({ data });
        const avatarData = restaurantAvatarPut({ avatar })

        Promise.all([textData, avatarData])
            .then(res => {
                const data_ = {};
                data_.status = Math.max(res[0].status, res[1].status);
                if (res[0].status !== 200 || res[1].status !== 200) {
                    if (res[0].status !== 200) {
                        data_.parsedJSON = res[0].parsedJSON;
                    } else {
                        data_.parsedJSON = res[1].parsedJSON;
                    }
                } else {
                    data_.parsedJSON = Object.assign(res[0].parsedJSON, res[1].parsedJSON);
                }
                if (data_.status === 200) {
                    eventBus.emit(ProfileEvents.profileSetUserDataSuccess, {
                        info: data_.parsedJSON,
                        status: data_.status
                    });
                } else {
                    eventBus.emit(ProfileEvents.profileSetUserDataFailed, data_.parsedJSON);
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
