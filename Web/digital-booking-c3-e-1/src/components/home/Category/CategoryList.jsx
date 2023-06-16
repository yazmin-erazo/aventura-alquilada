import { useEffect, useState, useRef } from "react";
import CardCategory from "../../resources/Cards/Category/CardCategory";
import styles from "./CategoryList.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import CategoryService from "../../../shared/services/CategoryService";
import * as ReactIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";
import * as FaIcons from "react-icons/fa";
import { sportsIcons } from "../../common/SportsIcons";

const CategoryList = ({ onCategoryClick }) => {
  const listRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [categories, setCategories] = useState([]);
  const iconComponents = {
    ...ReactIcons,
    ...TbIcons,
    ...FaIcons,
  };

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
            ? "none"
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
          {categories.map((category) => {
            const IconComponent = iconComponents[category.icon] || null;
            const isIconInSportsIcons = sportsIcons.includes(category.icon);
            return (
              <CardCategory
                key={category.id}
                category={category}
                onCategoryClick={handleCategoryClick}
                selectedIcon={isIconInSportsIcons ? IconComponent : undefined} // Pasa el componente del icono
              />
            );
          })}
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
