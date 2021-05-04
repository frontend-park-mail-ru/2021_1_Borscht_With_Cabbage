/**
 *  profileGetUserDataSuccess
 *      data: { userData }
 *
 *  profileGetUserDataFailed
 *      data: { error }
 *
 *  profileSetUserDataSuccess
 *      data: { userData }
 *
 *  profileSetUserDataFailed
 *      data: { error }
 *
 *  profileGetOrdersSuccess
 *      data: { orders }
 *
 *  profileGetOrdersFailed
 *      data: { error }
 *
 *  profileOrderPostReviewSuccess
 *      data: { order }
 *
 *  profileOrderPostReviewFailed
 *      data: { error }
 */

export const ProfileEvents = {
    profileGetUserDataSuccess: 'profileGetUserDataSuccess',
    profileGetUserDataFailed: 'profileGetUserDataFailed',
    profileSetUserDataSuccess: 'profileSetUserDataSuccess',
    profileSetUserDataFailed: 'profileSetUserDataFailed',
    restaurantGetUserDataSuccess: 'restaurantGetUserDataSuccess',
    restaurantGetUserDataFailed: 'restaurantGetUserDataFailed',
    restaurantSetUserDataSuccess: 'restaurantSetUserDataSuccess',
    restaurantSetUserDataFailed: 'restaurantSetUserDataFailed',
    profileGetOrdersSuccess: 'profileGetOrdersSuccess',
    profileGetOrdersFailed: 'profileGetOrdersFailed',
    profileOrderPostReviewSuccess: 'profileOrderPostReviewSuccess',
    profileOrderPostReviewFailed: 'profileOrderPostReviewFailed'
}
