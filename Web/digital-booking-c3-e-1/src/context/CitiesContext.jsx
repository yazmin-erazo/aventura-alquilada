import React, { createContext, useState, useEffect } from "react";
import CitiesService from "../shared/services/CitiesService";

const CitiesContext = createContext();

const CitiesDataContext = ({ children }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CitiesService.getAll();
        setCities(data);
      } catch (err) {
        console.log(`Error al cargar ciudades: ${err}`);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <CitiesContext.Provider value={{ cities }}>
        {children}
      </CitiesContext.Provider>
    </>
  );
};

export { CitiesContext, CitiesDataContext };
