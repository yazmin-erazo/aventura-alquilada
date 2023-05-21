import API from "../environment/APIConfig";

const CATEGORY_ENDPOINTS = {
    ALL_CATEGORIES: 'category/categories'
}

const CategoryService = {
  getAll: () => API.get(CATEGORY_ENDPOINTS.ALL_CATEGORIES).then(
    res => res.data
  )
}

export default CategoryService;