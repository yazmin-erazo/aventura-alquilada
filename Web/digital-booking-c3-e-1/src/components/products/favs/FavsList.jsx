import React, { useState, useEffect, useContext } from "react";
import FavCard from "../../resources/Cards/Fav/FavCard";
import { UserContext } from "../../../context/AuthContext";
import styles from "./FavsList.module.css";
import { ProductsContext } from "../../../context/ProductsContext";
import ProductsService from "../../../shared/services/ProductsService";

const FavsList = () => {
  const data = useContext(ProductsContext);
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]); // Estado para almacenar los productos (Aqui vienen como objeto todos los productos)
  const [favs, setFavs] = useState([]); // Estado para almacenar los productos favoritos (estos vienen en un array de numeros o sea los id del product)
  const [productDetails, setProductDetails] = useState([]); // Estado para almacenar productos favoritos del usuaru

  useEffect(() => {
    if (data.products.length > 0 && user.favorites.length > 0) {
      setProducts(data.products); // Actualiza el estado de los productos guardando los productos que vienen del context
      const filteredFavorites = user.favorites.filter((favorite) =>
        data.products.some((product) => product.id === favorite)
      );
      setFavs(filteredFavorites); // Actualizar el estado de los productos favoritos que vienen del user.favorites
    }
  }, [data, user]);

  useEffect(() => {
    const productMap = {}; // Objeto para mapear los productos por ID
    products.forEach((product) => {
      productMap[product.id] = product; // Mapea los productos por ID
    });

    const favoriteProductDetails = favs.map((favorite) => productMap[favorite]); // Obtene los detalles de los productos favoritos usando el mapeo
    setProductDetails(favoriteProductDetails);
  }, [favs, products]);

  const handleRemoveFavorite = async (productId) => {
    try {
      await ProductsService.deleteByID(user.favorite); // Llama a la función para eliminar el favorito de la base de datos

      const updatedFavorites = favs.filter(
        (favorite) => favorite !== productId
      );
      setFavs(updatedFavorites);
    } catch (error) {
      console.error("Error al eliminar el favorito:", error);
      // Manejo de errores o muestra de mensajes de error
    }
  };

  return (
    <div className={styles.containerFavs}>
      <header className={styles.header}>
        <h4 className={styles.addFavsTitle}>Mis Favoritos</h4>
      </header>
      <div className={styles.section}>
        {productDetails.map((product) => (
          <FavCard
            key={product.id}
            product={product}
            rentalType="Alquiler por día"
            onRemoveFavorite={handleRemoveFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default FavsList;
