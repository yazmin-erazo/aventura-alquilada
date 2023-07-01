import { Link } from 'react-router-dom';
import styles from './DashboardSection.module.css';

const DashboardSection = ({ icon: Icon, text, to, isActive, isMenuOpen }) => {
  const IconComponent = Icon;

  const itemClass = isActive ? `${styles.item} ${styles.active}` : styles.item;

  if (!isMenuOpen) {
    return null; // Si el menú está cerrado, no se muestra el componente
  }

  return (
    <Link to={to} className={itemClass}>
      {IconComponent && <IconComponent className={styles.icon} />}
      {text}
    </Link>
  );
};

export default DashboardSection;