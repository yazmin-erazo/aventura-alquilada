import axios from 'axios'

const BASE_URL = "http://localhost:8080/digitalbooking/"

const API = axios.create({
    baseURL: BASE_URL,
})

API.interceptors.request.use(
    async config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer' + token;
        }
        return config
    },
    err => Promise.reject(err)
)

export default API;