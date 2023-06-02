import { useCallback, useEffect, useState } from "react";
import TableRow from "../../common/Table/TableRow";
import styles from "./EditRole.module.css";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import RolesService from "../../../shared/services/RolesService";

const Crud = () => {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    // Llamada a la API para obtener la lista de roles
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
    
    try {
      // Lógica para eliminar el rol con la ID "roleId"
      console.log("Rol eliminado con ID:", roleId);
      const updatedRoles = roles.filter((role) => role.id !== roleId);
      setRoles(updatedRoles);
    } catch (error) {
      console.log("Error al eliminar el rol:", error);
    }
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