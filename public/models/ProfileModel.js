import { userOrdersGet, userGet, userPut } from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import { ProfileEvents } from '../events/ProfileEvents.js';

export class ProfileModel {
    getUserData () {
        userGet()
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(ProfileEvents.profileGetUserDataSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(ProfileEvents.profileGetUserDataFailed, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(ProfileEvents.profileGetUserDataFailed, res.parsedJSON));
    }

    setUserData (data) {
        userPut({
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

    getOrders () {
        userOrdersGet ()
            .then(res => {
                    if (res.status === 200) {
                        eventBus.emit(ProfileEvents.profileGetOrdersSuccess, res.parsedJSON)
                    } else {
                        eventBus.emit(ProfileEvents.profileGetOrdersFailed, res.parsedJSON)
                    }
                })
            .catch(res => eventBus.emit(ProfileEvents.profileGetOrdersFailed, res.parsedJSON));
            }
}
