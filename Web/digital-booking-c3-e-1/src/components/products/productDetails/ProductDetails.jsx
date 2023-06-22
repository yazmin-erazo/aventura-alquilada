import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/AuthContext";
import { ProductsContext } from "../../../context/ProductsContext";
import moment from "moment";
import { getDistance } from "geolib";

import styles from "./ProductDetails.module.css";
import { AiOutlineTag, AiOutlineClockCircle } from "react-icons/ai";
import { BsGenderAmbiguous, BsPalette } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { MdOutlineTexture, MdLocationOn } from "react-icons/md";
import { TfiRulerAlt } from "react-icons/tfi";
import ImageGallery from "../../common/imagegalery/ImageGallery";
import Qualification from "../../resources/qualification/Qualification";
import RatingStats from "../../resources/rating/RatingStats";
import Politics from "../../resources/Politics/Politics";
import CalendarProducts from "../../resources/Calendar/CalendarProducts";
import ProductMap from "../../resources/productMap/ProductMap";
import SelectedDates from "../../resources/Calendar/SelectedDates";
import ShareIcon from "./ShareIcon";

const ProductDetails = () => {
  const data = useContext(ProductsContext);
  const auth = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [totalRentalDays, setTotalRentalDays] = useState(0);

  const handleSelectDates = (startDate, endDate) => {
    if (startDate > endDate) {
      setSelectedStartDate(endDate);
      setSelectedEndDate(startDate);
    } else {
      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);
    }
  };

  const product = products.find((p) => {
    return p.id === parseInt(params.id);
  });
  
  
  useEffect(() => {
    setProducts(data.products);
    const dates = JSON.parse(sessionStorage.getItem("dates"))
    if(dates){
      handleSelectDates(dates.startDate, dates.endDate);
    }
  }, [data, product]);
  
  // --------------------START calculo distancia usuario - producto --------------
  let distance = null;
  if (product) {
    const userLocation = auth.userLocation;
    const productLocation = {
      latitude: product.city.latitude,
      longitude: product.city.longitude,
    };
    distance = userLocation
    ? getDistance(userLocation, productLocation) / 1000
    : null;
    console.log(userLocation);
    console.log(productLocation);
  }
  // --------------------END calculo distancia usuario - producto --------------
  
  // --------------------START calcula la diferencia en días con la funcion diff de moment --------------
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const diffDays = Math.abs(
        moment(selectedEndDate).diff(selectedStartDate, "days") + 1
      );
      setTotalRentalDays(diffDays);
    } else {
      setTotalRentalDays(0);
    }
  }, [selectedStartDate, selectedEndDate]);
  // -------------------- END Total días --------------

  const showButton = selectedStartDate && selectedEndDate;
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
                  <p className={styles.city}>{product.city.name}</p>
                  {distance && (
                    <p className={styles.distance}>
                      A {distance.toFixed(0)} km de ti
                    </p>
                  )}
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
            <div className={styles.shareButton}>
              <ShareIcon product={product} />
            </div>
            <ImageGallery product={product} />
            <div className={styles.productDetails}>
              <div className={styles.description}>
                <div className={`${styles.descriptionContainer}`}>
                  <h2 className={styles.descriptionTitle}>{product.name}</h2>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                </div>

                <div className={`${styles.review} ${styles.section}`}>
                  <Qualification
                    isLoggedIn={auth.isLogedIn}
                    productId={productId}
                  />
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

              <div className={styles.calendar}>
                <h3 className={styles.calendarTitle}> Fechas disponibles </h3>
                <div className={styles.calendarRent}>
                  <section className={styles.calendarRentSection}>
                    <CalendarProducts
                      onSelectDates={handleSelectDates}
                      rents={product.rents}
                    />
                  </section>
                  <section className={styles.calendarRentSection}>
                    {showButton ? (
                      <SelectedDates
                        selectedStartDate={selectedStartDate}
                        selectedEndDate={selectedEndDate}
                        totalRentalDays={totalRentalDays}
                      />
                    ) : (
                      <p>Selecciona las fechas de tu reserva</p>
                    )}
                  </section>
                </div>
              </div>

              <div className={styles.politics}>
                <Politics />
              </div>
              <h3 className={styles.locationProduct}>Ubicación del producto</h3>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <ProductMap
              latitude={product.city.latitude}
              longitude={product.city.longitude}
              product={product}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
