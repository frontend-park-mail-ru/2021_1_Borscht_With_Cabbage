import { userOrdersGet, userGet, userPut, userAvatarPut } from '../modules/api.js';
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

    setUserData (data, avatar) {
        const textData = userPut({ data });
        const avatarData = userAvatarPut({ avatar });

        Promise.all([textData, avatarData])
            .then(res => {
                console.log(res)
                const data = {};
                data.status = Math.max(res[0].status, res[1].status);
                data.parsedJSON = Object.assign(res[0].parsedJSON, res[1].parsedJSON);
                console.log('data -> ', data);
                if (res.status === 200) {
                    eventBus.emit(ProfileEvents.profileSetUserDataSuccess, {
                        info: data.parsedJSON,
                        status: data.status
                    });
                } else {
                    eventBus.emit(ProfileEvents.profileSetUserDataFailed, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(ProfileEvents.profileSetUserDataFailed, res.parsedJSON));
    }

    getOrders () {
        userOrdersGet()
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
