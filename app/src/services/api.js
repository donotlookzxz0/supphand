import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_URL,
    withCredentials: true,
    sameSite: "None",
    secure: true,
})

export default api;