import React, { createContext, useState, useEffect } from "react";
import CategoryService from "../shared/services/CategoryService";

const CategoriesContext = createContext();

const CategoriesDataContext = ({ children }) => {
  const [Category, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CategoryService.getAll();
        setCategories(data);
      } catch (err) {
        console.log(`Error al cargar productos: ${err}`);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <CategoriesContext.Provider value={{ Category }}>
        {children}
      </CategoriesContext.Provider>
    </>
  );
};

export { CategoriesContext, CategoriesDataContext };
