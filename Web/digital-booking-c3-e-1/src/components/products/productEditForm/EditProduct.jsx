import { useEffect, useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import Select from "../../common/select/Select";
import Swal from 'sweetalert2';
import styles from "./EditProduct.module.css";
import CategoryService from "../../../shared/services/CategoryService";
import ProductsService from "../../../shared/services/ProductsService";
import {useLocation, useNavigate} from 'react-router-dom';

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state.product;
  console.log(product);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const productId = product.id;

  const [formData, setFormData] = useState({
    selectedCategory: product.category,
    selectedCondition: product.state,
    productName: product.name,
    productPrice: product.price,
    brand: product.brand,
    selectedImages: product.secundaryImages,
    description: product.description,
    color: product.color,
    material: product.material,
    size: product.size,
    fileName: product.imageURL,
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

  const handleSubmit = async () => {
    const {
      selectedCategoryId
    } = formData;

    const productData = {      
      idCategory: selectedCategoryId
    };
    console.log("Datos del producto:" + productId, productData);

    Swal.fire({
      title: 'Editando...',
      didOpen: () => { Swal.showLoading() }
    })
    try {
      const response = await ProductsService.updateByID(productId, productData);
      Swal.close();
      Swal.fire('Éxito', "Producto editado con éxito", 'success')
      console.log("Producto editado con éxito", productId);
      console.log(response);

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
      //navigate(-1);
      
    } catch (error) {
      Swal.close();
      Swal.fire('Error', "Error al editar el producto", 'error' )
      console.error("Error al editar el producto:", error);
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h2>Editar producto</h2>
      </header>

      <div className={styles.containerForm}>
        <div className={styles.editProductContainer}>
          <div className={styles.editProductForm}>
            <InputWithLabel
              type="text"
              value={formData.productName}
              onChange={(event) =>
                handleInputChange("productName", event.target.value)
              }
              isEditable={false}              
            >
              Nombre:
            </InputWithLabel>

            <InputWithLabel
              type="text"
              value={formData.brand}
              onChange={(event) =>
                handleInputChange("brand", event.target.value)
              }
              isEditable={false} 
            >
              Marca:
            </InputWithLabel>

            <InputWithLabel
              type="number"
              value={formData.productPrice}
              onChange={(event) =>
                handleInputChange("productPrice", event.target.value)
              }
              isEditable={false} 
            >
              Precio:
            </InputWithLabel>

            <Select
              options={categories}
              name={formData.selectedCategory}
              onChange={(id) => handleInputChange("selectedCategoryId", id)}
            >
              Categoría:
            </Select>

            <InputWithLabel
              type="text"
              value={formData.selectedCondition}
              onChange={(event) =>
                handleInputChange("selectedCondition", event.target.value)
              }
              isEditable={false} 
            >
              Condición:
            </InputWithLabel>

            <InputWithLabel
              type="text"
              value={formData.color}
              onChange={(event) =>
                handleInputChange("color", event.target.value)
              }
              isEditable={false} 
            >
              Color:
            </InputWithLabel>

            <InputWithLabel
              type="text"
              value={formData.material}
              onChange={(event) =>
                handleInputChange("material", event.target.value)
              }
              isEditable={false} 
            >
              Material:
            </InputWithLabel>

            <InputWithLabel
              type="text"
              value={formData.size}
              onChange={(event) =>
                handleInputChange("size", event.target.value)
              }
              isEditable={false} 
            >
              Talla/Tamaño:
            </InputWithLabel>

            <img className={styles.previewImage} src={formData.fileName} alt="Example" />

            <textarea
              className={styles.textareaField}
              value={formData.description}
              onChange={(event) =>
                handleInputChange("description", event.target.value)
              }
              placeholder="Descripción"
              disabled={true}
            />
            <ButtonPrimary className={styles.submitBtn} onClick={handleSubmit}>
              Editar producto
            </ButtonPrimary>
          </div>
          <div className={styles.editInfo}></div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
