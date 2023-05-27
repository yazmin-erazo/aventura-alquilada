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
import RegisterUser from "./components/user/userAddForm/RegisterUser.jsx";
import Login from "./components/login/Login.jsx";
import NewCategory from "./components/products/categoryAddForm/NewCategory.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='/' element={<Home />} />
        <Route path='products/:id' element={<Details />} />
        <Route path='admin/products/add' element={<AddProduct />} />
        <Route path='admin/' element={<Crud />} />
        <Route path='admin/category/add' element={<NewCategory />} />
        <Route path='admin/role/add' element={<NewRole />} />
        <Route path='login' element={<Login />} />
        <Route path='auth/register' element={<RegisterUser />} />
      </Route>
    </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
