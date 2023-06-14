import React from "react";
import { Helmet } from 'react-helmet';
import "./App.css";
import { UserDataContext } from "./context/AuthContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import MainPage from "./components/mainPage/MainPage";


function App() {
  const baseUrl = 'http://equipamiento-deportivo-static.s3-website.us-east-2.amazonaws.com/';
  const message = `¡Desata tu lado aventurero con nuestro alquiler de equipo deportivo! 🌊🧗 De la escalada a los deportes acuáticos, lo tenemos TODO. ¡No sueñes, vive la aventura! 🔥 Equípate con lo mejor y sumérgete en la acción. 🚀 Tu próxima aventura te espera: `;

  return (
    <>
      <Helmet>
        <meta property="og:title" content="¡Desata tu lado aventurero con nuestro alquiler de equipo deportivo!" />
        <meta property="og:description" content={message} />
        <meta property="og:image" content="https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/registerUser.png" />
        <meta property="og:url" content={baseUrl} />
      </Helmet>

      <UserDataContext>
        <Header />
        <MainPage />
        <Footer />
      </UserDataContext>
    </>
  );
}

export default App;