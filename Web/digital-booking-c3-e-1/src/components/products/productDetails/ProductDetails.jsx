import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./ProductDetails.module.css";
import { ProductsContext } from "../../../context/ProductsContext";
import { AiOutlineTag } from "react-icons/ai";
import { BsGenderAmbiguous } from "react-icons/bs";
import { BsPalette } from "react-icons/bs";
import { TfiRulerAlt } from "react-icons/tfi";
import { FiInfo } from "react-icons/fi";
import { MdOutlineTexture } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";

const ProductDetails = ({ product }) => {
  const data = useContext(ProductsContext);
  const [products, setProducts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  product = products.find((p) => {
    return p.id === parseInt(params.id);
  });

  useEffect(() => {
    setProducts(data.products);
  }, [data]);

  return (
    <>
      {product && (
        <>
          <div className={styles.detailsHeaderContainer}>
            <div className={styles.detailsHeader}>
              <h2 className={styles.nameProduct}>{product.name}</h2>
              <div onClick={() => navigate(-1)}>
                <ButtonPrimary>
                  <FaArrowLeft /> Volver
                </ButtonPrimary>
              </div>
            </div>
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.productDetails}>
              <div className={styles.photo}>
                <div className={styles.photoPrincipal}>
                  <img src={product.imageURL} alt={product.name} />
                </div>
                <div className={styles.photoSecondary}>
                  <img src={product.image} alt={product.name} />
                  <img src={product.image} alt={product.name} />
                  <img src={product.image} alt={product.name} />
                  <img src={product.image} alt={product.name} />
                </div>
                <button className={styles.button} onClick={() => navigate()}>
                  {" "}
                  Ver más{" "}
                </button>
              </div>

              <div className={styles.description}>
                <div className={styles.category}>{product.category}</div>
                <div className={styles.descriptionContainer}>
                  <h3>{product.name}</h3>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                  <p className={styles.price}>${product.price}</p>
                </div>
              </div>

              <div className={styles.productFeature}>
                <h2 className={styles.titleFeature}>Características</h2>
                <div className={styles.feature}>
                  <div className={styles.textFeature}>
                    <AiOutlineTag size={24} />{" "}
                    <p className={styles.textFeatureDetails}>{product.brand}</p>
                  </div>
                  <div className={styles.textFeature}>
                    <MdOutlineTexture size={24} />{" "}
                    <p className={styles.textFeatureDetails}>
                      {product.material}
                    </p>
                  </div>
                  <div className={styles.textFeature}>
                    <TfiRulerAlt size={24} />{" "}
                    <p className={styles.textFeatureDetails}>{product.size}</p>
                  </div>
                  <div className={styles.textFeature}>
                    <BsPalette size={24} />{" "}
                    <p className={styles.textFeatureDetails}>{product.color}</p>
                  </div>
                  <div className={styles.textFeature}>
                    <BsGenderAmbiguous size={24} />{" "}
                    <p className={styles.textFeatureDetails}>
                      {" "}
                      {product.gender}
                    </p>
                  </div>
                  <div className={styles.textFeature}>
                    <FiInfo size={24} />
                    <p className={styles.textFeatureDetails}>
                      {" "}
                      {product.state}
                    </p>
                  </div>
                  <div className={styles.textFeature}>
                    <AiOutlineClockCircle size={24} />{" "}
                    <p className={styles.textFeatureDetails}>
                      {" "}
                      Alquiler por día
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
