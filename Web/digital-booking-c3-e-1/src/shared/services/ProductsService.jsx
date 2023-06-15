import API from "../environment/APIConfig";

const PRODUCTS_ENDPOINTS = {
    ALL_PRODUCTS: 'product/products',
    PRODUCT_DETAILS: 'product/',
    CREATE_PRODUCT: 'product',
    DELETE_PRODUCT: 'product/',
    UPDATE_PRODUCT: 'product/',
    ADD_FAV:'product/favorite',
    DELETE_FAV:'product/favorite/',
    COMMENT_PRODUCT: 'product/comment'
}

const ProductsService = {
    getAll: () => API.get(PRODUCTS_ENDPOINTS.ALL_PRODUCTS).then(
        res => res.data
    ),

    getById: id => API.get(PRODUCTS_ENDPOINTS.PRODUCT_DETAILS + id)
        .then(
            res => res.data
        ),

    create: payload => API.post(PRODUCTS_ENDPOINTS.CREATE_PRODUCT, payload).then(
        res => res.data
    ),

    deleteByID: id => 
        API.delete(PRODUCTS_ENDPOINTS.DELETE_PRODUCT + id)
        .then(
            res => res
        ),

    updateByID: (id, product) => API.put(PRODUCTS_ENDPOINTS.UPDATE_PRODUCT + id, product)
        .then(
            res => res.data
        ),

    addFav:(payload) => API.post(PRODUCTS_ENDPOINTS.ADD_FAV, payload).then(
        res=>res.data
    ),
    deleteFav:(id) => API.delete(PRODUCTS_ENDPOINTS.DELETE_FAV+id).then(
        res=>res.data
    ),

    comment: payload => API.post(PRODUCTS_ENDPOINTS.COMMENT_PRODUCT, payload).then(
        res => res
    )    

}

export default ProductsService;