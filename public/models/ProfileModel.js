import { userOrdersGet, userGet, userPut, userAvatarPut, userOrderPostReview  } from 'Modules/api.js';
import eventBus from 'Modules/eventBus.js';
import { ProfileEvents } from 'Events/ProfileEvents.js';

class ProfileModel {
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
        const promise = [];
        promise.push(userPut({ data }));
        if (avatar.get('avatar')) {
            promise.push(userAvatarPut({ avatar }))
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
                    eventBus.emit(ProfileEvents.profileSetUserDataSuccess, {
                        info: data_.parsedJSON,
                        status: data_.status
                    });
                } else {
                    eventBus.emit(ProfileEvents.profileSetUserDataFailed, data_);
                }
            })
            .catch(res => eventBus.emit(ProfileEvents.profileSetUserDataFailed, res));
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

    postReview(oid, review, stars) {
        userOrderPostReview(oid, review, stars)
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(ProfileEvents.profileOrderPostReviewSuccess, res.parsedJSON)
                }
                else {
                    eventBus.emit(ProfileEvents.profileOrderPostReviewFailed, res.parsedJSON)
                }
            })
            .catch(res => eventBus.emit(ProfileEvents.profileOrderPostReviewFailed, res.parsedJSON))
    }
}

export default new ProfileModel();
