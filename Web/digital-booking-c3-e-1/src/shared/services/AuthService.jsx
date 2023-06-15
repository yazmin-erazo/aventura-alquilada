import API from "../environment/APIConfig";
import Swal from "sweetalert2";

const AUTH_ENDPOINTS = {
  REGISTER: "user",
  LOGIN: "auth",
  ACTIVATE: "user/activate",
  RESEND_EMAIL: "user/activation/email/send/",
};

const AuthService = {
  register: (newUser) => {
    return API.post(AUTH_ENDPOINTS.REGISTER, newUser)
      .then((res) => {
        if (res.status === 201) {
          Swal.fire(
            "¡Gracias!",
            "Revisa tu casilla de correo para completar el registro",
            "success"
          );
        }
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status !== 500) {
          Swal.fire("Error", "El usuario ya se encuentra registrado", "error");
        } else {
          Swal.fire("Error", "Ha ocurrido un error en el servidor", "error");
        }
        throw error;
      });
  },

  login: (userData) =>
    API.post(AUTH_ENDPOINTS.LOGIN, userData)
      .then((res) => {
        Swal.close();
        return res.data;
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al iniciar sessión",
          text: err.response.data.mensaje,
          confirmButtonText: "Entendido",
          confirmButtonColor: "#a6cf7e",
        }).then((result) => {
          if (result.isConfirmed) Swal.close();
        });
      }),

  activate: (params) =>
    API.get(AUTH_ENDPOINTS.ACTIVATE + params).then((res) => res),

  resendEmail: (params) =>
    API.get(AUTH_ENDPOINTS.RESEND_EMAIL + params).then((res) => res),
};

export default AuthService;
