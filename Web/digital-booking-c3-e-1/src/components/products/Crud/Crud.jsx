import { useCallback, useEffect, useState, useContext } from "react";
import TableRow from "../../common/Table/TableRow";
import styles from "./Crud.module.css";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import Pagination from "../../resources/pagination/Pagination";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../../context/ProductsContext";
import ProductsService from "../../../shared/services/ProductsService";

import { useNavigate } from 'react-router-dom';

const Crud = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const data = useContext(ProductsContext)
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageLimit = 5;
  
  useEffect(() => {
    setProducts(data.products);
  }, [data]);

  useEffect(() => {
    onPageChanged();
  }, [currentPage, products]);

  const onPageChanged = () => {
    const offset = (currentPage - 1) * pageLimit;
    setCurrentProducts(products.slice(offset, offset + pageLimit));
  };

// usecallback para memorizar y asegurarnos de que no se creara una nueva instancia en cada renderizado
  const handleDelete = useCallback(async (productId) => {
    try {
      const res = await ProductsService.deleteByID(productId)
      console.log(res);
      if(res.status == 200){
        const updatedProducts = products.filter(
          (product) => product.id !== productId
          );
          setProducts(updatedProducts);
          console.log("Producto eliminado con ID:", productId);
        }
    } catch (error) {
      console.log("Error al eliminar el producto", error);
    }
  }, [products]);

const handleEdit = useCallback((product) => {
  console.log("Editando producto:", product);
  console.log("Editando producto con ID:", product.id);

  navigate('product/edit', {state:{product:product}});
}, [navigate]);

  return (
    <>
      <section className={styles["container"]} >
        <div className={styles["button-container"]}>
        <Link to="add">
          <ButtonPrimary>Agregar producto</ButtonPrimary>
        </Link>
        </div>
        <table className={styles["table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Marca</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th className={styles["actions-th"]}>Acciones</th>
            </tr>
          </thead>
          <tbody>

            {currentProducts.map((product) => (
              <TableRow
                key={product.id}
                product={product}
                onDelete={() => handleDelete(product.id)}
                onEdit={() => handleEdit(product)}
              />
            ))}
          </tbody>
        </table>
            <Pagination
        onPageChanged={onPageChanged}
        limit={pageLimit}
        total={products.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      </section>
    </>
  );
};

export default Crud;
