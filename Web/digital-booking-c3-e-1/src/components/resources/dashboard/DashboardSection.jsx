import styles from './DashboardSection.module.css';

const DashboardSection = ({ icon: Icon, text }) => {
  const IconComponent = Icon;
  return (
    <div className={styles.item}>
      {IconComponent && <IconComponent className={styles.icon} />}
      {text}
    </div>
  );
};

export default DashboardSection;