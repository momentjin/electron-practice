import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:8080';
const UNAUTHORIZED = 401;

const onUnauthorized = () => {
    router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`)
}

const request = (method, url, data) => {
    return axios({
            method,
            url: DOMAIN + url,
            data
        })
        .then(result => result.data)
        .catch(result => {
            const { status } = result.response;
            
            if (status === UNAUTHORIZED) 
                onUnauthorized();
            
            // 흐음.. 안타까운 코드구만..
            else if (status == '500' && result.response.data.message.includes('토큰')) {
                delete localStorage.token;
                onUnauthorized();
            }

            throw result.response
        })
}

// TODO : 중복되는 부분이 많다. axios 인스턴스를 바로 리턴하지 말아야겠다.
const multipartFormRequest = (method, url, data) => {
    const headers = axios.defaults.headers;
    headers['Content-Type'] = 'multipart/form-data';

    return axios({
        method,
        url: DOMAIN + url,
        data,
        headers: headers
    })
    .then(result => result.data)
    .catch(result => {
        const { status } = result.response;
        
        if (status === UNAUTHORIZED) 
            onUnauthorized();
        
        // 흐음.. 안타까운 코드구만..
        else if (status == '500' && result.response.data.message.includes('토큰')) {
            delete localStorage.token;
            onUnauthorized();
        }

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
        return request('get', '/members/me')
    },
    signUp(data) {
        return request('post', '/members/signup', data)
    },
    signIn(data) {
        return request('post', '/login', data)
    },
    updateMemberInfo(data) {
        return request('put', '/members', data)
    }
}

export const converter = {
    convert(files) {
        return multipartFormRequest('post', '/converter', files);
    }
}