import apiCall from '../apiCall'

export const getFriends = () => {
    return apiCall({
        url: 'https://electroquest.ru/api/friend/get',
        method: 'get',
    }).catch((error) => { console.log(error) })
}