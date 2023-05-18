import { useContext, useEffect, useState } from "react";
import ProductCard from "../../resources/Cards/Recommended/ProductCard";
import styles from "./RecommendedList.module.css";
import { useNavigate } from 'react-router-dom';
import Pagination from "../../resources/pagination/Pagination";
import { ProductsContext } from "../../../context/ProductsContext";

const RecommendedList = () => {

  const data = useContext(ProductsContext)
  const pageLimit = 10;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [currentProducts, setCurrentProducts] = useState([])

  const onPageChanged = data => {
    const offset = (data.currentPage - 1) * pageLimit;
    setCurrentProducts(products.slice(offset, offset + pageLimit));
  }

  useEffect(() => {
    setProducts(data.products)
  }, [data, currentProducts]);

  return (
    <div className={styles.container}>
      <div className={styles.recommendedList}>
        {products.length < 10 ? products.map((product) => (
          <div key={product.id} onClick={() => navigate(`/products/${product.id}`)}><ProductCard product={product} /></div> 
        )) : console.log(currentProducts) && currentProducts.length > 0 &&
        (currentProducts.map((product) => (
          <div key={product.id} onClick={() => navigate(`/products/${product.id}`)}><ProductCard product={product} /></div> 
          )) 
          && 
          <Pagination onPageChanged = {onPageChanged} limit = {pageLimit} total = {products.length}  />
        )}
      </div>
    </div>
  );
}

export default RecommendedList;