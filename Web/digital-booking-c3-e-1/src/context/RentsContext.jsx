import React, { createContext, useState, useEffect } from 'react'
import RentsService from '../shared/services/RentsService'

const RentsContext = createContext();

const RentsDataContext = ({children}) => {
  
  const [rents, setRents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await RentsService.getAll();
        console.log("Rentas obtenidas:", data); 
        setRents(data);
      }
      catch (err) {
        console.log(`Error al hacer la reserva: ${err}`);
      }
    };
    fetchData();
  }, []);
  
  return (
    <>
        <RentsContext.Provider value={{ rents }}>
            {children}
        </RentsContext.Provider>
    </>
  )
}

export { RentsContext, RentsDataContext };