import Banner from "../common/Banner/Banner";
import SearchEngine from "../search/SearchEngine/SearchEngine";
import CategoryList from "./Category/CategoryList";
import styles from "./HomePage.module.css";
import RecommendedList from "./Recommended/RecommendedList";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import FilterDropDown from "../search/SearchEngine/FilterDropDown";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [filterParams, setFilterParams] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const recommendedSectionRef = useRef(null);
  const titleRef = useRef(null);

  const handleSearch = (params) => {
    setSearchParams(params);
    setFilterParams({});
  };

  const handleFilterChange = (filters) => {
    setFilterParams(filters);
    // Desplazarse al inicio de la sección de RecommendedList
    const title = titleRef.current;
  
    if (title && typeof title.scrollIntoView === 'function') {
      title.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  //-------- START Ubicación del usuario ------
  useParams.userLocation = userLocation;

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error al obtener la localizacion del usuario:", error);
        }
      );
    } else {
      console.error("Geolocation no soportada por el navegador");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);
  //--------  FIN Ubicación del usuario ------

  return (
    <>
      <div className={styles.homeContainer}>
        <section className={styles.bannerSearchContainer}>
          <div>
            <Banner
              title="Equípate para la aventura"
              paragraph="Descubre nuestra amplia selección de equipos deportivos."
              subtitle="¡Alquila ya!"
              image="https://picsum.photos/1200/240"
            />
          </div>
          <div className={styles.searchContainer}>
            <SearchEngine handleSearch={handleSearch} />
          </div>
        </section>

        {/* <div className={styles.colorBoxContainer}></div> */}
        <div className={styles.container}>
          <section className={styles.categoriesContainer}>
            <div className={styles.categoryListContainer}>
              <CategoryList onCategoryClick={setSelectedCategory} />
            </div>
          </section>
          <div
            ref={recommendedSectionRef}
            className={`${styles.containerWithSidebar}`}
          >
            <section className={styles.recommendedContainer}>
              <h3 ref={titleRef} className={styles.subtitle}>
                {searchParams ? "Resultados de su Búsqueda" : "Recomendados"}
              </h3>
              <FilterDropDown onFilterChange={handleFilterChange} />

              <div>
                <div className={styles.productGrid}>
                  <RecommendedList
                    selectedCategory={selectedCategory}
                    searchParams={searchParams}
                    filterParams={filterParams}
                    userLocation={userLocation}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
