import styles from './ButtonGroup.module.css'

const ButtonGroup = ({ buttons }) => {
    return <div className={styles.buttonGroup}>{buttons}</div>;

}

export default ButtonGroup