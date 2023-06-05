import React, { useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./NewRole.module.css";
import RolesService from "../../../shared/services/RolesService";
import { useParams } from "react-router-dom";

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
      rent: {
        list: false,
        add: false,
        edit: false,
        delete: false,
      },
    },
    selectAll: false,
  });

  const id = useParams();

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
    }));
  };

  const handleSelectAllChange = (checked) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      permissions: Object.keys(prevFormData.permissions).reduce(
        (acc, category) => ({
          ...acc,
          [category]: Object.keys(prevFormData.permissions[category]).reduce(
            (acc, action) => ({
              ...acc,
              [action]: checked,
            }),
            {}
          ),
        }),
        {}
      ),
      selectAll: checked,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      name: formData.roleName,
      categoryList: formData.permissions.categories.list,
      categoryCreate: formData.permissions.categories.add,
      categoryUpdate: formData.permissions.categories.edit,
      categoryDelete: formData.permissions.categories.delete,
      productList: formData.permissions.products.list,
      productCreate: formData.permissions.products.add,
      productUpdate: formData.permissions.products.edit,
      productDelete: formData.permissions.products.delete,
      userList: formData.permissions.users.list,
      userCreate: formData.permissions.users.add,
      userUpdate: formData.permissions.users.edit,
      userDelete: formData.permissions.users.delete,
      roleList: formData.permissions.roles.list,
      roleCreate: formData.permissions.roles.add,
      roleUpdate: formData.permissions.roles.edit,
      roleDelete: formData.permissions.roles.delete,
      rentList: formData.permissions.rent.list,
      rentCreate: formData.permissions.rent.add,
      rentUpdate: formData.permissions.rent.edit,
      rentDelete: formData.permissions.rent.delete,
    };
    RolesService.create(payload);
    console.log("Datos del nuevo rol:", formData);
  };

  const CheckItem = ({ category, action, name, children }) => (
    <label>
      <span style={{ marginRight: "8px" }}>{name}</span>
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
    <div className={styles.containerNewRol}>
      <header className={styles.header}>
        <h4 className={styles.addRolTitle}>Agregar rol</h4>
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

            <h4 className={styles.titleSelectAll}>Permisos:</h4>

            <div className={styles.selectAllContainer}>
              <label>
                <input
                  style={{ marginRight: "8px" }}
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
                  <CheckItem category="products" action="list" name="Listar" />
                  <CheckItem category="products" action="add" name="Agregar" />
                  <CheckItem category="products" action="edit" name="Editar" />
                  <CheckItem
                    category="products"
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
                  <CheckItem category="users" action="list" name="Listar" />
                  <CheckItem category="users" action="add" name="Agregar" />
                  <CheckItem category="users" action="edit" name="Editar" />
                  <CheckItem category="users" action="delete" name="Eliminar" />
                </div>
              </div>

              <div className={styles.category}>
                <div className={styles.categoryName}>
                  <h4>Roles</h4>
                </div>
                <div className={styles.categoryPermissions}>
                  <CheckItem category="roles" action="list" name="Listar" />
                  <CheckItem category="roles" action="add" name="Agregar" />
                  <CheckItem category="roles" action="edit" name="Editar" />
                  <CheckItem category="roles" action="delete" name="Eliminar" />
                </div>
              </div>
              <ButtonPrimary
                className={styles.submitBtn}
                onClick={handleSubmit}
              >
                Agregar rol
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRole;
