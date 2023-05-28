import { useEffect, useState, useRef } from "react";
import CardCategory from "../../resources/Cards/Category/CardCategory";
import styles from "./CategoryList.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import CategoryService from "../../../shared/services/CategoryService";

const CategoryList = ({ onCategoryClick }) => {
  const listRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleScroll = (scrollOffset) => {
    listRef.current.scrollLeft += scrollOffset;
  };

  const handleScrollEnd = () => {
    setShowLeftArrow(listRef.current.scrollLeft > 0);
    setShowRightArrow(
      listRef.current.scrollLeft + listRef.current.clientWidth <
        listRef.current.scrollWidth
    );
  };

  useEffect(() => {
    handleScrollEnd();
  }, []);

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
          {categories.map((category) => (
            <CardCategory
              key={category.id}
              category={category}
              onCategoryClick={handleCategoryClick}
            />
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
