import React, { useState, useEffect } from "react";
import CitiesService from "../../../shared/services/CitiesService";
import Select from "../../common/select/Select";
import styles from "./FilterSidebar.module.css";
import Chip from "./Chip";
import {
  brandOptions,
  genderOptions,
  stateOptions,
  materialOptions,
  colorOptions,
} from "./Lists";

const FilterSidebar = ({ onFilterChange }) => {
  const [cityOptions, setCityOptions] = useState([]);
  const [filters, setFilters] = useState({
    nameFilter: "",
    brandFilter: "",
    genderFilter: "",
    priceLessThan: null,
    priceGreaterThan: null,
    sizeFilter: "",
    stateFilter: "",
    colorFilter: "",
    materialFilter: "",
    cityId: "",
  });

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleFilterClear = () => {
    setFilters({
      nameFilter: "",
      brandFilter: "",
      genderFilter: "",
      priceLessThan: null,
      priceGreaterThan: null,
      sizeFilter: "",
      stateFilter: "",
      colorFilter: "",
      materialFilter: "",
      cityId: "",
    });

    setSelectedBrand("");
    setSelectedGender("");
    setSelectedState("");
    setSelectedMaterial("");
    setSelectedColor("");
  };

  const handleBrandChipClick = (brand) => {
    setSelectedBrand((prevBrand) => (prevBrand === brand ? "" : brand));
    setFilters((prevFilters) => ({
      ...prevFilters,
      brandFilter: prevFilters.brandFilter === brand ? "" : brand,
    }));
  };

  const handleGenderChipClick = (gender) => {
    setSelectedGender((prevGender) => (prevGender === gender ? "" : gender));
    setFilters((prevFilters) => ({
      ...prevFilters,
      genderFilter: prevFilters.genderFilter === gender ? "" : gender,
    }));
  };

  const handleStateChipClick = (state) => {
    setSelectedState((prevState) => (prevState === state ? "" : state));
    setFilters((prevFilters) => ({
      ...prevFilters,
      stateFilter: prevFilters.stateFilter === state ? "" : state,
    }));
  };

  const handleMaterialChipClick = (material) => {
    setSelectedMaterial((prevMaterial) =>
      prevMaterial === material ? "" : material
    );
    setFilters((prevFilters) => ({
      ...prevFilters,
      materialFilter: prevFilters.materialFilter === material ? "" : material,
    }));
  };

  const handleColorChipClick = (color) => {
    setSelectedColor((prevColor) => (prevColor === color ? "" : color));
    setFilters((prevFilters) => ({
      ...prevFilters,
      colorFilter: prevFilters.colorFilter === color ? "" : color,
    }));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    let parsedValue = value;

    if (name === "priceLessThan" || name === "priceGreaterThan") {
      parsedValue = value ? parseFloat(value) : null;
    }

    if (name === "materialFilter") {
      setSelectedMaterial(value);
    }

    if (name === "colorFilter") {
      setSelectedColor(value);
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: parsedValue,
    }));
  };

  const handleFilterCityChange = (id) => {
    setFilters({ ...filters, cityId: id });
  };

  const handleFilterSubmit = () => {
    onFilterChange(filters);
  };

  const fetchCities = async () => {
    try {
      const cities = await CitiesService.getAll();
      cities.sort((a, b) => a.name.localeCompare(b.name));
      setCityOptions(cities);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className={styles.filterSidebar}>
      <div>
        <div className={styles.filterSection}>
          <label htmlFor="nameFilter">Nombre:</label>
          <input
            type="text"
            name="nameFilter"
            value={filters.nameFilter}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.filterSection}>
          <label htmlFor="sizeFilter">Talla:</label>
          <input
            type="text"
            name="sizeFilter"
            value={filters.sizeFilter}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        <label htmlFor="brandFilter">Marca:</label>
        <div className={styles.chipsContainer}>
          {brandOptions.map((brand) => (
            <Chip
              key={brand.id}
              label={brand.name}
              selected={selectedBrand === brand.name}
              onClick={() => handleBrandChipClick(brand.name)}
            />
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <label htmlFor="genderFilter">Género:</label>
        <div className={styles.chipsContainer}>
          {genderOptions.map((gender) => (
            <Chip
              key={gender.id}
              label={gender.name}
              selected={selectedGender === gender.name}
              onClick={() => handleGenderChipClick(gender.name)}
            />
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <label htmlFor="priceRange">Rango de Precios:</label>
        <div className={styles.priceRangeContainer}>
          <input
            type="number"
            name="priceGreaterThan"
            placeholder="Desde"
            value={filters.priceGreaterThan || ""}
            onChange={handleFilterChange}
          />
          <span className={styles.priceRangeSeparator}>-</span>
          <input
            type="number"
            name="priceLessThan"
            placeholder="Hasta"
            value={filters.priceLessThan || ""}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        <label htmlFor="stateFilter">Estado:</label>
        <div className={styles.chipsContainer}>
          {stateOptions.map((state) => (
            <Chip
              key={state.id}
              label={state.name}
              selected={selectedState === state.name}
              onClick={() => handleStateChipClick(state.name)}
            />
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <label htmlFor="colorFilter">Color:</label>
        <div className={styles.chipsContainer}>
          {colorOptions.map((color) => (
            <Chip
              key={color.id}
              label={color.name}
              selected={selectedColor === color.name}
              onClick={() => handleColorChipClick(color.name)}
            />
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <label htmlFor="materialFilter">Material:</label>
        <div className={styles.chipsContainer}>
          {materialOptions.map((material) => (
            <Chip
              key={material}
              label={material}
              selected={selectedMaterial === material}
              onClick={() => handleMaterialChipClick(material)}
            />
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <label htmlFor="cityId">Ciudad:</label>
        <Select
          options={cityOptions}
          placeholder={"Seleccione..."}
          onChange={handleFilterCityChange}
        />
      </div>

      <div className={styles.filterButtons}>
        <button className={styles.applyButton} onClick={handleFilterSubmit}>
          Aplicar filtros
        </button>
        <button className={styles.clearButton} onClick={handleFilterClear}>
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;