import { useEffect, useState } from "react";
import axios from "axios";
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
        // Enviar los datos al servidor
        console.log("Datos del nuevo rol:", formData);
    };

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
                                <h4>Categorías</h4>
                                <div className={styles.categoryPermissions}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.categories.list}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "categories",
                                                    "list",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Listar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.categories.add}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "categories",
                                                    "add",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Agregar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.categories.edit}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "categories",
                                                    "edit",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Editar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.categories.delete}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "categories",
                                                    "delete",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Eliminar
                                    </label>
                                </div>
                            </div>

                            <div className={styles.category}>

                                <h4>Productos</h4>
                                <div className={styles.categoryPermissions}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.products.list}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "products",
                                                    "list",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Listar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.products.add}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "products",
                                                    "add",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Agregar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.products.edit}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "products",
                                                    "edit",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Editar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.products.delete}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "products",
                                                    "delete",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Eliminar
                                    </label>
                                </div>
                            </div>

                            <div className={styles.category}>
                                <h4>Usuarios</h4>
                                <div className={styles.categoryPermissions}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.users.list}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "users",
                                                    "list",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Listar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.users.add}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "users",
                                                    "add",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Agregar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.users.edit}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "users",
                                                    "edit",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Editar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.users.delete}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "users",
                                                    "delete",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Eliminar
                                    </label>
                                </div>
                            </div>

                            <div className={styles.category}>

                                <h4>Roles</h4>
                                <div className={styles.categoryPermissions}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.roles.list}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "roles",
                                                    "list",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Listar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.roles.add}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "roles",
                                                    "add",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Agregar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.roles.edit}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "roles",
                                                    "edit",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Editar
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.roles.delete}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    "roles",
                                                    "delete",
                                                    event.target.checked
                                                )
                                            }
                                        />
                                        Eliminar
                                    </label>
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

