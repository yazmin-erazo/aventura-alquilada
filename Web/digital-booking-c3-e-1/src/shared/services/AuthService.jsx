import API from "../environment/APIConfig";

const AUTH_ENDPOINTS = {
    REGISTER: "user",
    LOGIN: ""
}

const AuthService = {
    register: (newUser) => API.post(AUTH_ENDPOINTS.REGISTER, newUser).then(
        res => res.data
    ),
    login: (userData) => API.post(AUTH_ENDPOINTS.LOGIN, userData).then(
        res => res.data
    )
}

export default AuthService;