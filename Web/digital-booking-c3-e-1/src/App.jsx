import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"
//import "typeface-roboto";

function App() {
  return (
    <>
      <Header />
      <div className="outlet">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
