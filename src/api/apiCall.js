import axios from 'axios';
import React, { useState, useEffect } from 'react'

export default ({ url, method, data, params, header }) => {
    return axios({
        url,
        method,
        params,
        data,
        header,
    });
}
