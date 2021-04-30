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
 */

export const ProfileEvents = {
    profileGetUserDataSuccess: 'profileGetUserDataSuccess',
    profileGetUserDataFailed: 'profileGetUserDataFailed',
    profileSetUserDataSuccess: 'profileSetUserDataSuccess',
    profileSetUserDataFailed: 'profileSetUserDataFailed',
    profileGetOrdersSuccess: 'profileGetOrdersSuccess',
    profileGetOrdersFailed: 'profileGetOrdersFailed',
    profileGetChatsSuccess: 'profileGetChatsSuccess',
    profileGetChatsFailed: 'profileGetChatsFailed',
    profileGetChatMessagesSuccess: 'profileGetChatMessagesSuccess',
    profileGetChatMessagesFailed: 'profileGetChatMessagesFailed',
    profileGetNewMessageSocket: 'profileGetNewMessageSocket'
}
