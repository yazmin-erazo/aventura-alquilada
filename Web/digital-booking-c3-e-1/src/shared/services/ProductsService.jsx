import API from "../environment/APIConfig";

const PRODUCTS_ENDPOINTS = {
  ALL_PRODUCTS: "product/products",
  PRODUCT_DETAILS: "product/",
  CREATE_PRODUCT: "product",
  DELETE_PRODUCT: "product/",
  UPDATE_PRODUCT: "product/",
  ADD_FAV: "product/favorite",
  DELETE_FAV: "product/favorite/",
  COMMENT_PRODUCT: "product/comment",
};

const ProductsService = {
  getAll: (params = { search: "", cityId: "", startDate: "", endDate: "", brandFilter: "", genderFilter: "", priceLessThan: "", priceGreaterThan: "", sizeFilter: "", stateFilter: "", colorFilter: "", materialFilter: "", nameFilter:"" }) => {
    if (params.startDate) {
      params.startDate = params.startDate.format("YYYY-MM-DD");
    }
    if (params.endDate) {
      params.endDate = params.endDate.format("YYYY-MM-DD");
    }
    return API.get(PRODUCTS_ENDPOINTS.ALL_PRODUCTS, { params }).then((res) => res.data);
  },

  deleteByID: (id) =>
    API.delete(PRODUCTS_ENDPOINTS.DELETE_PRODUCT + id).then((res) => res),

  updateByID: (id, product) =>
    API.put(PRODUCTS_ENDPOINTS.UPDATE_PRODUCT + id, product).then(
      (res) => res.data
    ),
  create: (productData) =>
    API.post(PRODUCTS_ENDPOINTS.CREATE_PRODUCT, productData).then(
      (res) => res.data
    ),
  addFav: (payload) =>
    API.post(PRODUCTS_ENDPOINTS.ADD_FAV, payload).then((res) => res.data),
    deleteFav: (id) =>
    API.delete(PRODUCTS_ENDPOINTS.DELETE_FAV + id).then((res) => res.data),  
  comment: (payload) =>
    API.post(PRODUCTS_ENDPOINTS.COMMENT_PRODUCT, payload).then((res) => res),
};

export default ProductsService;