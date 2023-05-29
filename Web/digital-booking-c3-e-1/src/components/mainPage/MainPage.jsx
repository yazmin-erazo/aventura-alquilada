import React, { useContext } from 'react';
import { Outlet } from "react-router-dom";
import { ProductsDataContext } from "../../context/ProductsContext";
import Panel from "../dashboard/panel";
import { UserContext } from '../../context/AuthContext';
import styles from './MainPage.module.css'

const MainPage = () => {

    const user = useContext(UserContext);
    const style = user.currentUser.role == "admin" ? styles.withPanel : "";

  return (
    <>
    <Panel />
    <div className={`${styles.outlet} ${style}`}> 
      <ProductsDataContext>
        <Outlet />
      </ProductsDataContext>
    </div>
    </>
  )
}

export default MainPage