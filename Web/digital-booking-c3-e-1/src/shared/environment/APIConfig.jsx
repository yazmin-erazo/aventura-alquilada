import axios from 'axios'

// Entorno local
//const BASE_URL = "http://localhost:8080/digitalbooking/"
// Entorno Prod
const BASE_URL = "http://ec2-13-58-145-4.us-east-2.compute.amazonaws.com/digitalbooking/"

const API = axios.create({
    baseURL: BASE_URL,
})

API.interceptors.request.use(
    async config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
            config.headers['Access-Control-Allow-Origin'] = '*';
            config.headers['Access-Control-Allow-Credentials'] = 'true'
        }
        return config
    },
    err => Promise.reject(err)
)

export default API;
