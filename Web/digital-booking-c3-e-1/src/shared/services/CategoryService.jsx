import API from "../environment/APIConfig";
import Swal from "sweetalert2";

const CATEGORY_ENDPOINTS = {
  ALL_CATEGORIES: "category/categories",
  CREATE_CATEGORY: "category",
  DELETE_CATEGORY: "category/",
  HAS_PRODUCTS: "category/",
};

const CategoryService = {
  getAll: () =>
    API.get(CATEGORY_ENDPOINTS.ALL_CATEGORIES).then((res) => res.data),
  create: (payload) =>
    API.post(CATEGORY_ENDPOINTS.CREATE_CATEGORY, payload)
      .then((res) => {
        Swal.fire("¡Éxito!", "Se ha creado la categoría", "success");
        return res.data;
      })
      .catch((err) => {
        Swal.fire("Error", "Ha ocurrido un error", "error");
        throw err;
      }),
  deleteByID: id => 
    API.delete(CATEGORY_ENDPOINTS.DELETE_CATEGORY+id),
};

export default CategoryService;
