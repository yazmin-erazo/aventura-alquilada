import { Link } from 'react-router-dom';
import styles from './DashboardSection.module.css';

const DashboardSection = ({ icon: Icon, text, to, isActive }) => {
  const IconComponent = Icon;

  return (
    <Link to={to} className={`${styles.item} ${isActive ? styles.active : styles.item}`}>
      {IconComponent && <IconComponent className={styles.icon} />}
      {text}
    </Link>
  );
};

export default DashboardSection;