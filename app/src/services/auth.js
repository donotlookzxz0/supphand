import api from './api.js';

const register = async (username, email, password) => {
    try {
        const response = await api.post('/auth/register', {
            username,
            email,
            password
        });       
        return response.data
    } catch (err) {
        console.error(err);
        throw(err);
    } 
}

const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', {
            username,
            password
        });
        return response.data
    } catch (err) {
        console.error(err);
        throw(err);
    }
}

const fetchUser = async () => {
    try {
        const response = await api.post('/auth/me');
        return response.data;
    } catch (err) {
        console.error(err);
        throw(err);
    }
}

const logout = async () => {
    await api.post('/auth/logout/');
}

export {register, login, fetchUser, logout};