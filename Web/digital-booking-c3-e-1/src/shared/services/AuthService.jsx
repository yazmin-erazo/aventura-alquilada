import API from "../environment/APIConfig";
import Swal from 'sweetalert2';

const AUTH_ENDPOINTS = {
    REGISTER: "user",
    LOGIN: ""
}

const AuthService = {
    register: (newUser) =>{ return API.post(AUTH_ENDPOINTS.REGISTER, newUser).then(
        res => {
            if (res.status === 201) {
                Swal.fire('¡Gracias!', 'Revisa tu casilla de correo para completar el registro', 'success');
              }
           return res.data;
        })
        .catch(error => {
            console.log(error);
            if (error.response && error.response.status === 400) {
              Swal.fire('Error', 'El usuario ya se encuentra registrado', 'error');
            } else {
              Swal.fire('Error', 'Ha ocurrido un error en el servidor', 'error');
            }
            throw error;
          });
      },
        

        
    login: (userData) => API.post(AUTH_ENDPOINTS.LOGIN, userData).then(
        res => res.data
    )
}

export default AuthService;