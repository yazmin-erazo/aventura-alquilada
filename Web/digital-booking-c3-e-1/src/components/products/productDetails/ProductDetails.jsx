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
import RatingStats from "../../resources/rating/RatingStats";
import Politics from "../../resources/Politics/Politics";
import { MdLocationOn } from "react-icons/md";
import CalendarProducts from "../../resources/Calendar/CalendarProducts";
import ProductMap from "../../resources/productMap/ProductMap";
import mapboxgl from "mapbox-gl";
//import CalendarProducts from "../../resources/Calendar/CalendarProducts";

const ProductDetails = () => {
  const data = useContext(ProductsContext);
  const [products, setProducts] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [isUserLocationLoaded, setIsUserLocationLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const [cityA, setCityA] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  console.log(userLocation, isUserLocationLoaded);

  // const [product, setProduct] = useState()

  const product = products.find((p) => {
    return p.id === parseInt(params.id);
  });

  useEffect(() => {
    setProducts(data.products);
    if (product && navigator.geolocation) {
      console.log(product);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setIsUserLocationLoaded(true);

          const locationDetails = await getReverseGeocode(
            product.latitude,
            product.longitude
          );
          if (locationDetails) {
            setCityA(locationDetails.cityA);
            setCountry(locationDetails.country);
            setRegion(locationDetails.region);
            setAddress(locationDetails.address);
          }
        },
        (error) => {
          console.error("Error al obtener la ubicación del usuario:", error);
          setIsUserLocationLoaded(true);
        }
      );
    } else {
      console.error("La geolocalización no es compatible con este navegador.");
      setIsUserLocationLoaded(true);
    }
  }, [data, product]);

  async function getReverseGeocode(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
      );

      const data = await response.json();
      const place = data.features[0];
      const cityA = place.context.find((context) =>
        context.id.startsWith("place")
      );
      const country = place.context.find((context) =>
        context.id.startsWith("country")
      );

      const region = place.context.find((context) =>
        context.id.startsWith("region")
      );
      const address = place.place_name.split(",")[0].trim();

      return {
        cityA: cityA ? cityA.text : "",
        country: country ? country.text : "",
        region: region ? region.text : "",
        address: address ? address : "",
      };
    } catch (error) {
      console.error("Error al obtener el geocódigo inverso:", error);
      return null;
    }
  }

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
                {/*product.ciudad.nombre}, {product.ciudad.pais*/}

                <div>
                  <p className={styles.city}>
                    {cityA}, {country}
                  </p>
                  <p className={styles.proximity}>
                    {" "}
                    {region}, {address}
                  </p>
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
                {/* <div className={styles.category}>{product.category}</div> */}
                <div className={styles.descriptionContainer}>
                  <h2 className={styles.descriptionTitle}>{product.name}</h2>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>

                  {/* <p className={styles.price}>${product.price}</p> */}
                </div>

                <div className={styles.review}>
                  <Qualification />
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
                    <CalendarProducts/>
              </div>

              <div className={styles.map}>
                <p >¿Dónde estamos?</p>
        
                <div className={styles.mapContainer}>
                  <h3 className=""> {/*ciudad.nombre}, {ciudad.pais*/}</h3>
                  <div >
                      <div>
                          <iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=charcas%20y%20Thames%20buenos%20aires&t=&z=17&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                            </iframe>
                            <br/>
                      </div>
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
              latitude={product.latitude}
              longitude={product.longitude}
              product={product}
              userLocation={userLocation}
              cityA={cityA}
              country={country}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
