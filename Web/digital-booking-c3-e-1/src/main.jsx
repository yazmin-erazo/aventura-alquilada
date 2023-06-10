import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./components/home/HomePage.jsx"
import Details from "./components/products/productDetails/ProductDetails.jsx"
import AddProduct from './components/products/productAddForm/RegisterProduct.jsx';
import EditProduct from './components/products/productEditForm/EditProduct.jsx';
import NewCategory from './components/categories/categoryAddForm/NewCategory.jsx';
import CrudCategory from './components/categories/CrudCategories/CrudCategory.jsx';
import NewRole from './components/roles/roleFormAdd/NewRole.jsx';
import EditRole from './components/roles/editRole/EditRole.jsx'
import Crud from "./components/products/Crud/Crud.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/user/userAddForm/RegisterUser.jsx";
import Login from "./components/user/login/Login.jsx";
import ActivateUser from "./components/user/activateUser/ActivateUser.jsx";
import UsersCrud from "./components/user/userCrud/UsersCrud.jsx";
import CrudRoles from "./components/roles/CrudRoles/CrudRoles.jsx"


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='/' element={<Home />} />
        <Route path='products/:id' element={<Details />} />
        <Route path='admin/product/add' element={<AddProduct />} />
        <Route path='admin/product/edit' element={<EditProduct />} />
        <Route path='admin/' element={<Crud />} />
        <Route path='admin/category/add' element={<NewCategory />} />
        <Route path='admin/category/list' element={<CrudCategory />} />
        <Route path='admin/role/add' element={<NewRole />} />
        <Route path='admin/role/edit/:id' element={<NewRole />} />
        <Route path='admin/role' element={<CrudRoles />} />
        <Route path='login' element={<Login />} />
        <Route path='auth/register' element={<RegisterUser />} />
        <Route path='user/activate' element={<ActivateUser />} />
        <Route path='admin/user' element={<UsersCrud />} />
      </Route>
    </Routes>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);