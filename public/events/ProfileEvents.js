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
 // *  profileOrderGetReviewSuccess
 // *      data: { order }
 // *
 // *  profileOrderGetReviewNoReview
 // *      data: { }
 // *
 // *  profileOrderGetReviewFailed
 // *      data: { error }
 */

export const ProfileEvents = {
    profileGetUserDataSuccess: 'profileGetUserDataSuccess',
    profileGetUserDataFailed: 'profileGetUserDataFailed',
    profileSetUserDataSuccess: 'profileSetUserDataSuccess',
    profileSetUserDataFailed: 'profileSetUserDataFailed',
    profileGetOrdersSuccess: 'profileGetOrdersSuccess',
    profileGetOrdersFailed: 'profileGetOrdersFailed',
    // profileOrderGetReviewSuccess: 'profileOrderGetReviewSuccess',
    // profileOrderGetReviewNoReview: 'profileOrderGetReviewNoReview',
    // profileOrderGetReviewFailed: 'profileOrderGetReviewFailed'
}
