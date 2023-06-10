import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ProductsDataContext } from "../../context/ProductsContext";
import { UserContext } from "../../context/AuthContext";
import styles from "./MainPage.module.css";
import SinglePanel from "../dashboard/SinglePanel";

const MainPage = () => {
  const { user } = useContext(UserContext);
  const style = user.role == "Admin" ? styles.withPanel : "";

  return (
    <>
      <div className={`${styles.outlet} ${style}`}>
        <SinglePanel />
        <ProductsDataContext>
          <div className={styles.main}>
            <Outlet />
          </div>
        </ProductsDataContext>
      </div>
    </>
  );
};

export default MainPage;
