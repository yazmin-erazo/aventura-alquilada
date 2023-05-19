import { useContext, useEffect, useState } from "react";
import ProductCard from "../../resources/Cards/Recommended/ProductCard";
import styles from "./RecommendedList.module.css";
import { useNavigate } from 'react-router-dom';
import Pagination from "../../resources/pagination/Pagination";
import { ProductsContext } from "../../../context/ProductsContext";
import axios from "axios";

const RecommendedList = ({ selectedCategory }) => {

  const data = useContext(ProductsContext)
  const pageLimit = 10;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [currentProducts, setCurrentProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [shuffledProducts, setShuffledProducts] = useState([]);

  const onPageChanged = () => {
    const offset = (currentPage - 1) * pageLimit;
    console.log(offset);
    setCurrentProducts(shuffledProducts.slice(offset, offset + pageLimit));
  }

  useEffect(() => {
    let url = "db.json";

    if (selectedCategory) {
      url += `?category=${selectedCategory.id}`;
    }
    setProducts(data.products)


      setShuffledProducts(data.products.sort(() => Math.random() - 0.5));
  }, [selectedCategory, data, currentPage]);

  useEffect(() => {
    // Agregar un pequeño retraso antes de actualizar los productos filtrados
    const delay = setTimeout(() => {
      const filtered = selectedCategory
        ? shuffledProducts.filter((product) => product.category === selectedCategory.name)
        : shuffledProducts;

      setFilteredProducts(filtered);
    }, 100);

    return () => clearTimeout(delay); // Limpiar el temporizador en caso de que se desmonte el componente

  }, [selectedCategory, products]);

  return (
    <div className={styles.container}>
      <div className={styles.recommendedList}>
        {
          products.length <= 10 ? shuffledProducts.map( product => (
            <div key={product.id} onClick={() => navigate(`/products/${product.id}`)}><ProductCard product={product} /></div>
          )) :(
          currentProducts.map((product) => (
            <div key={product.id} onClick={() => navigate(`/products/${product.id}`)}><ProductCard product={product} /></div>
          )))
        }
      </div>
      {products.length > 0 && <Pagination onPageChanged={onPageChanged} limit={pageLimit} total={products.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default RecommendedList;