import { useContext, useEffect, useState } from "react";
import RecommendedProducts from "../../resources/Cards/Recommended/RecommendedProducts";
import styles from "./RecommendedList.module.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../../resources/pagination/Pagination";
import { ProductsContext } from "../../../context/ProductsContext";
import CategoryService from "../../../shared/services/CategoryService";

const RecommendedList = ({ selectedCategory }) => {
  const data = useContext(ProductsContext);
  const pageLimit = 10;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState({});

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

  useEffect(() => {
    // Lista de categorías
    CategoryService.getAll().then((categoriesData) => {
      const categoriesMap = categoriesData.reduce(
        (obj, category) => ({ ...obj, [category.id]: category }),
        {}
      );
      setCategories(categoriesMap);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.recommendedList}>
        {currentProducts.map((product) => (
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
              categories={categories}
            />
          </div>
        ))}
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
