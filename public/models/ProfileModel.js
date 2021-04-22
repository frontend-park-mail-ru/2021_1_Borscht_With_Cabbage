import { userOrdersGet, userGet, userPut, userAvatarPut, userOrderGetReview } from '../modules/api.js';
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

    // getReview(id) {
    //     userOrderGetReview(id)
    //         .then(res => {
    //             if (res.status === 200) {
    //                 eventBus.emit(ProfileEvents.profileOrderGetReviewSuccess, res.parsedJSON)
    //             } else if (res.status === 404)
    //                 eventBus.emit(ProfileEvents.profileOrderGetReviewNoReview, res.parsedJSON)
    //             else {
    //                 eventBus.emit(ProfileEvents.profileOrderGetReviewFailed, res.parsedJSON)
    //             }
    //         })
    //         .catch(res => eventBus.emit(ProfileEvents.profileOrderGetReviewFailed, res.parsedJSON))
    // }
}
