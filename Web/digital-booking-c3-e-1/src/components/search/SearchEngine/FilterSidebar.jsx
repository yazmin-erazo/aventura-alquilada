import React, { useState, useEffect } from "react";
import CitiesService from "../../../shared/services/CitiesService";
import Select from "../../common/select/Select";
import './FilterSidebar.css';

const FilterSidebar = ({ onFilterChange }) => {
    const [cityOptions, setCityOptions] = useState([]);
    const [filters, setFilters] = useState({
        nameFilter:"",
        brandFilter: "",
        genderFilter: "",
        priceLessThan: "",
        priceGreaterThan: "",
        sizeFilter: "",
        stateFilter: "",
        colorFilter: "",
        materialFilter: "",
        cityId: "",
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleFilterCityChange = (id) => {
        setFilters({ ...filters, cityId: id });
    };

    handleFilterCityChange

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
        <div>
            <h3>Filtros Avanzados</h3>

            <div>
                <label htmlFor="nameFilter">Nombre:</label>
                <input
                    type="text"
                    name="nameFilter"
                    value={filters.nameFilter}
                    onChange={handleFilterChange}
                />
            </div>

            <div>
                <label htmlFor="brandFilter">Marca:</label>
                <input
                    type="text"
                    name="brandFilter"
                    value={filters.brandFilter}
                    onChange={handleFilterChange}
                />
            </div>

            <div>
                <label htmlFor="genderFilter">Género:</label>
                <select
                    name="genderFilter"
                    value={filters.genderFilter}
                    onChange={handleFilterChange}
                >
                    <option value="">Selecciona un género</option>
                    <option value="Unisex">Unisex</option>
                    <option value="No aplica">No aplica</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
            </div>

            <div>
                <label htmlFor="priceLessThan">Precio Menor Que:</label>
                <input
                    type="number"
                    name="priceLessThan"
                    value={filters.priceLessThan}
                    onChange={handleFilterChange}
                />
            </div>

            <div>
                <label htmlFor="priceGreaterThan">Precio Mayor Que:</label>
                <input
                    type="number"
                    name="priceGreaterThan"
                    value={filters.priceGreaterThan}
                    onChange={handleFilterChange}
                />
            </div>

            <div>
                <label htmlFor="sizeFilter">Talla:</label>
                <input
                    type="text"
                    name="sizeFilter"
                    value={filters.sizeFilter}
                    onChange={handleFilterChange}
                />
            </div>

            <div>
                <label htmlFor="stateFilter">Estado:</label>
                <select
                    name="stateFilter"
                    value={filters.stateFilter}
                    onChange={handleFilterChange}
                >
                    <option value="">Selecciona un estado</option>
                    <option value="Buen estado">Buen estado</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Seminuevo">Seminuevo</option>
                    <option value="Reacondicionado">Reacondicionado</option>
                </select>
            </div>

            <div>
                <label htmlFor="colorFilter">Color:</label>
                <input
                    type="text"
                    name="colorFilter"
                    value={filters.colorFilter}
                    onChange={handleFilterChange}
                />
            </div>

            <div>
                <label htmlFor="materialFilter">Material:</label>
                <input
                    type="text"
                    name="materialFilter"
                    value={filters.materialFilter}
                    onChange={handleFilterChange}
                />
            </div>

            <div>
                <label htmlFor="cityId">Ciudad:</label>
                <Select
                    options={cityOptions}
                    placeholder={"Seleccione..."}
                    onChange={handleFilterCityChange}
                ></Select>
            </div>

            <button onClick={handleFilterSubmit}>Aplicar filtros</button>
        </div>
    );
};

export default FilterSidebar;