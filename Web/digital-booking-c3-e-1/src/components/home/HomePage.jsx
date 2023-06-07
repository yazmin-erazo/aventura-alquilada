import Banner from "../common/Banner/Banner";
import SearchEngine from "../search/SearchEngine/SearchEngine";
import CategoryList from "./Category/CategoryList";
import styles from "./HomePage.module.css";
import RecommendedList from "./Recommended/RecommendedList";
import ShareButtons from "../search/SearchEngine/ShareButtons";
import { useState } from "react";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const url = 'URL de tu aplicación';
  const title = '¡Descarga y usa nuestra increíble aplicación!';
  
  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <SearchEngine />
        </div>
        <div style={{ paddingLeft: "30px"}}>
          <ShareButtons url={url} title={title} />
        </div>
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
            <h3 className={styles.subtitle}>Recomendados</h3>
            <div className={styles.productGrid}>
              <RecommendedList selectedCategory={selectedCategory} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
