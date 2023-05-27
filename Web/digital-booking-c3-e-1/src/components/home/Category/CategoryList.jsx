import { useEffect, useState, useRef } from "react";
import CardCategory from "../../resources/Cards/Category/CardCategory";
import styles from "./CategoryList.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import CategoryService from "../../../shared/services/CategoryService";

const CategoryList = ({ onCategoryClick }) => {
  const listRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [categories, setCategories] = useState([]);

  const handleScroll = (scrollOffset) => {
    listRef.current.scrollLeft += scrollOffset;
  };

  const handleScrollEnd = () => {
    setShowLeftArrow(listRef.current.scrollLeft > 0);
    const containerWidth = listRef.current.clientWidth;
    const scrollableWidth = listRef.current.scrollWidth;
    const maxScrollLeft = scrollableWidth - containerWidth;
    const remainingScroll = maxScrollLeft - listRef.current.scrollLeft;

    setShowRightArrow(remainingScroll > 0);
  };

  useEffect(() => {
    handleScrollEnd();
  }, [categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAll();
        setCategories(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    console.log(category);
    onCategoryClick(category);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.overlay}
        style={{
          background: showLeftArrow
            ? "transparent"
            : "linear-gradient(to right, rgba(195, 212, 228, 0), #DEE7F0)",
          color: showLeftArrow ? "white" : "transparent",
        }}
      ></div>
      <div
        className={styles.categoryListContainer}
        ref={listRef}
        onScroll={handleScrollEnd}
      >
        <div className={styles.categoryList}>
          {categories.map((category) => (
            <CardCategory
              key={category.id}
              category={category}
              onCategoryClick={handleCategoryClick}
            />
          ))}
        </div>
      </div>

      <button
        className={`${styles.buttonLeftA} ${styles.button}`}
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
        className={`${styles.buttonRightB} ${styles.button}`}
        onClick={() => {
          handleScroll(210);
          // setShowRightArrow(true);
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
  );
};

export default CategoryList;
