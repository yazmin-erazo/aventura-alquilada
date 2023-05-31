import API from "../environment/APIConfig";

const ROLES_ENDPOINTS = {
    ALL_PRODUCTS: 'role/roles',
    CREATE_PRODUCT: 'role',
    DELETE_PRODUCT: 'role/'
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