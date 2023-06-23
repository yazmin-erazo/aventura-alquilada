import React, { useState, useEffect, useContext } from "react";
import FavCard from "../../resources/Cards/Fav/FavCard";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/AuthContext";
import styles from "./FavsList.module.css";
import { ProductsContext } from "../../../context/ProductsContext";
import ProductsService from "../../../shared/services/ProductsService";
import Swal from "sweetalert2";

const FavsList = () => {
  const data = useContext(ProductsContext);
  const { user, dispatch } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [favs, setFavs] = useState(user.favorites);
  const [productDetails, setProductDetails] = useState([]);

  console.log(user.favorites);
  useEffect(() => {
    if (data.products.length > 0 && user.favorites.length > 0) {
      setProducts(data.products);
      const filteredFavorites = user.favorites.filter((favorite) =>
        data.products.some((product) => product.id === favorite)
      );
      setFavs(filteredFavorites);
    }
  }, [data, user]);

  useEffect(() => {
    const productMap = {};
    products.forEach((product) => {
      productMap[product.id] = product;
    });

    const favoriteProductDetails = favs
      .map((favorite) => productMap[favorite])
      .filter((product) => product && product.id !== undefined);
    setProductDetails(favoriteProductDetails);
  }, [favs, products]);

  const handleRemoveFavorite = async (productId) => {
    try {
      await ProductsService.deleteFav(productId);

      const updatedFavorites = user.favorites.filter(
        (favorite) => favorite !== productId
      );
      dispatch({
        type: "UPDATE_FAVORITES",
        payload: { ...user, favorites: updatedFavorites },
      });
      setFavs(updatedFavorites);
      Swal.fire("Eliminado de favoritos", "El producto se ha eliminado de favoritos con éxito.", "success");
    } catch (error) {
      console.error("Error al eliminar el favorito:", error);
    }
  };

  return (
    <div className={styles.containerFavs}>
      <header className={styles.header}>
        <h4 className={styles.addFavsTitle}>Mis Favoritos</h4>
      </header>
      <div className={styles.section}>
        {productDetails.length > 0 ? (
          productDetails.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className={styles.productLink}
            >
              <FavCard
                product={product}
                rentalType="Alquiler por día"
                onRemoveFavorite={handleRemoveFavorite}
              />
            </Link>
          ))
        ) : (
          <p className={styles.text}>No hay productos favoritos</p>
        )}
      </div>
    </div>
  );
};

export default FavsList;