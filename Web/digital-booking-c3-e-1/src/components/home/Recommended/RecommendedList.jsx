import { useContext, useEffect, useState } from "react";
import RecommendedProducts from "../../resources/Cards/Recommended/RecommendedProducts";
import styles from "./RecommendedList.module.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../../resources/pagination/Pagination";
import { ProductsContext } from "../../../context/ProductsContext";
import { ProductsContextFilter } from "../../../context/FilteredContext";
import CategoryService from "../../../shared/services/CategoryService";
import ReactIcons, { sportsIcons } from "../../common/SportsIcons";
import ProductsService from "../../../shared/services/ProductsService";
import { getDistance } from "geolib";

const RecommendedList = ({
  selectedCategory,
  searchParams,
  filterParams,
  userLocation,
}) => {
  const data = useContext(ProductsContext);
  const dataFiltered = useContext(ProductsContextFilter).filteredProducts;
  const setDataFiltered = useContext(ProductsContextFilter).setFilteredProducts;
  const pageLimit = 10;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
    if (data.products.length > 0 && dataFiltered.length == 0) {
      setProducts(data.products.sort(() => Math.random() - 0.5));
    } else if (dataFiltered.length > 0) {
      setProducts(dataFiltered);
    }
  }, [data]);

  useEffect(() => {
    const filtered = selectedCategory
      ? data.products.filter(
          (product) => product.category === selectedCategory.name
        )
      : products;
    setDataFiltered(filtered);
    setFilteredProducts(filtered);
  }, [selectedCategory, products]);

  useEffect(() => {
    onPageChanged();
  }, [currentPage, filteredProducts]);

  useEffect(() => {
    fetchData();
    // dateFiltered();
  }, [searchParams, filterParams]);

  const onPageChanged = () => {
    const offset = (currentPage - 1) * pageLimit;
    const slicedProducts = filteredProducts.slice(offset, offset + pageLimit);
    setCurrentProducts(slicedProducts.sort(() => Math.random() - 0.5));
  };

  const fetchData = async () => {
    try {
      if (searchParams || filterParams) {
        const combinedParams = {
          ...searchParams,
          ...filterParams,
        };
        const productosBuscados = await ProductsService.getAll(combinedParams);
        setDataFiltered(productosBuscados);
        setFilteredProducts(productosBuscados);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.recommendedList}>
        {categories.length === 0 ? null : currentProducts.length > 0 ? (
          currentProducts.map((product) => {
            const category = categories.find(
              (category) => category.name === product.category
            );
            const categoryIcon = category ? category.icon : null;
            const isIconInSportsIcons = sportsIcons.includes(category.icon);
            const IconComponent = ReactIcons[category.icon] || null;
            const distance =
              userLocation && product.city
                ? getDistance(
                    {
                      latitude: userLocation.latitude,
                      longitude: userLocation.longitude,
                    },
                    {
                      latitude: product.city.latitude,
                      longitude: product.city.longitude,
                    }
                  ) / 1000
                : 0;

            return (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className={styles.linkCard}
              >
                <RecommendedProducts
                  rentalType="Alquiler por día"
                  product={{
                    ...product,
                    name: product.name,
                    price: product.price,
                    ratings: product.ratings,
                    image: product.imageURL,
                    distance,
                  }}
                  categoryIcon={
                    isIconInSportsIcons ? IconComponent : categoryIcon
                  }
                />
              </div>
            );
          })
        ) : (
          <div className={styles.resultado}>No se han encontrado productos</div>
        )}
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
