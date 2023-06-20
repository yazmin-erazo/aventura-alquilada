import React, { createContext, useState } from 'react';

export const ProductsContextFilter = createContext();

export const ProductsFilterProvider = ({ children }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <ProductsContextFilter.Provider value={{ filteredProducts, setFilteredProducts }}>
      {children}
    </ProductsContextFilter.Provider>
  );
};