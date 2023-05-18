import styles from "./ButtonPrimary.module.css";


const ButtonPrimary = ({ children }) => {
  return (
    <button className={styles.button}>{children}</button>
  )
}

export default ButtonPrimary