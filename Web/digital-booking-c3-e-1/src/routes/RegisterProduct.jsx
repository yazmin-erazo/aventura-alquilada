import React from "react";
import ProductForm from "../components/products/productAddForm/ProductForm";

const RegisterProduct = () => {
  return (
    <div className="registerProduct">
      <h2>Registrar nuevo producto</h2>
      <p>Ingrese los datos del nuevo producto</p>
      <ProductForm />
    </div>
  );
};

export default RegisterProduct;
