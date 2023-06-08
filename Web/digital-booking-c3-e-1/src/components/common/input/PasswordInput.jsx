import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputWithLabel from "../../common/input/InputWithLabel";
import styles from "./PasswordInput.module.css"

const PasswordInput = ({
  isVisible,
  setIsVisible,
  right = "10px",
  ...restProps
}) => (
  <div className={styles.container}>
    <InputWithLabel type={isVisible ? "text" : "password"} {...restProps} />
    <button
      className={styles.visibleButton}
      type="button"
      onClick={() => setIsVisible(!isVisible)}
    >
      {isVisible ? (
        <AiOutlineEyeInvisible size={24} />
      ) : (
        <AiOutlineEye size={24} />
      )}
    </button>
  </div>
);

export default PasswordInput;
