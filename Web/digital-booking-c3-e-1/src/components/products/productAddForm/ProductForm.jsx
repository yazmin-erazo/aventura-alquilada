import React, { useState } from 'react';
import './ProductForm.css'

const ProductForm = ({ onSubmit }) => {

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("no-aplica");
  const [image, setImage] = useState("null");
  const [deposit, setDeposit] = useState("");
  const [category, setCategory] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    const product = {
      name,
      brand,
      condition,
      price,
      description,
      size,
      gender,
      image,
      deposit,
      category
    };
    onSubmit(product)
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Producto agregado correctamente",
        });
        setName("");
        setBrand("");
        setCondition("");
        setPrice("");
        setDescription("");
        setSize("");
        setGender("no-aplica");
        setImage("");
        setDeposit("");
        setDeposit("");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "El nombre del producto ya está en uso",
        });
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre del producto:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="brand">Marca del producto:</label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="condition">Condición del producto:</label>
        <select
          id="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="">Selecione la condición del producto</option>
          <option value="nuevo">Nuevo</option>
          <option value="seminuevo">Seminuevo</option>
          <option value="reacondicionado">Reacondicionado</option>
          <option value="bueno">Buen estado</option>
          <option value="defectuoso">Defectuoso</option>

        </select>
      </div>
      <div>
        <label htmlFor="price">Precio del producto:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Descripción del producto:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="size">Talla del producto:</label>
        <input
          type="text"
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="gender">Género del producto:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="no-aplica">No aplica</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>
      <div>
        <label htmlFor="image">Imagen del producto:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>
      <div>
        <label htmlFor="deposit">Depósito del producto:</label>
        <input
          type="number"
          id="deposit"
          value={deposit}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category">Categoría del producto:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Selecione la categoría</option>
          <option value="camping">Camping</option>
          <option value="esqui">Esquí</option>
          <option value="snowboard">Snowboard</option>
          <option value="bicicletas">Bicicletas</option>
          <option value="surf">Surf</option>
          <option value="escalada">Escalada</option>
          <option value="acuaticos">Deportes acuáticos</option>
        </select>
      </div>
      <br />
      <button type="submit">Guardar</button>
    </form>
  );

};

export default ProductForm;