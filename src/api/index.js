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
    },
    save(data) {
        debugger;
        return request('post', '/coverletters/', data)
    },
    update(data) {
        debugger;
        return request('put', `/coverletters/${data.id}`, data)
    }    
}

// test
setAuthInHeader('JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuYW1lIjoi7KeE7J6s7Ja4IiwiaWQiOiJzX3dsc3dvZGpzQG5hdmVyLmNvbSIsImV4cCI6MTU1NzkxNjU2OH0.HVtwzPegAUimTF-VhLx4E8H_y8oFSVfSyNAN3DYlYZkTkfGaWuVX5RclEM7ycfhePmj2z7x6iBpCx9F-RAo7Rg');