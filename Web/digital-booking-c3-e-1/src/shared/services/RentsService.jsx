import Swal from "sweetalert2";
import API from "../environment/APIConfig";

const RENTS_ENDPOINTS = {
  ALL_RENTS: "rent/rents",
  RENT_DETAILS: "rent/",
  CREATE_RENT: "rent",
  DELETE_RENT: "rent/",
  UPDATE_RENT: "rent/",
};

const RentsService = {
  getAll: () => API.get(RENTS_ENDPOINTS.ALL_RENTS).then((res) => res.data),

  getById: (id) =>
    API.get(RENTS_ENDPOINTS.RENT_DETAILS + id).then((res) => res.data),

  create: (payload) =>
    API.post(RENTS_ENDPOINTS.CREATE_RENT, payload)
    .then((res) => {
      Swal.close();
      return res.data;
    })
    .catch((err) => {
      Swal.fire("Error", res.response.data.mensaje, "error")
     .then((result) => {
        if (result.isConfirmed) Swal.close();
      });
    }),

  deleteByID: (id) =>
    API.delete(RENTS_ENDPOINTS.DELETE_RENT + id).then((res) => res),

  updateByID: (id, rent) =>
    API.put(RENTS_ENDPOINTS.UPDATE_RENT + id, rent).then((res) => res.data),
};

export default RentsService;
