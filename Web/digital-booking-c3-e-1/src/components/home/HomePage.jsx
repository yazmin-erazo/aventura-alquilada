import Banner from '../common/Banner/Banner'
import SearchEngine from '../search/SearchEngine/SearchEngine'
import CategoryList from "./Category/CategoryList";
import styles from "./HomePage.module.css";
import RecommendedList from "./Recommended/RecommendedList";


const HomePage = () => {
  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <SearchEngine />
        </div>
      </div>
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
            <CategoryList />
          </div>
        </section>

        <section className={styles.recommendedContainer}>
          <h3 className={styles.subtitle}>Recomendados</h3>
          <div className={styles.productGrid}>
            <RecommendedList />
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
