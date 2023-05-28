import { useEffect, useState } from "react";
import axios from "axios";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./NewCategory.module.css";
import ImageUpload from "../../common/inputImage/ImageUpload";

const NewCategory = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        selectedImage: null,
        fileName: "",
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
            title: title,
            description: description,
            image: selectedImage,
            fileName: fileName,
        };
        console.log("Datos de la categoría:", categoryData);

        try {
            const response = await axios.get(
                `http://localhost:8080/digitalbooking/categories/check?title=${title}`
            );
            const categoryExists = response.data.exists;

            if (categoryExists) {
                setErrorMessage("El título de la categoría ya está en uso. Por favor, escriba otro");
            } else {
                await axios.post(
                    "http://localhost:8080/digitalbooking/category",
                    categoryData
                );
                console.log("Categoría registrada con éxito:", categoryData);

                // Reiniciar los campos del formulario después de enviar los datos
                setFormData({
                    title: "",
                    description: "",
                    selectedImage: null,
                    fileName: "",
                });
                setErrorMessage(""); // Limpiar el mensaje de error
            }
        } catch (error) {
            console.log(error.response.data);
            console.error("Error al registrar la categoría:", error);
        }
    };

    return (
        <div>
            <header className={styles.header}>
                <h2>Agregar nueva categoría</h2>
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

                        <textarea
                            className={styles.textareaField}
                            value={formData.description}
                            onChange={(event) =>
                                handleInputChange("description", event.target.value)
                            }
                            placeholder="Descripción"
                        />

                        <ImageUpload onImageUpload={handleImageUpload} />

                        <ButtonPrimary className={styles.submitBtn} onClick={handleSubmit}>
                            Agregar categoría
                        </ButtonPrimary>
                    </div>
                    <div className={styles.registerInfo}>

                    </div>
                </div>
            </div>
        </div>
);
};

export default NewCategory;