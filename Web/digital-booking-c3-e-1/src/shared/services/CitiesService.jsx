import API from "../environment/APIConfig";

const CITIES_ENDPOINTS = {
    ALL_CITIES: 'city/cities',
    CITY_DETAILS: 'city/',
    CREATE_CITY: 'city',
    DELETE_CITY: 'city/',
    UPDATE_CITY: 'city/'
}

const CitiesService = {
    getAll: () => API.get(CITIES_ENDPOINTS.ALL_CITIES).then(
        res => res.data
    ),

    getById: id => API.get(CITIES_ENDPOINTS.CITY_DETAILS + id)
        .then(
            res => res.data
        ),

    create: city => API.post(CITIES_ENDPOINTS.CREATE_CITY, city).then(
        res => res.data
    ),

    deleteByID: id => 
        API.delete(CITIES_ENDPOINTS.DELETE_CITY + id)
        .then(
            res => res
        ),

    updateByID: (id, city) => API.put(CITIES_ENDPOINTS.UPDATE_CITY + id, city)
        .then(
            res => res.data
        )

}

export default CitiesService;