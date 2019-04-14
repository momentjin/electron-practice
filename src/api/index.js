import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:8080';
const UNAUTHORIZED = 401;

const onUnauthorized = () => {
    router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
}

const request = (method, url, data) => {
    return axios({
            method,
            url: DOMAIN + url,
            data
        })
        .then(result => result.data)
        .catch(result => {
            const {
                status
            } = result.response;
            if (status === UNAUTHORIZED) onUnauthorized();
            throw result.response
        })
}

export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `${token}` : null;
}

export const coverletter = {
    fetch(id) {
        return id ? request('get', `/coverletters/${id}`) : request('get', '/coverletters')
    },
    updateToggleData(id, data) {
        return request('put', `/coverletters/${id}`, data)
    }
}

// test
setAuthInHeader('JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoidGVzdE5tIiwiaWQiOiJ0ZXN0SWQiLCJleHAiOjE1NTU4Mjg4NjF9.0PhfnCsg5-SWMpw4BmcF2EhH3wXqeG8qjv0iPW5Dm8Z_7bNHCK7qkZYrCJ0p6sm1F4uh_QUmGRdmPqQeoL_PDw');