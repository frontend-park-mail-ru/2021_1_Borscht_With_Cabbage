import { userOrdersGet, userGet, userPut, userAvatarPut, userOrderPostReview  } from 'Modules/api.js';
import eventBus from 'Modules/eventBus.js';
import { ProfileEvents } from 'Events/ProfileEvents.js';

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
