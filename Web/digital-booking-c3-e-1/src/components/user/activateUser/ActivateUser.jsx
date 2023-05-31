import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import AuthService from '../../../shared/services/AuthService';

const ActivateUser = () => {

    const [params] = useSearchParams();
    const token = params.get('token')
    console.log(token);

    useEffect( () => {
        const callingAPI = async () =>{
            try{ 
            await AuthService.activate(`?token=${token}`);
            }
            catch (err) {
            console.log(`Error al validar el email: ${err}`);
            }
        };
        callingAPI();
    }, []
    )

  return (
    <div>Se ha activado correctamente su cuenta.
        Revise su correo.
    </div>
  )
}

export default ActivateUser;