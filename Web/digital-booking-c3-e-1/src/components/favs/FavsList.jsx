import React, { useState, useEffect, useContext } from "react";
import FavCard from "../resources/Cards/Fav/FavCard";
import ProductService from "../../shared/services/ProductsService";
import { UserContext } from "../../context/AuthContext";
import axios from "axios";
import favoritesData from "../../../src/assets/favorites.json";
import styles from "./FavsList.module.css";

const FavsList = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);
  console.log(user, products);

  // Aqui estoy asumiendo que vamos a trabajar con el correo del usuario
  // por eso coloque user.sub

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(`/favorites/${user.sub}`);
  //         setProducts(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     fetchData();
  //   }, [user]);

  useEffect(() => {
    // Trabaje con el favorites.json que coloque en la carpeta public
    // hasta que los datos reales estén disponibles en la base de datos
    const fetchData = async () => {
      try {
        const filteredFavorites = favoritesData.favorites.filter(
          (favorite) => favorite.userId === user.id
        );
        setProducts(filteredFavorites);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <div className={styles.containerFavs}>
        <div className={styles.section}>
          {products.map((product) => (
            <FavCard
              key={product.id}
              product={product}
              rentalType="Alquiler por día"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FavsList;
