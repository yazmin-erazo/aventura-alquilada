import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./components/home/HomePage.jsx";
import Details from "./components/products/productDetails/ProductDetails.jsx";
import AddProduct from "./components/products/productAddForm/RegisterProduct.jsx";
import Crud from "./components/products/Crud/Crud.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/user/userAddForm/RegisterUser.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="products/:id" element={<Details />} />
          <Route path="administration/add" element={<AddProduct />} />
          <Route path="administration/" element={<Crud />} />
          <Route path="auth/register" element={<RegisterUser />} />
        </Route>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
