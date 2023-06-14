import { useEffect, useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./NewCategory.module.css";
import ImageUpload from "../../common/inputImage/ImageUpload";
import CategoryService from "../../../shared/services/CategoryService";
import Swal from "sweetalert2";
import IconSelect from "../../common/IconSelect/IconSelect";
import ButtonInactive from "../../common/Buttons/ButtonInactive";

const NewCategory = () => {
  const [categories, setCategories] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    selectedImage: null,
    fileName: "",
    selectedIcon: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageUpload = (file) => {
    const fileName = file.name.split(".")[0];

    // Convertir la imagen en base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      const base64ImageWithoutPrefix = base64Image.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedImage: base64ImageWithoutPrefix,
        fileName: fileName, // Agregar el nombre de la imagen al estado
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const { title, description, selectedImage, fileName } = formData;

    const categoryData = {
      name: title,
      description: description,
      image: selectedImage,
      fileName: fileName,
      icon: selectedIcon,
    };

    console.log("Datos de la categoría:", categoryData);

    try {
      let categoryExists = false;
      categories.map((cat) =>
        cat.name === categoryData.name ? (categoryExists = true) : null
      );
      if (
        categoryData.name === "" ||
        categoryData.description === "" ||
        categoryData.image === null
      ) {
        categoryExists = true;
      }
      if (categoryExists) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "La categoría ya existe o falta completar un campo",
          confirmButtonColor: "#a6cf7e",
        });
      } else {
        await CategoryService.create(categoryData);
        console.log("Categoría registrada con éxito: ", categoryData);
        const response = await CategoryService.getAll();
        setCategories(response);

        // Reiniciar los campos del formulario después de enviar los datos
        setFormData({
          title: "",
          description: "",
          selectedImage: null,
          fileName: "",
        });
        setSelectedIcon("");
      }
    } catch (error) {
      console.log(error.response);
      console.error("Error al registrar la categoría:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAll();
        setCategories(data);
      } catch (err) {
        console.log(`Error al cargar categorías: ${err}`);
      }
    };

    fetchCategories();
  }, []);

  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName);
  };

  return (
    <div className={styles.containerNewCategory}>
      <header className={styles.header}>
        <h4 className={styles.addCategoryTitle}>Agregar nueva categoría</h4>
      </header>

      <div className={styles.containerForm}>
        <div className={styles.registerCategoryContainer}>
          <div className={styles.registerCategoryForm}>
            <InputWithLabel
              type="text"
              value={formData.title}
              onChange={(event) =>
                handleInputChange("title", event.target.value)
              }
            >
              Título:
            </InputWithLabel>
            <IconSelect
              selectedIcon={selectedIcon}
              handleIconSelect={handleIconSelect}
            >
              Icono
            </IconSelect>
            <ImageUpload onImageUpload={handleImageUpload} />

            <textarea
              className={styles.textareaField}
              value={formData.description}
              onChange={(event) =>
                handleInputChange("description", event.target.value)
              }
              placeholder="Descripción"
            />
          </div>
          <div className={styles.registerInfo}></div>
            <div className={styles.containerButton}>
              <div className={styles.buttonsItem}>
                <ButtonInactive to="/admin/category/list">
                  Cancelar
                </ButtonInactive>
                <ButtonPrimary
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                >
                  Registrar producto{" "}
                </ButtonPrimary>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
