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
        debugger;
        return id ? request('get', `/coverletters/${id}`) : request('get', '/coverletters')
    }    
}

// test
setAuthInHeader('JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoidGVzdE5tIiwiaWQiOiJ0ZXN0SWQiLCJleHAiOjE1NTcyMDYzMzJ9.WmGt2wzguFSCSOaPO5kmgGYYA8EBYLLINGy331XaoN1jNh9r6ay6IMa41yHUHbtmlbCpJSPytiNq3ezavw7nHA');