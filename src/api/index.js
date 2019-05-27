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

export const question = {
    fetchByhashtags(hashtag) {
        return request('get', `/questions?hashtag=${hashtag}`)
    }
}

export const hashtag = {
    fetch() {
        return request('get', `/hashtags`)
    }
}

// test
setAuthInHeader('JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoi7KeE7J6s7Ja4IiwiaWQiOiJzX3dsc3dvZGpzQG5hdmVyLmNvbSIsImV4cCI6MTU1OTc0NjU0NX0.oMYb3Jl44ouz8GdNUA3T7m1xBlXQ3Z-v33yBHWF_9K2pKyrmQVWvMyKM7gScWfC3dRF8qa6YJUpbiq-ZlV4E6A');