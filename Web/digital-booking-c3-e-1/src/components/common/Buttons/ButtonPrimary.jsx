import styles from "./ButtonPrimary.module.css";


const ButtonPrimary = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={onClick}>{children}</button>
  )
}

export default ButtonPrimary