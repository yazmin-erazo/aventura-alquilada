import Styles from "./ButtonSecondary.module.css";

const ButtonSecondary = (props) => {
  return (
    <div className={styles["button-container"]}>
      <div className={styles["primary-button"]} onClick={props.onClickPrimary}>
        {props.children[0]}
      </div>
      <div
        className={styles["secondary-button"]}
        onClick={props.onClickSecondary}
      >
        {props.children[1]}
      </div>
    </div>
  );
};

export default ButtonSecondary;
