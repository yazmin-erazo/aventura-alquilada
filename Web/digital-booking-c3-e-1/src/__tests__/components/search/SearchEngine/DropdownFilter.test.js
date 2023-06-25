import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DropdownFilter from "../../../../components/search/SearchEngine/dropdown/DropdownFilter";

describe("DropdownFilter", () => {
  let label, handleToggle, handleChipClick, isOpen, options;

  beforeEach(() => {
    label = "Filter";
    handleToggle = jest.fn();
    handleChipClick = jest.fn();
    isOpen = true;

    options = [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ];
  });

  // 🧪 =============================
  test("muestra la etiqueta del filtro desplegable", () => {
    const { getByText } = render(
      <DropdownFilter
        label={label}
        options={[]}
        handleToggle={handleToggle}
        handleChipClick={handleChipClick}
        isOpen={isOpen}
      />
    );

    const filterLabel = getByText(label);
    expect(filterLabel).toBeInTheDocument();
  });

  // 🧪 =============================
  test("abre el menú desplegable en la etiqueta del filtro", () => {
    const { getByText } = render(
      <DropdownFilter
        label={label}
        options={[]}
        handleToggle={handleToggle}
        handleChipClick={handleChipClick}
        isOpen={isOpen}
      />
    );

    const filterLabel = getByText(label);
    fireEvent.click(filterLabel);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  // 🧪 =============================
  test("muestra el número correcto de opciones desplegables", () => {
    const { container } = render(
      <DropdownFilter
        label={label}
        options={options}
        handleToggle={handleToggle}
        handleChipClick={handleChipClick}
        isOpen={isOpen}
      />
    );

    const optionElements = container.querySelectorAll(".dropdownOption");
    expect(optionElements.length).toBe(options.length);
  });

  // 🧪 =============================
  test("las opciones desplegables son visibles", () => {
    const { getByText } = render(
      <DropdownFilter
        label={label}
        options={options}
        handleToggle={handleToggle}
        handleChipClick={handleChipClick}
        isOpen={isOpen}
      />
    );

    options.forEach((option) => {
      const optionElement = getByText(option.name);
      expect(optionElement).toBeVisible();
    });
  });
});
