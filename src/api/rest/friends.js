import apiCall from '../apiCall'

export const getFriends = (header) => {

    return apiCall({
        url: 'https://electroquest.ru/api/friend/get',
        method: 'post',
        data: null,
        headers: header
    })
}


export const getFollowers = (header) => {

    return apiCall({
        url: 'https://electroquest.ru/api/followers',
        method: 'get',
        data: null,
        headers: header
    })
}


export const getFollowed = (header) => {

    return apiCall({
        url: 'https://electroquest.ru/api/followers/followed',
        method: 'get',
        data: null,
        headers: header
    })
}

export const findUsers = (header, name) => {

    return apiCall({
        url: 'https://electroquest.ru/api/profile/find-by-name',
        method: 'post',
        data: { 'name': name },
        headers: header
    })
}
