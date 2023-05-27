import "./App.css";
import { Outlet } from "react-router-dom";
import { ProductsDataContext } from "./context/ProductsContext";
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"

function App() {

  return (
    <>
      <Header />
        <div className="outlet">
          <ProductsDataContext>
            <Outlet />
          </ProductsDataContext>
        </div>
      <Footer />
    </>
  );
}

export default App;
