import { useEffect, useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import Select from "../../common/select/Select";
import ProductConditionSelect from "../../common/select/ProductConditionSelect";
import styles from "./RegisterProduct.module.css";
import CategoryService from "../../../shared/services/CategoryService";
import ProductsService from "../../../shared/services/ProductsService";
import InputUploadImages from "../../common/inputImage/InputUploadImages";
import Swal from "sweetalert2";

const RegisterProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [formData, setFormData] = useState({
    selectedCategory: "",
    selectedCondition: "",
    productName: "",
    productPrice: "",
    brand: "",
    image: "",
    selectedImages: [],
    description: "",
    color: "",
    material: "",
    size: "",
    fileName: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await CategoryService.getAll();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const handleInputChange = (name, value) => {
    if (name === "selectedCategory") {
      setSelectedCategoryId(value);
    }
    if (name === "selectedGender") {
      setSelectedGender(value);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageUpload = (files) => {
    const updatedImages = [];

    Array.from(files).forEach((file) => {
      const fileName = file.name.split(".")[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result;
        const base64ImageWithoutPrefix = base64Image.replace(
          /^data:image\/[a-z]+;base64,/,
          ""
        );

        updatedImages.push({
          fileName: fileName+".jpg",
          image: base64ImageWithoutPrefix,
        });
      };

      reader.readAsDataURL(file);
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedImages: updatedImages,
    }));
  };

  const handleSubmit = async () => {
    const {
      productName,
      brand,
      productPrice,
      selectedCategoryId,
      selectedCondition,
      description,
      selectedImages,
      color,
      material,
      size,
      selectedGender,
    } = formData;
  
    const productData = {
      name: productName,
      brand: brand,
      price: productPrice,
      idCategory: selectedCategoryId,
      state: selectedCondition,
      description: description,
      fileName: selectedImages[0].fileName,
      image: selectedImages[0].image,
      secondaryImages: selectedImages.slice(1),
      color: color,
      material: material,
      size: size,
      gender: selectedGender,
    };
  
    try {
      await ProductsService.create(productData);

      // Mostrar un mensaje de éxito al usuario con sweetalert2

      Swal.fire(
        "¡Registrado!",
        "El producto ha sido registrado exitosamente.",
        "success"
      );
  
      setFormData({
        selectedCategory: "",
        selectedCondition: "",
        productName: "",
        productPrice: "",
        selectedImage: null,
        description: "",
        brand: "",
        color: "",
        material: "",
        size: "",
        fileName: "",
        gender: "",
      });
      setErrorMessage("");
    } catch (error) {

      // En caso de error al registrar el producto
      Swal.fire(
        "Error",
        "Ha ocurrido un error al registrar el producto.",
        "error"
      );

      if (error.response && error.response.data.nombreExcepcion === 'ExceptionInvalidValue') {
        Swal.fire(
          'Error',
          'El nombre del producto ya existe, por favor ingrese otro valor',
          'error'
        );
      } else {
        Swal.fire(
          'Error',
          'Ha ocurrido un error al registrar el producto.',
          'error'
        );
      }

    }
  };

  const genderOptions = [
    { id: "Femenino", name: "Femenino" },
    { id: "Masculino", name: "Masculino" },
    { id: "No aplica", name: "No aplica" },
  ];

  return (
    <div className={styles.containerNewProduct}>
      <header className={styles.header}>
        <h4 className={styles.addProductTitle}>Agregar producto</h4>
      </header>

      <div className={styles.containerForm}>
        <div className={styles.registerProductContainer}>
          <div className={styles.registerProductForm}>
            <div className={styles.formColumn}>
              <InputWithLabel
                type="text"
                value={formData.productName}
                onChange={(event) =>
                  handleInputChange("productName", event.target.value)
                }
              >
                Nombre:
              </InputWithLabel>

              <InputWithLabel
                type="text"
                value={formData.brand}
                onChange={(event) =>
                  handleInputChange("brand", event.target.value)
                }
              >
                Marca:
              </InputWithLabel>

              <InputWithLabel
                type="number"
                value={formData.productPrice}
                onChange={(event) =>
                  handleInputChange("productPrice", event.target.value)
                }
              >
                Precio:
              </InputWithLabel>

              <Select
                options={categories}
                value={selectedCategoryId}
                onChange={(id) => handleInputChange("selectedCategoryId", id)}
              >
                Categoría:
              </Select>

              <ProductConditionSelect
                value={formData.selectedCondition}
                onChange={(state) =>
                  handleInputChange("selectedCondition", state)
                }
              >
                Condición:
              </ProductConditionSelect>

              <InputWithLabel
                type="text"
                value={formData.color}
                onChange={(event) =>
                  handleInputChange("color", event.target.value)
                }
              >
                Color:
              </InputWithLabel>
            </div>
            <div className={styles.formColumn}>
              <InputWithLabel
                type="text"
                value={formData.material}
                onChange={(event) =>
                  handleInputChange("material", event.target.value)
                }
              >
                Material:
              </InputWithLabel>

              <InputWithLabel
                type="text"
                value={formData.size}
                onChange={(event) =>
                  handleInputChange("size", event.target.value)
                }
              >
                Talla/Tamaño:
              </InputWithLabel>
              <Select
                options={genderOptions}
                value={selectedGender}
                onChange={(id) => handleInputChange("gender", id)}
              >
                Género
              </Select>

              <InputUploadImages onImageUpload={handleImageUpload} />

              <textarea
                className={styles.textareaField}
                value={formData.description}
                onChange={(event) =>
                  handleInputChange("description", event.target.value)
                }
                placeholder="Descripción"
              />
      <div className={styles.containerButton}>
        <ButtonPrimary className={styles.submitBtn} onClick={handleSubmit}>
          Registrar producto
        </ButtonPrimary>
      </div>
            </div>
          </div>
          <div className={styles.registerInfo}></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProduct;
