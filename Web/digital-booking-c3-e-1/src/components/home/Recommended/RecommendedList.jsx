import { useEffect, useState } from "react";
import ProductCard from "../../resources/Cards/Recommended/ProductCard";
import styles from "./RecommendedList.module.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const RecommendedList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
          <div key={product.id} onClick={() => navigate(`/products/${product.id}`)}><ProductCard product={product} /></div> 
        ))}
      </div>
    </div>
  );
}

export default RecommendedList;