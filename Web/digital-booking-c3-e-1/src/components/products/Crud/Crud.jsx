import { useCallback, useEffect, useState, useContext } from "react";
import TableRow from "../../common/Table/TableRow";
import styles from "./Crud.module.css";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import Pagination from "../../resources/pagination/Pagination";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../../context/ProductsContext";
import ProductsService from "../../../shared/services/ProductsService";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Crud = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const data = useContext(ProductsContext)
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ reload, setReload ] = useState(false)

  const pageLimit = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const prodsActual = await ProductsService.getAll()
        setProducts(prodsActual)
      }
      catch {
        setProducts(data.products);
      }
    }
    fetchProducts()
  }, [reload]);

  useEffect(() => {
    onPageChanged();
  }, [currentPage, products]);

  const onPageChanged = () => {
    const offset = (currentPage - 1) * pageLimit;
    setCurrentProducts(products.slice(offset, offset + pageLimit));
  };

  // usecallback para memorizar y asegurarnos de que no se creara una nueva instancia en cada renderizado
  const handleDelete = (productId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a6cf7e',
      cancelButtonColor: '#fd7053',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí, ¡Eliminar!'
    }).then( async(result) => {
      if (result.isConfirmed) {
        try {
          const res = await ProductsService.deleteByID(productId)
          if (res.status === 200) {
            const updatedProducts = products.filter(
              (product) => product.id !== productId
            );
            setProducts(updatedProducts);
            setReload(!reload)
            Swal.fire(
              '¡Eliminado!',
              'El producto ha sido eliminado.',
              'success'
            )
          }
        } catch (error) {
          Swal.fire(
            'Error',
            'Ha ocurrido un error al eliminar el producto.',
            'error'
          )
        }
      }
      else {
        Swal.close();
      }
    });
  }

  const handleEdit = useCallback((product) => {
    console.log("Editando producto:", product);
    console.log("Editando producto con ID:", product.id);

    navigate('product/edit', { state: { product: product } });
  }, [navigate]);

  return (
    <>
      <section className={styles["container"]} >
        <div className={styles["button-container"]}>
          <Link to="product/add">
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
