import "./App.css";
import { Outlet } from "react-router-dom";
import { ProductsDataContext } from "./context/ProductsContext";
import { UserDataContext } from "./context/AuthContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Panel from "./components/dashboard/panel";

function App() {
  return (
    // Linea 40 y 254 estilos del panel de administración
    <>
    <UserDataContext>
        <Header />
        <Panel />
        <div className="outlet"> 
          <ProductsDataContext>
            <Outlet />
          </ProductsDataContext>
        </div>
      <Footer />
    </UserDataContext>
    </>
  );
}

export default App;
