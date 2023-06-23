import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DropdownFilter from "../../../../components/search/SearchEngine/dropdown/DropdownFilter";

describe("DropdownFilter", () => {
  /**
   * Suite de pruebas para verificar el componente DropdownFilter.
   * Renderiza una etiqueta de filtro y una lista de opciones desplegables cuando se activa.
   */

  test("renders dropdown filter", () => {
    const label = "Filter";
    const options = [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ];
    const handleToggle = jest.fn();
    const handleChipClick = jest.fn();
    const isOpen = true;

    const { container, getByText } = render(
      <DropdownFilter
        label={label}
        options={options}
        handleToggle={handleToggle}
        handleChipClick={handleChipClick}
        isOpen={isOpen}
      />
    );

    // Verifica si la etiqueta del filtro del dropdown se renderizó
    const filterLabel = getByText(label);
    expect(filterLabel).toBeInTheDocument();

    // Hacer clic en la etiqueta del filtro para abrir el dropdown
    fireEvent.click(filterLabel);
    expect(handleToggle).toHaveBeenCalledTimes(1);

    // Verifica si el número de opciones renderizadas es correcto
    const optionElements = container.querySelectorAll(".dropdownOption");
    expect(optionElements.length).toBe(options.length);

    // Verifica si las opciones del dropdown se han renderizado
    options.forEach((option) => {
      const optionElement = getByText(option.name);
      expect(optionElement).toBeVisible();
    });
  });
});
