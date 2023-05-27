import "./App.css";
import { Outlet } from "react-router-dom";
import { ProductsDataContext } from "./context/ProductsContext";
import { UserDataContext } from "./context/AuthContext";
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"

function App() {

  return (
    <>
    <UserDataContext>
      <Header />
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
