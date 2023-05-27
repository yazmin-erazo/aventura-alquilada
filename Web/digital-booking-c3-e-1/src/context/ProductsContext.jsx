import React, { createContext, useState, useEffect } from 'react'
import ProductsService from '../shared/services/ProductsService';

const ProductsContext = createContext();

const ProductsDataContext = ({children}) => {
    
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductsService.getAll();
        setProducts(data);
      }
      catch (err) {
        console.log(`Error al cargar productos: ${err}`);
      }
    };
     fetchData();
  }, []);

  return (
    <>
        <ProductsContext.Provider value = {{products}}>
            {children}
        </ProductsContext.Provider>
    </>
  )
}

export { ProductsContext, ProductsDataContext };