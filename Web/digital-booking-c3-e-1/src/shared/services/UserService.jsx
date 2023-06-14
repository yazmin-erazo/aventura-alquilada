import API from "../environment/APIConfig";

const USERS_ENDPOINTS = {
    ALL_USERS: 'user/users',
    CREATE_USER: 'user',
    DELETE_USER: 'user/',
    USER_DETAILS: 'user'
}

const userService = {
    getAll: () => API.get(USERS_ENDPOINTS.ALL_USERS).then(
        res => res.data
    ),

    getById: id => API.get(USERS_ENDPOINTS.USER_DETAILS + id)
        .then(
            res => res.data
    ),

    create: payload => API.post(USERS_ENDPOINTS.CREATE_USER, payload).then(
        res => res.data
    ),

    deleteByID: id => API.delete(USERS_ENDPOINTS.DELETE_USER + id)

}

export default userService;