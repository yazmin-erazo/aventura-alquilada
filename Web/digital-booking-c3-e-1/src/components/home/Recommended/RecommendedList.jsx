import { useContext, useEffect, useState } from "react";
import RecommendedProducts from "../../resources/Cards/Recommended/RecommendedProducts";
import styles from "./RecommendedList.module.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../../resources/pagination/Pagination";
import { ProductsContext } from "../../../context/ProductsContext";
import CategoryService from "../../../shared/services/CategoryService";
import * as ReactIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";
import * as FaIcons from "react-icons/fa";
import { sportsIcons } from "../../common/SportsIcons";

const RecommendedList = ({ selectedCategory }) => {
  const data = useContext(ProductsContext);
  const pageLimit = 10;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const iconComponents = {
    ...ReactIcons,
    ...TbIcons,
    ...FaIcons,
  };

  console.log(categories);

  useEffect(() => {
    CategoryService.getAll()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (data.products.length > 0) {
      setProducts(data.products.sort(() => Math.random() - 0.5));
    }
  }, [data]);

  useEffect(() => {
    const filtered = selectedCategory
      ? products.filter((product) => product.category === selectedCategory.name)
      : products;

    setFilteredProducts(filtered);
  }, [selectedCategory, products]);

  useEffect(() => {
    onPageChanged();
  }, [currentPage, filteredProducts]);

  const onPageChanged = () => {
    const offset = (currentPage - 1) * pageLimit;
    setCurrentProducts(filteredProducts.slice(offset, offset + pageLimit));
  };

  return (
    <div className={styles.container}>
      <div className={styles.recommendedList}>
        {currentProducts.map((product) => {
          const category = categories.find(
            (category) => category.name === product.category
          );
          const categoryIcon = category ? category.icon : null;
          const isIconInSportsIcons = sportsIcons.includes(category.icon);
          const IconComponent = iconComponents[category.icon] || null;
          return (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <RecommendedProducts
                rentalType="Alquiler por hora"
                product={{
                  ...product,
                  name: product.name,
                  price: product.price,
                  ratings: product.ratings,
                  image: product.imageURL,
                }}
                categoryIcon={
                  isIconInSportsIcons ? IconComponent : categoryIcon
                }
              />
            </div>
          );
        })}
      </div>
      <Pagination
        onPageChanged={onPageChanged}
        limit={pageLimit}
        total={filteredProducts.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default RecommendedList;
