import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

import CitiesService from "../../../shared/services/CitiesService";
import Select from "../../common/select/Select";
import DropdownFilter from "./dropdown/DropdownFilter";
import {
  brandOptions,
  genderOptions,
  stateOptions,
  materialOptions,
  colorOptions,
  sizeOptions,
} from "./Lists";

const initialState = {
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
};

import styles from "./FilterDropDown.module.css";


const FilterDropDown = ({ onFilterChange }) => {
  const [cityOptions, setCityOptions] = useState([]);
  const [filters, setFilters] = useState(initialState);
  const [selectedChips, setSelectedChips] = useState({
    brand: "",
    gender: "",
    state: "",
    material: "",
    color: "",
    size: "",
  });
  const [dropdownStates, setDropdownStates] = useState({
    brand: false,
    gender: false,
    state: false,
    size: false,
    color: false,
    material: false,
  });

  const handleFilterClear = () => {
    setFilters(initialState);
    setSelectedChips({
      brand: "",
      gender: "",
      state: "",
      material: "",
      color: "",
      size: "",
    });
  };

  const handleChipClick = (chip, dropdownName) => {
    setSelectedChips((prevChips) => ({
      ...prevChips,
      [dropdownName]: prevChips[dropdownName] === chip ? "" : chip,
    }));

    setFilters((prevFilters) => ({
      ...prevFilters,
      [`${dropdownName}Filter`]:
        prevFilters[`${dropdownName}Filter`] === chip ? "" : chip,
    }));

    // Cerrar el dropdown después de hacer clic en una opción (chip)
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [dropdownName]: false,
    }));
  };

  useEffect(() => {
    handleFilterSubmit();
  }, [selectedChips, filters]);

  const handleDropdownToggle = (dropdownName) => {
    setDropdownStates((prevStates) => {
      const updatedStates = {};

      // Cerrar todos los dropdowns excepto el seleccionado
      Object.keys(prevStates).forEach((name) => {
        updatedStates[name] = name === dropdownName ? !prevStates[name] : false;
      });

      return {
        ...prevStates,
        ...updatedStates,
      };
    });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    let parsedValue = value;

    if (name === "priceLessThan" || name === "priceGreaterThan") {
      parsedValue = value ? parseFloat(value) : null;
    }

    setSelectedChips((prevChips) => ({
      ...prevChips,
      [name]: parsedValue,
    }));

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: parsedValue,
    }));
  };

  const handleFilterCityChange = (id) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      cityId: id,
    }));
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

  const handleRemoveFilter = (filterName) => {
    setSelectedChips((prevChips) => ({
      ...prevChips,
      [filterName.replace("Filter", "")]: "",
    }));

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: "",
    }));
  };

  // Función para mostrar los filtros aplicados
  const renderAppliedFilters = () => {
    const appliedFilters = [];

    // Agregar cada filtro seleccionado a la lista de filtros aplicados
    Object.entries(selectedChips).forEach(([key, value]) => {
      if (value) {
        const filterName = key.replace("Filter", "");
        appliedFilters.push(
          <div className={styles.appliedFilter} key={key}>
            <span className={styles.filterValue}>{value}</span>
            <button
              className={styles.removeFilterButton}
              onClick={() => handleRemoveFilter(`${filterName}Filter`)}
            >
              <IoMdClose size={18} />
            </button>
          </div>
        );
      }
    });

    // Mostrar los filtros aplicados si hay alguno
    if (appliedFilters.length > 0) {
      return <div className={styles.appliedFilters}>{appliedFilters}</div>;
    }

    return null;
  };

  return (
    <div>
      <div className={styles.filterSidebar}>
        {/* <div className={styles.filterSection}>
          <label htmlFor="nameFilter">Nombre:</label>
          <input
            type="text"
            name="nameFilter"
            value={filters.nameFilter}
            onChange={handleFilterChange}
            className={styles.inputField}
          />
        </div> */}

        <DropdownFilter
          label="Talla"
          options={sizeOptions}
          selectedValue={selectedChips.size}
          handleToggle={() => handleDropdownToggle("size")}
          handleChipClick={(chip) => handleChipClick(chip, "size")}
          isOpen={dropdownStates.size}
          styles={styles}
        />

        <DropdownFilter
          label="Marca"
          options={brandOptions}
          selectedValue={selectedChips.brand}
          handleToggle={() => handleDropdownToggle("brand")}
          handleChipClick={(chip) => handleChipClick(chip, "brand")}
          isOpen={dropdownStates.brand}
          styles={styles}
        >
          {dropdownStates.brand && (
            <div className={styles.dropdownOptions}>
              {brandOptions.map((option) => (
                <div
                  key={option} // Aquí se asigna una clave única a cada elemento
                  className={styles.dropdownOption}
                  onClick={() => handleChipClick(option, "brand")}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </DropdownFilter>

        <DropdownFilter
          label="Género"
          options={genderOptions}
          selectedValue={selectedChips.gender}
          handleToggle={() => handleDropdownToggle("gender")}
          handleChipClick={(chip) => handleChipClick(chip, "gender")}
          isOpen={dropdownStates.gender}
          styles={styles}
        />
        {/* 
        <div className={styles.filterSection}>
          <label>Rango de Precios:</label>
          <div className={styles.priceRangeContainer}>
            <input
              type="number"
              name="priceGreaterThan"
              placeholder="Desde"
              value={filters.priceGreaterThan || ""}
              onChange={handleFilterChange}
              className={styles.inputField}
            />
            <span className={styles.priceRangeSeparator}>-</span>
            <input
              type="number"
              name="priceLessThan"
              placeholder="Hasta"
              value={filters.priceLessThan || ""}
              onChange={handleFilterChange}
              className={styles.inputField}
            />
          </div>
        </div> */}

        <DropdownFilter
          label="Estado"
          options={stateOptions}
          selectedValue={selectedChips.state}
          handleToggle={() => handleDropdownToggle("state")}
          handleChipClick={(chip) => handleChipClick(chip, "state")}
          isOpen={dropdownStates.state}
          styles={styles}
        />

        <DropdownFilter
          label="Color"
          options={colorOptions}
          selectedValue={selectedChips.color}
          handleToggle={() => handleDropdownToggle("color")}
          handleChipClick={(chip) => handleChipClick(chip, "color")}
          isOpen={dropdownStates.color}
          styles={styles}
        >
          {dropdownStates.color && (
            <div className={styles.dropdownOptions}>
              {colorOptions.map((option) => (
                <div
                  key={option.id}
                  className={styles.dropdownOption}
                  onClick={() => handleChipClick(option.name, "color")}
                >
                  <span
                    className={styles.colorOption}
                    style={{ backgroundColor: option.hex }}
                  />
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </DropdownFilter>

        <DropdownFilter
          label="Material"
          options={materialOptions}
          selectedValue={selectedChips.material}
          handleToggle={() => handleDropdownToggle("material")}
          handleChipClick={(chip) => handleChipClick(chip, "material")}
          isOpen={dropdownStates.material}
          styles={styles}
        />
      </div>
      <div className={styles.filterButtons}>
        <div>{renderAppliedFilters()}</div>
        {renderAppliedFilters() && (
          <button className={styles.clearBtn} onClick={handleFilterClear}>
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterDropDown;

{
  /* <div className={styles.filterSection}>
<label>Ciudad:</label>
<Select
  options={cityOptions}
  placeholder={"Seleccione..."}
  onChange={handleFilterCityChange}
  className={styles.inputField}
/>
</div> */
}
