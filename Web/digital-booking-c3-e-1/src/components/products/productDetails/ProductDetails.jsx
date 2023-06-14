import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import ImageGallery from "../../common/imagegalery/ImageGallery";
import Qualification from "../../resources/qualification/Qualification";
import { UserContext } from "../../../context/AuthContext";
import RatingStats from "../../resources/rating/RatingStats";
import Politics from "../../resources/Politics/Politics";
import { MdLocationOn } from "react-icons/md";
import ProductMap from "../../resources/productMap/ProductMap";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const ProductDetails = () => {
  const data = useContext(ProductsContext);
  const auth = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [isUserLocationLoaded, setIsUserLocationLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const [productImage, setProductImage] = useState("");

  const product = products.find((p) => {
    return p.id === parseInt(params.id);
  });

  useEffect(() => {
    setProducts(data.products);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setIsUserLocationLoaded(true);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setIsUserLocationLoaded(true);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsUserLocationLoaded(true);
    }

    const foundProduct = data.products.find((p) => p.id === parseInt(params.id));
    if (foundProduct) {
      setProductImage(foundProduct.imageURL);
    }
  }, [data]);

  const handleShareButtonClick = (shareUrl, quote, imageUrl, socialMedia) => {
    switch (socialMedia) {
      case "facebook":
        openShareDialogOnClick({ url: shareUrl, quote: quote, hashtag: `#${product.name}` }, "facebook");
        break;
      case "twitter":
        openShareDialogOnClick({ url: shareUrl, title: quote, hashtags: [product.name] }, "twitter");
        break;
      case "whatsapp":
        openShareDialogOnClick({ url: shareUrl, title: quote }, "whatsapp");
        break;
      default:
        break;
    }
  };

  const city = {
    name: "Buenos Aires",
    country: "Argentina",
    latitude: -34.6037,
    longitude: -58.3816,
  };

  const productPageUrl = product
    ? `http://equipamiento-deportivo-static.s3-website.us-east-2.amazonaws.com/products/${product.id}`
    : "";

  const productId = product ? product.id : null;

  return (
    <>
      {product && (
        <>
          <div className={styles.detailsHeaderContainer}>
            <div className={styles.detailsHeader}>
              <h2 className={styles.nameProduct}>{product.name}</h2>
              <div onClick={() => navigate(-1)}>
                <div className={styles.button}>
                  <FaArrowLeft /> <p> Volver </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.locationContainer}>
            <div className={styles.location}>
              <div className={styles.locationText}>
                <div className={styles.locationIcon}>
                  <div className={styles.circleIcon}>
                    <MdLocationOn size={24} />
                  </div>
                </div>

                <div>
                  <p className={styles.city}>
                    Buenos Aires, Ciudad Autónoma de Buenos Aires, Argentina
                  </p>
                  <p className={styles.proximity}> A 940 m del centro</p>
                </div>
              </div>

              <div className={styles.ratingStats}>
                <RatingStats
                  color="var(--semantics-success)"
                  totalColor="var(--secondary-50)"
                  className={styles.ratingStatsItem}
                />
              </div>
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <ImageGallery product={product} />

            <div className={styles.productDetails}>
              <div className={styles.description}>
                <div className={styles.descriptionContainer}>
                  <h2 className={styles.descriptionTitle}>{product.name}</h2>
                  <p className={styles.productDescription}>{product.description}</p>
                </div>

                <div className={styles.review}>
                  <Qualification
                    isLoggedIn={auth.isLogedIn}
                    productId={productId}
                  />
                </div>
              </div>

              <div className={styles.shareButtons} style={{ justifyContent: "flex-end", marginBottom: "10px" }}>
                <FacebookShareButton
                  url={productPageUrl}
                  quote={product.description}
                  hashtag={`#${product.name}`}
                  style={{ marginRight: "10px" }}
                  onClick={() =>
                    handleShareButtonClick(productPageUrl, product.description, productImage, "facebook")
                  }
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton
                  url={productPageUrl}
                  title={product.description}
                  hashtags={[product.name]}
                  style={{ marginRight: "10px" }}
                  onClick={() =>
                    handleShareButtonClick(productPageUrl, product.description, productImage, "twitter")
                  }
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>

                <WhatsappShareButton
                  url={productPageUrl}
                  title={product.description}
                  onClick={() =>
                    handleShareButtonClick(productPageUrl, product.description, productImage, "whatsapp")
                  }
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
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
                      {product.gender}
                    </p>
                  </div>
                  <div className={styles.textFeature}>
                    <FiInfo size={24} />
                    <p className={styles.textFeatureDetails}>{product.state}</p>
                  </div>
                  <div className={styles.textFeature}>
                    <AiOutlineClockCircle size={24} />{" "}
                    <p className={styles.textFeatureDetails}>
                      Alquiler por día
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.politics}>
                <Politics />
              </div>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <ProductMap
              latitude={city.latitude}
              longitude={city.longitude}
              city={city}
              product={product}
              userLocation={userLocation}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;