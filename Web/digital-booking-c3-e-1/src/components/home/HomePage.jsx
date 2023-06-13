import Banner from "../common/Banner/Banner";
import SearchEngine from "../search/SearchEngine/SearchEngine";
import CategoryList from "./Category/CategoryList";
import styles from "./HomePage.module.css";
import RecommendedList from "./Recommended/RecommendedList";
//import ShareButtons from "../search/SearchEngine/ShareButtons";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const url = 'URL de tu aplicación';
  const title = '¡Descarga y usa nuestra increíble aplicación!';
  const [searchParams, setSearchParams] = useState(null)
  const handleSearch = (params) => {
    setSearchParams(params);
  }

  useEffect( () => {},[searchParams])
  
  return (
    <>
      <div className={styles.searchContainer}>
          <SearchEngine handleSearch={handleSearch} />
      </div>
      <div className={styles.homeContainer}>
        <div className={styles.colorBoxContainer}></div>
        <div className={styles.container}>
          <section className={styles.bannerContainer}>
            <Banner
              title="Equípate para la aventura"
              paragraph="Descubre nuestra amplia selección de equipos deportivos."
              subtitle="¡Alquila ya!"
              image="https://picsum.photos/1200/240"
            />
          </section>

          <section className={styles.categoriesContainer}>
            <div className={styles.categoryListContainer}>
              <CategoryList onCategoryClick={setSelectedCategory} />
            </div>
          </section>

          <section className={styles.recommendedContainer}>
            <h3 className={styles.subtitle}>{searchParams ? 'Resultados de su Búsqueda' : 'Recomendados'}</h3>
            <div className={styles.productGrid}>
              <RecommendedList selectedCategory={selectedCategory} searchParams={searchParams} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
