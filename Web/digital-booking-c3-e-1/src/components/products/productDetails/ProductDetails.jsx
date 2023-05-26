import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import ButtonPrimary from '../../common/Buttons/ButtonPrimary';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './ProductDetails.module.css'
import { ProductsContext } from '../../../context/ProductsContext';
import { AiOutlineTag } from "react-icons/ai";
import { BsGenderAmbiguous } from "react-icons/bs";
import { BsPalette } from "react-icons/bs";
import { TfiRulerAlt } from "react-icons/tfi";
import { FiInfo } from "react-icons/fi";
import { MdOutlineTexture } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";

const ProductDetails = ({product}) => {

  const data = useContext(ProductsContext);
  const [products, setProducts] = useState([])
  const params = useParams();
  const navigate = useNavigate();

  
  product = products.find( p => {
    return (p.id === parseInt(params.id))
  })

  useEffect(() => {
    setProducts(data.products)
  }, [data]);

  return (
    <>
    {product && (
    <>
      <div className={styles.detailsHeader}>
          <p>{product.name}</p>
          <div onClick={() => navigate(-1)}>
            <ButtonPrimary><FaArrowLeft />  Volver</ButtonPrimary>
          </div>
          {/* <button onClick={() => navigate(-1)}><i className="fa-solid fa-chevron-left"></i></button> */}
      </div>
      <div className={styles.colorBoxContainer}></div>
      <div className={styles.productDetails}>
      <div className={styles.photo}>
              <div className={styles.photoPrincipal}>
                <img src={product.imageURL} alt={product.name}/>
              </div>
              <div className={styles.photoSecondary}>
                  <img src={product.image} alt={product.name} />
                  <img src={product.image} alt={product.name} />
                  <img src={product.image} alt={product.name} />
                  <img src={product.image} alt={product.name} />
              </div>
             <button className={styles.button} onClick={() => navigate()}> Ver más </button>

                    
      </div>

      <div className={styles.description}>
          <div className={styles.category}>{product.category}</div>
          <h3>{product.name}</h3>
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.price}>${product.price}</p>
        </div>
      </div>

      <div className={styles.colorBoxFeature}></div>
        <div className={styles.productFeature}>
          <h2 className={styles.titleFeature}>Características</h2>
          <div className={styles.feature}>
            <p className={styles.textFeature}><AiOutlineTag color='var( --primary-600)' /> {product.brand}</p>
            <p className={styles.textFeature}><MdOutlineTexture color='var( --primary-600)'/>  {product.material}</p>
            <p className={styles.textFeature}><TfiRulerAlt color='var( --primary-600)'/>  {product.size}</p>
            <p className={styles.textFeature}><BsPalette color='var( --primary-600)'/>  {product.color}</p>
            <p className={styles.textFeature}><BsGenderAmbiguous color='var( --primary-600)'/>  {product.gender}</p>
            <p className={styles.textFeature}><FiInfo color='var( --primary-600)'/>  {product.state}</p>
            <p className={styles.textFeature}><AiOutlineClockCircle color='var( --primary-600)'/>  Alquiler por día</p>
          </div>
      </div>
    </>)
  }
  </>
  )
}

export default ProductDetails