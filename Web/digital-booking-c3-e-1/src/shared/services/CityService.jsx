import API from "../environment/APIConfig";

const CITY_ENDPOINTS = {
    GET_ALL:''
}

const CityService = {
    getAll: () => API.get(CITY_ENDPOINTS.GET_ALL).then(
        res => res.data
    )
}

export default CityService;