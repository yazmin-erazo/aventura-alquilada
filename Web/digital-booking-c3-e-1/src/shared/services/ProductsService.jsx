import API from "../environment/APIConfig";

const PRODUCTS_ENDPOINTS = {
    ALL_PRODUCTS: 'product/products',
    PRODUCT_DETAILS: 'product/'
}

const ProductsService = {
    getAll: () => API.get(PRODUCTS_ENDPOINTS.ALL_PRODUCTS).then(
        res => res.data
    ),

    getById : id => API.get(PRODUCTS_ENDPOINTS.PRODUCT_DETAILS + id)
        .then(
            res => res.data
    )

}

export default ProductsService;