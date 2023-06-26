import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ProductsDataContext } from "../../context/ProductsContext";
import { ProductsFilterProvider } from "../../context/FilteredContext";
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
          <ProductsFilterProvider>
            <div className={styles.main}>
              <Outlet />
            </div>
          </ProductsFilterProvider>
        </ProductsDataContext>
      </div>
    </>
  );
};

export default MainPage;
