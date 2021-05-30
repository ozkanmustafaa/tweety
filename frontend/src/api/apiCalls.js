import axios from 'axios';

export const signup = (body) => {
    return axios.post('/api/1.0/users', body);
};  

export const login = creds => {
    return axios.post('/api/1.0/auth', {}, {auth : creds});
}

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}

export const getUsers = (page = 0, size = 3) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
    if(isLoggedIn){
        const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    }
    else{
        delete axios.defaults.headers['Authorization'];
    }
}

export const getUser = username => {
    return axios.get(`/api/1.0/users/${username}`);
}

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`, body);
}

export const postTweety = (tweety) => {
    return axios.post('/api/1.0/tweeties/', tweety);
}

export const getTweeties = (username, page = 0) => {
    const path = username ? `/api/1.0/users/${username}/tweeties/?page=` : '/api/1.0/tweeties/?page=';
    return axios.get( path + page);
}

export const getOldTweeties = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/tweeties/${id}` : `/api/1.0/tweeties/${id}`;
    return axios.get(path);
}

export const getNewTweetyCount = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/tweeties/${id}?count=true` : `/api/1.0/tweeties/${id}?count=true`;
    return axios.get(path);
}

export const getNewTweeties = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/tweeties/${id}?direction=after` : `/api/1.0/tweeties/${id}?direction=after`;
    return axios.get(path);
}