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

            debugger;

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

export const member = {
    getMemberInfo() {
        return request('get', 'members/me')
    },
    signUp(data) {
        return request('post', 'members/signup', data)
    },
    signIn(data) {
        return request('post', 'login', data)
    }
}


// test
setAuthInHeader('JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoi7KeE7J6s7Ja4IiwiaWQiOiJzX3dsc3dvZGpzQG5hdmVyLmNvbSIsImV4cCI6MTU2NDQ4OTI2MH0.znhHVtkKmjQeAPlonMChBBlCoGwrBjJJjGI_jxip86GUAbkCbUQ8ooT8n5MPhiTps9O5eSEpyPjVbbMAP7Os7A');