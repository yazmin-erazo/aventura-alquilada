import { useEffect, useState } from "react";
import ProductCard from "../../resources/Cards/Recommended/ProductCard";
import styles from "./RecommendedList.module.css";
import axios from "axios";
import { Link } from 'react-router-dom';

const RecommendedList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/db.json")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.recommendedList}>
        {products.map((product) => (
          <Link key={product.id} to="/detalles"><ProductCard product={product} /></Link> 
        ))}
      </div>
    </div>
  );
}

export default RecommendedList;