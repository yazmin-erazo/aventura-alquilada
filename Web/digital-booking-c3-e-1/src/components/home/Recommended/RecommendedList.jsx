import { useEffect, useState } from "react";
import ProductCard from "../../resources/Cards/Recommended/ProductCard";
import styles from "./RecommendedList.module.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Pagination from "../../resources/pagination/Pagination";

const RecommendedList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [currentProducts, setCurrentProducts] = useState([])
  let pageLimit = 10;

  const onPageChanged = data => {
    const offset = (data.currentPage - 1) * data.pageLimit;
    setCurrentProducts(products.slice(offset, offset + data.pageLimit));
  }

  useEffect(() => {
    axios.get("/db.json")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [currentProducts]);

  return (
    <div className={styles.container}>
      <div className={styles.recommendedList}>
        {products.length < 10 ? products.map((product) => (
          <div key={product.id} onClick={() => navigate(`/products/${product.id}`)}><ProductCard product={product} /></div> 
        )) :
        currentProducts.map((product) => (
          <div key={product.id} onClick={() => navigate(`/products/${product.id}`)}><ProductCard product={product} /></div> 
        )) 
      }
      </div>
      { products.length > 0 &&
        <Pagination onPageChanged = {onPageChanged} limit = {pageLimit} total = {products.length}  />
      }
    </div>
  );
}

export default RecommendedList;