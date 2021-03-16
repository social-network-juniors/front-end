import axios from 'axios';

export default ({ url, method, data, params, header }) => {
    return axios({
        url,
        method,
        params,
        data,
        header,
    });
}
