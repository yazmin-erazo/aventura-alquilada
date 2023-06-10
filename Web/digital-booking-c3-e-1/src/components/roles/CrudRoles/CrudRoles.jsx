import React, { useEffect, useState } from "react";
import TableRole from "../../common/TableRol/TableRole";
import styles from "../../../components/products/Crud/Crud.module.css";
import style from "./CrudRoles.module.css";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import Pagination from "../../resources/pagination/Pagination";
import { Link } from "react-router-dom";
import RolesService from "../../../shared/services/RolesService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PermissionLegend from "../../common/TableRol/PermissionLegend";

const CrudRoles = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [currentRoles, setCurrentRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [legendVisible, setLegendVisible] = useState(false);

  const pageLimit = 8;

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await RolesService.getAll();
        setRoles(roles);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoles();
  }, [reload]);

  useEffect(() => {
    onPageChanged();
  }, [currentPage, roles]);

  const onPageChanged = () => {
    const offset = (currentPage - 1) * pageLimit;
    setCurrentRoles(roles.slice(offset, offset + pageLimit));
  };

  const handleDelete = (roleId) => {
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
          const res = await RolesService.deleteByID(roleId);
          if (res.status === 200) {
            const updatedRoles = roles.filter((role) => role.id !== roleId);
            setRoles(updatedRoles);
            setReload(!reload);
            Swal.fire(
              "¡Eliminado!",
              "El usuario ha sido eliminado.",
              "success"
            );
          }
        } catch (error) {
          Swal.fire(
            "Error",
            "Ha ocurrido un error al eliminar el usuario.",
            "error"
          );
        }
      } else {
        Swal.close();
      }
    });
  };

  const handleEdit = (role) => {
    console.log("Editando usuario:", role);
    console.log("Editando usuario con ID:", role.id);

    navigate("/admin/role/add", { state: { role: role } });
  };

  const toggleLegend = () => {
    setLegendVisible(!legendVisible);
  };

  return (
    <>
      <div className={styles["button-container"]}>
        <div className={styles["button"]}>
          <Link to="/admin/role/add">
            <ButtonPrimary>Agregar rol</ButtonPrimary>
          </Link>
        </div>
      </div>
      <section className={styles["container"]}>
        <table className={styles["table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Permisos</th>
              <th className={styles["actions-th"]}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentRoles.map((role) => (
              <TableRole
                key={role.id}
                role={role}
                onDelete={() => handleDelete(role.id)}
                onEdit={() => handleEdit(role)}
              />
            ))}
          </tbody>
        </table>
        <div className={style["accordion-container"]}>
          <div className={style["accordion-header"]} onClick={toggleLegend}>
            <span className={style["accordion-title"]}>Convenciones de Permiso</span>
            <span className={style["accordion-icon"]}>
              {legendVisible ? "-" : "+"}
            </span>
          </div>
          {legendVisible && (
            <div className={style["accordion-content"]}>
              <PermissionLegend />
            </div>
          )}
        </div>
      </section>
      <Pagination
        onPageChanged={onPageChanged}
        limit={pageLimit}
        total={roles.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default CrudRoles;