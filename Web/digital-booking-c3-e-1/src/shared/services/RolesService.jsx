import API from "../environment/APIConfig";

const ROLES_ENDPOINTS = {
    ALL_ROLES: 'role/roles',
    CREATE_ROLE: 'role',
    DELETE_ROLE: 'role/',
    ROLE_DETAILS: 'role'
}

const RolesService = {
    getAll: () => API.get(ROLES_ENDPOINTS.ALL_ROLES).then(
        res => res.data
    ),

    getById: id => API.get(ROLES_ENDPOINTS.ROLE_DETAILS + id)
        .then(
            res => res.data
    ),

    create: payload => API.post(ROLES_ENDPOINTS.CREATE_ROLE, payload).then(
        res => res.data
    ),

    deleteByID: id => API.delete(ROLES_ENDPOINTS.DELETE_ROLE + id)

}

export default RolesService;