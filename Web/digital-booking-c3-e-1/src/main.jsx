import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./components/home/HomePage.jsx"
import Details from "./components/products/productDetails/ProductDetails.jsx"
import AddProduct from './components/products/productAddForm/RegisterProduct.jsx';
import NewCategory from "./components/products/categoryAddForm/NewCategory.jsx";
import NewRole from "./components/products/roleFormAdd/NewRole.jsx";
import Crud from "./components/products/Crud/Crud.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='/' element={<Home />} />
        <Route path='products/:id' element={<Details />} />
        <Route path='administration/add' element={<AddProduct />} />
        <Route path='administration/' element={<Crud />} />
        <Route path='administration/category/add' element={<NewCategory />} />
        <Route path='administration/role/add' element={<NewRole />} />
      </Route>
    </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
