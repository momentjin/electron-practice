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
    create(data) {
        return request('post', '/coverletters/', data)
    },
    update(data) {
        return request('put', `/coverletters/${data.id}`, data)
    },
    delete(id) {
        return request('delete', `/coverletters/${id}`)
    }    
}

export const hashtag = {
    fetch() {
        return request('get', `/hashtags`)
    }
}

// test
setAuthInHeader('JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoi7KeE7J6s7Ja4IiwiaWQiOiJzX3dsc3dvZGpzQG5hdmVyLmNvbSIsImV4cCI6MTU1ODg4MDExMn0.KpmFcABYhThBOsH7GwVpMymDyRFh-uv8DZbqdCn46NEla84XycaB33UuR3yOkzZCz5s3RwKKZCwFB0hZC7clAw');