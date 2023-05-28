import React, { useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./NewRole.module.css";

const NewRole = () => {
    const [formData, setFormData] = useState({
      roleName: "",
      permissions: {
        categories: {
          list: false,
          add: false,
          edit: false,
          delete: false,
        },
        products: {
          list: false,
          add: false,
          edit: false,
          delete: false,
        },
        users: {
          list: false,
          add: false,
          edit: false,
          delete: false,
        },
        roles: {
          list: false,
          add: false,
          edit: false,
          delete: false,
        },
      },
      selectAll: false,
    });
  
    const handleInputChange = (name, value) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handlePermissionChange = (category, action, checked) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        permissions: {
          ...prevFormData.permissions,
          [category]: {
            ...prevFormData.permissions[category],
            [action]: checked,
          },
        },
        selectAll: false, // Desactivar "Seleccionar todo" al cambiar un permiso individualmente
      }));
    };
  
    const handleSelectAllChange = (checked) => {
      setFormData((prevFormData) => {
        const updatedPermissions = {
          ...prevFormData.permissions,
        };
  
        Object.keys(updatedPermissions).forEach((category) => {
          Object.keys(updatedPermissions[category]).forEach((action) => {
            updatedPermissions[category][action] = checked;
          });
        });
  
        return {
          ...prevFormData,
          permissions: updatedPermissions,
          selectAll: checked,
        };
      });
    };
  
    const handleSubmit = () => {
      // Enviar los datos al servidor
      console.log("Datos del nuevo rol:", formData);
    };
  
    const CheckItem = ({ category, action, name, children }) => (
      <label>
        <div>{name}</div>
        <input
          type="checkbox"
          checked={formData.permissions[category][action]}
          onChange={(event) =>
            handlePermissionChange(category, action, event.target.checked)
          }
        />
        {children}
      </label>
    );

    return (
        <div>
            <header className={styles.header}>
                <h2>Agregar nuevo rol</h2>
            </header>

            <div className={styles.containerForm}>
                <div className={styles.registerRoleContainer}>
                    <div className={styles.registerRoleForm}>
                        <InputWithLabel
                            type="text"
                            value={formData.roleName}
                            onChange={(event) =>
                                handleInputChange("roleName", event.target.value)
                            }
                        >
                            Nombre del rol:
                        </InputWithLabel>

                        <h3>Permisos:</h3>

                        <div className={styles.selectAllContainer}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={formData.selectAll}
                                    onChange={(event) =>
                                        handleSelectAllChange(event.target.checked)
                                    }
                                />
                                Seleccionar todo
                            </label>
                        </div>

                        <div className={styles.permissionsContainer}>
                            <div className={styles.category}>
                                <div className={styles.categoryName}>
                                    <h4>Categorías</h4>
                                </div>
                                <div className={styles.categoryPermissions}>
                                    <CheckItem
                                        category="categories"
                                        action="list"
                                        name="Listar"
                                    />
                                    <CheckItem
                                        category="categories"
                                        action="add"
                                        name="Agregar"
                                    />
                                    <CheckItem
                                        category="categories"
                                        action="edit"
                                        name="Editar"
                                    />
                                    <CheckItem
                                        category="categories"
                                        action="delete"
                                        name="Eliminar"
                                    />
                                </div>
                            </div>

                            <div className={styles.category}>
                                <div className={styles.categoryName}>
                                    <h4>Productos</h4>
                                </div>
                                <div className={styles.categoryPermissions}>
                                    <CheckItem
                                        category="categories"
                                        action="list"
                                        name="Listar"
                                    />
                                    <CheckItem
                                        category="categories"
                                        action="add"
                                        name="Agregar"
                                    />
                                    <CheckItem
                                        category="categories"
                                        action="edit"
                                        name="Editar"
                                    />
                                    <CheckItem
                                        category="categories"
                                        action="delete"
                                        name="Eliminar"
                                    />
                                </div>
                            </div>

                            <div className={styles.category}>
                                <div className={styles.categoryName}>
                                    <h4>Usuarios</h4>
                                </div>
                                <div className={styles.categoryPermissions}>
                                    <CheckItem
                                        category="categories"
                                        action="list"
                                        name="Listar"
                                    />
                                    <CheckItem
                                        category="categories"
                                        action="add"
                                        name="Agregar"
                                    />
                                    <CheckItem
                                        category="categories"
                                        action="edit"
                                        name="Editar"
                                    />
                                    <CheckItem
                                        category="categories"
                                        action="delete"
                                        name="Eliminar"
                                    />
                                </div>
                            </div>

                            <div className={styles.category}>
                                <div className={styles.categoryName}>
                                    <h4>Roles</h4>
                                </div>
                                <div className={styles.categoryPermissions}>
                                    <CheckItem
                                        category="categories"
                                        action="list"
                                        name="Listar"
                                    />
                                    <CheckItem
                                        category="categories"
                                        action="add"
                                        name="Agregar"
                                    />
                                    <CheckItem
                                        category="categories"
                                        action="edit"
                                        name="Editar"
                                    />
                                    <CheckItem
                                        category="categories"
                                        action="delete"
                                        name="Eliminar"
                                    />
                                </div>
                            </div>
                        </div>

                        <ButtonPrimary className={styles.submitBtn} onClick={handleSubmit}>
                            Agregar rol
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewRole;
