import { useCallback, useEffect, useState } from "react";
import TableRow from "../../common/Table/TableRow";
import styles from "./EditRole.module.css";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import RolesService from "../../../shared/services/RolesService";
import Swal from 'sweetalert2';

const Crud = () => {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await RolesService.getAll();
        setRoles(response);
        console.log(response);
      } catch (error) {
        console.log("Error al obtener la lista de roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleDelete = useCallback(async (roleId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          console.log("Rol eliminado con ID:", roleId);
          const updatedRoles = roles.filter((role) => role.id !== roleId);
          setRoles(updatedRoles);
          Swal.fire(
            '¡Eliminado!',
            'El rol ha sido eliminado.',
            'success'
          )
        } catch (error) {
          console.log("Error al eliminar el rol:", error);
        }
      }
    });
  }, [roles]);

  const handleEdit = useCallback((roleId) => {
    navigate(`${roleId}`)
    console.log("Editando rol con ID:", roleId);
  }, []);

  return (
    <>
      <section className={styles.container}>
        <div className={styles["button-container"]}>
          <Link to="/admin/role/add">
            <ButtonPrimary>Agregar rol</ButtonPrimary>
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            { roles && roles.map((role) => (
              <TableRow
                key={role.id}
                product={role}
                onDelete={() => handleDelete(role.id)}
                onEdit={() => handleEdit(role.id)}
              />
            ))}
          </tbody>
        </table>
      </section>


      
    </>
  );
};

export default Crud;