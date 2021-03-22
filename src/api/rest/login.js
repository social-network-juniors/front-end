import apiCall from '../apiCall'

export const login = () => {
    return apiCall({
        url: '/api/auth/register',
        method: 'post',
    }).catch((error) => { })
}