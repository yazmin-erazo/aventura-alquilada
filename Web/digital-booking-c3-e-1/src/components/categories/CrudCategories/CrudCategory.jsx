import { useCallback, useEffect, useState, useContext } from "react";
import styles from "./CrudCategory.module.css";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import Pagination from "../../resources/pagination/Pagination";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CategoriesContext } from "../../../context/CategoriesContext";
import CategoryService from "../../../shared/services/CategoryService";
import TableCategoryRow from "../../common/TableCategory/TableCategoryRow";

const CrudCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const data = useContext(CategoriesContext);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(false);

  const pageLimit = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catsActual = await CategoryService.getAll();
        setCategories(catsActual);
      } catch {
        setCategories(data.categories);
      }
    };
    fetchCategories();
  }, [reload]);

  useEffect(() => {
    onPageChanged();
  }, [currentPage, categories]);

  const onPageChanged = () => {
    const offset = (currentPage - 1) * pageLimit;
    setCurrentCategories(categories.slice(offset, offset + pageLimit));
  };

  // usecallback para memorizar y asegurarnos de que no se creara una nueva instancia en cada renderizado
  const handleDelete = (categoryId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a6cf7e",
      cancelButtonColor: "#fd7053",
      cancelButtonText: "No",
      confirmButtonText: "Sí, ¡Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await CategoryService.deleteByID(categoryId);
          if (res.status === 200) {
            const updatedCategories = categories.filter(
              (category) => category.id !== categoryId
            );
            setCategories(updatedCategories);
            setReload(!reload);
            Swal.fire(
              "¡Eliminado!",
              res.data.response,
              "success"
            );
          }
        } catch (error) {
          Swal.fire(
            "Error",
            error.response.data.mensaje,
            "error"
          );
        }
      } else {
        Swal.close();
      }
    });
  };

  const handleEdit = useCallback(
    (category) => {
      navigate("category/edit", { state: { category: category } });
    },
    [navigate]
  );

  return (
    <>
      <div className={styles["button-container"]}>
        <div className={styles["button"]}>
          <Link to="/admin/category/add">
            <ButtonPrimary>Agregar categoría</ButtonPrimary>
          </Link>
        </div>
      </div>
      <section className={styles["container"]}>
        <table className={styles["table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th className={styles["actions-th"]}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category) => (
              <TableCategoryRow
                key={category.id}
                category={category}
                onDelete={() => handleDelete(category.id)}
                onEdit={() => handleEdit(category)}
              />
            ))}
          </tbody>
        </table>
      </section>
      <Pagination
        onPageChanged={onPageChanged}
        limit={pageLimit}
        total={categories.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default CrudCategory;

