import { useEffect, useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import Select from "../../common/select/Select";
import ProductConditionSelect from "../../common/select/ProductConditionSelect";
import styles from "./RegisterProduct.module.css";
import CategoryService from "../../../shared/services/CategoryService";
import ProductsService from "../../../shared/services/ProductsService";
import InputUploadImages from "../../common/inputImage/InputUploadImages";

const RegisterProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
          fileName: fileName,
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
      selectedCategory,
      selectedCategoryId,
      selectedCondition,
      description,
      image,
      selectedImages,
      color,
      material,
      size,
      fileName,
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
      secondaryImages: selectedImages,
      color: color,
      material: material,
      size: size,
    };
    console.log("Datos del producto:", productData);

    try {
      await ProductsService.create(productData);
      console.log("Producto registrado con éxito:", productData);

      // Reiniciar los campos del formulario después de enviar los datos
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
      });
      setErrorMessage(""); //Limpiar el mensaje de error
    } catch (error) {
      console.error("Error al registrar el producto:", error);
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h2>Registrar nuevo producto</h2>
      </header>

      <div className={styles.containerForm}>
        <div className={styles.registerProductContainer}>
          <div className={styles.registerProductForm}>
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

            <InputUploadImages onImageUpload={handleImageUpload} />

            <textarea
              className={styles.textareaField}
              value={formData.description}
              onChange={(event) =>
                handleInputChange("description", event.target.value)
              }
              placeholder="Descripción"
            />
            <ButtonPrimary className={styles.submitBtn} onClick={handleSubmit}>
              Registrar producto
            </ButtonPrimary>
          </div>
          <div className={styles.registerInfo}></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProduct;
