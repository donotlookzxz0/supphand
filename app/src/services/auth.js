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

export {register, login};