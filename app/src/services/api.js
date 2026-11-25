import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_PR_URL,
    withCredentials: true,
})

export default api;