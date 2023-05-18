import React, { createContext } from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const ProductsContext = createContext();

const ProductsDataContext = ({children}) => {
    
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/digitalbooking/product/products")
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.log(error);
      })
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