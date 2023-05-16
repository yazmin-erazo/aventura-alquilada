import styles from "./Banner.module.css";

const Banner = ({ title, subtitle, paragraph, image }) => {
  return (
    <div className={styles.bannerContainer} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.backgroundImage} />
      <div className={styles.gradientOverlay} />
      <div className={styles.content}>
      <h2 className={styles.title}>{title}</h2>
        <p className={styles.paragraph}>{paragraph}</p>
        <h3 className={styles.subtitle}>{subtitle}</h3>
      </div>
    </div>
  );
};

export default Banner;
