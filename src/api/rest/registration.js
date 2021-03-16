import apiCall from '../apiCall'

export const registration = ({
    email,
    password,
    password_confirmation,
    first_name,
    last_name,
    bday,
    bmonth,
    byear,
}) => {
    return apiCall({
        url: '/api/auth/register',
        method: 'post',
        data: {
            email,
            password,
            password_confirmation,
            first_name,
            last_name,
            bday,
            bmonth,
            byear,
        }
    }).catch((error) => {
        if (error.message === 'Sorry, wrong email address or password. Please, try again') {
            alert('mistake');
        } else { alert('super') }
    })
}