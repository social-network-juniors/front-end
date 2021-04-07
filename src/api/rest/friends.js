import makeRequest from "../index";

export const getFriends = (header) => {
    return makeRequest("friend/get", "POST", null, null, header)
}

export const getFollowers = (header) => {
    return makeRequest("followers", "GET", null, null, header)
}

export const getFollowed = (header) => {
    return makeRequest("followers/followed", "GET", null, null, header)
}

export const getRequests = (header) => {
    return makeRequest("friend/friend-requests-to-me", "POST", null, null, header)
}

export const findUsers = (header, name) => {
    return makeRequest("profile/find-by-name", "POST", { name }, null, header)
}

export const addToFriends = (header, user_id) => {
    return makeRequest("friend/add", "POST", { user_id }, null, header)
}

export const followUser = (header, user_id) => {
    return makeRequest("followers/follow", "POST", { user_id }, null, header)
}

export const unfollowUser = (header, user_id) => {
    return makeRequest("followers/unfollow", "POST", { user_id }, null, header)
}

export const acceptFriend = (header, user_id) => {
    return makeRequest("friend/accept", "POST", { user_id }, null, header)
}

export const rejectFriend = (header, user_id) => {
    return makeRequest("friend/reject", "POST", { user_id }, null, header)
}


