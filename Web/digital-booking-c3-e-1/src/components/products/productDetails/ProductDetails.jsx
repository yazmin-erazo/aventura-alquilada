import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import ButtonPrimary from '../../common/Buttons/ButtonPrimary';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './ProductDetails.module.css'
import axios from "axios";

const ProductDetails = () => {

  const [products, setProducts] = useState([])
  const params = useParams();
  const navigate = useNavigate();
  let product = {}
  
  useEffect(() => {
    axios.get("/db.json")
    .then(response => {
      setProducts(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);
  
  product = products.find( p => {
    return (p.id === parseInt(params.id))
  })

  return (
    <>
    {product && (
    <>
      <div className={styles.detailsHeader}>
          <p>{product.name}</p>
          <div onClick={() => navigate(-1)}>
            <ButtonPrimary><FaArrowLeft /></ButtonPrimary>
          </div>
          {/* <button onClick={() => navigate(-1)}><i className="fa-solid fa-chevron-left"></i></button> */}
      </div>
      <div className={styles.colorBoxContainer}></div>
      <div className={styles.productDetails}>
        <img src={product.image} alt={product.name} />
        <div className={styles.description}>
          <div className={styles.category}>{product.category}</div>
          <h3>{product.name}</h3>
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.price}>{product.price}</p>
        </div>
      </div>
    </>)
  }
  </>
  )
}

export default ProductDetails