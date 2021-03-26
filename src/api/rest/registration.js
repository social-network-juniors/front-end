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
        url: 'https://electroquest.ru/api/auth/register',
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
        if (error.message) {
            console.log(error.message);
        } else { alert('super') }
    })
}