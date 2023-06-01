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
import ImageGallery from "../../common/imagegalery/imagegalery/ImageGallery";

const ProductDetails = ({ product }) => {
  const data = useContext(ProductsContext);
  const [products, setProducts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const exampleImages = [
      {
        id: 1,
        title: "Imagen principal",
        url: "https://picsum.photos/500/500?random",
      },
      {
        id: 2,
        title: "Imagen 1",
        url: "https://picsum.photos/500/500?random",
      },
      {
        id: 3,
        title: "Imagen 2",
        url: "https://picsum.photos/500/500?random",
      },
      {
        id: 4,
        title: "Imagen 3",
        url: "https://picsum.photos/500/500?random",
      },
      {
        id: 5,
        title: "Imagen 4",
        url: "https://picsum.photos/500/500?random",
      },
    ];

    setImages(exampleImages);
  }, []);

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

          <div className={styles["details-container"]}>
            <ImageGallery images={images} />

            <div className={styles.productDetails}>
              <div className={styles.description}>
                <div className={styles.category}>{product.category}</div>
                <h3>{product.name}</h3>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <p className={styles.price}>${product.price}</p>
              </div>
            </div>

            <div className={styles.colorBoxFeature}></div>
            <div className={styles.productFeature}>
              <h2 className={styles.titleFeature}>Características</h2>
              <div className={styles.feature}>
                <p className={styles.textFeature}>
                  <AiOutlineTag color="var( --primary-600)" /> {product.brand}
                </p>
                <p className={styles.textFeature}>
                  <MdOutlineTexture color="var( --primary-600)" />{" "}
                  {product.material}
                </p>
                <p className={styles.textFeature}>
                  <TfiRulerAlt color="var( --primary-600)" /> {product.size}
                </p>
                <p className={styles.textFeature}>
                  <BsPalette color="var( --primary-600)" /> {product.color}
                </p>
                <p className={styles.textFeature}>
                  <BsGenderAmbiguous color="var( --primary-600)" />{" "}
                  {product.gender}
                </p>
                <p className={styles.textFeature}>
                  <FiInfo color="var( --primary-600)" /> {product.state}
                </p>
                <p className={styles.textFeature}>
                  <AiOutlineClockCircle color="var( --primary-600)" /> Alquiler
                  por día
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;