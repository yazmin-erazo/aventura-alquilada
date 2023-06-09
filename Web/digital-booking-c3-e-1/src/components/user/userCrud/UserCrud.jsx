import React, { useEffect, useState } from "react";
import TableUser from "../../common/TableUser/TableUser";
import styles from "../../../components/products/Crud/Crud.module.css";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import Pagination from "../../resources/pagination/Pagination";
import { Link } from "react-router-dom";
import UsersService from "../../../shared/services/UserService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const UserCrud = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(false);

  const pageLimit = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await UsersService.getAll();
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [reload]);

  useEffect(() => {
    onPageChanged();
  }, [currentPage, users]);

  const onPageChanged = () => {
    const offset = (currentPage - 1) * pageLimit;
    setCurrentUsers(users.slice(offset, offset + pageLimit));
  };

  const handleDelete = (userId) => {
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
          const res = await UsersService.deleteByID(userId);
          if (res.status === 200) {
            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers);
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

  const handleEdit = (user) => {
    console.log("Editando usuario:", user);
    console.log("Editando usuario con ID:", user.id);

    navigate("user/edit", { state: { user: user } });
  };

  return (
    <>
      <div className={styles["button-container"]}>
        <div className={styles["button"]}>
          <Link to="user/add">
            <ButtonPrimary>Agregar usuario</ButtonPrimary>
          </Link>
        </div>
      </div>
      <section className={styles["container"]}>
        <table className={styles["table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>Activo</th>
              <th>Fecha de generación</th>
              <th>ID de rol</th>
              <th>Iniciales</th>
              <th className={styles["actions-th"]}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <TableUser
                key={user.id}
                user={user}
                onDelete={() => handleDelete(user.id)}
                onEdit={() => handleEdit(user)}
              />
            ))}
          </tbody>
        </table>
      </section>
      <Pagination
        onPageChanged={onPageChanged}
        limit={pageLimit}
        total={users.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default UserCrud;