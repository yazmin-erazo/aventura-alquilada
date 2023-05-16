import { useEffect, useState, useRef } from "react";
import CardCategory from "../../resources/Cards/Category/CardCategory";
import styles from "./CategoryList.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

const CategoryList = () => {
  const listRef = useRef(null); // referencia al contenedor de la lista de categorías
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [products, setProducts] = useState([]);

  const handleScroll = (scrollOffset) => {
    listRef.current.scrollLeft += scrollOffset;
  };

  const handleScrollEnd = () => {
    if (listRef.current.scrollLeft === 0) {
      setShowLeftArrow(false);
    } else {
      setShowLeftArrow(true);
    }

    if (
      listRef.current.scrollLeft + listRef.current.clientWidth >=
      listRef.current.scrollWidth
    ) {
      setShowRightArrow(false);
    } else {
      setShowRightArrow(true);
    }
    console.log(listRef.current.scrollLeft);
  };

  useEffect(() => {
    handleScrollEnd();
  }, []);

  useEffect(() => {
    axios.get("/db.json")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.overlay}
        style={{
          background: showLeftArrow
            ? "transparent"
            : "linear-gradient(to right, rgba(195, 212, 228, 0), rgb(195, 212, 228, 1))",
          color: showLeftArrow ? "white" : "transparent",
        }}
      ></div>
      <div
        className={styles.categoryListContainer}
        ref={listRef}
        onScroll={handleScrollEnd}
      >
        <div className={styles.categoryList}>
          {products.map((product) => (
            <CardCategory key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className={styles.ButtonsContainer}>
        <button
          className={styles.buttonLeft}
          onClick={() => {
            handleScroll(-210);
            setShowLeftArrow(false);
          }}
          style={{
            backgroundColor: showLeftArrow
              ? "var(--secondary-300)"
              : "transparent",
            color: showLeftArrow ? "white" : "transparent",
          }}
        >
          <IoIosArrowBack />
        </button>
        <button
          className={styles.buttonRight}
          onClick={() => {
            handleScroll(210);
            setShowRightArrow(false);
          }}
          style={{
            backgroundColor: showRightArrow
              ? "var(--secondary-300)"
              : "transparent",
            color: showRightArrow ? "white" : "transparent",
          }}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default CategoryList;