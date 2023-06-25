import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewCategory from "../../../components/categories/categoryAddForm/NewCategory";
import { MemoryRouter as Router } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("NewCategory", () => {
  test("campo de entrada del título", () => {
    const { getByLabelText } = render(<NewCategory />);
    const titleInput = getByLabelText("Título:");
    expect(titleInput).toBeInTheDocument();
  });

  // 🧪 =============================
  test("actualiza el valor de entrada del título", () => {
    const { getByLabelText } = render(<NewCategory />);
    const titleInput = getByLabelText("Título:");
    fireEvent.change(titleInput, { target: { value: "New Category" } });
    expect(titleInput.value).toBe("New Category");
  });

  // 🧪 =============================
  test("renderiza descripción textarea", () => {
    const { getByPlaceholderText } = render(<NewCategory />);
    const descriptionTextarea = getByPlaceholderText("Descripción");
    expect(descriptionTextarea).toBeInTheDocument();
  });

  // 🧪 =============================
  test("actualiza la descripción del valor del área de texto", () => {
    const { getByPlaceholderText } = render(<NewCategory />);
    const descriptionTextarea = getByPlaceholderText("Descripción");
    fireEvent.change(descriptionTextarea, {
      target: { value: "Category description" },
    });
    expect(descriptionTextarea.value).toBe("Category description");
  });

  // 🧪 =============================
  test("envía datos del formulario", () => {
    const navigateMock = jest.fn();
    const { getByLabelText, getByText, getByPlaceholderText } = render(
      <Router>
        <NewCategory />
      </Router>
    );
    const titleInput = getByLabelText("Título:");
    const descriptionTextarea = getByPlaceholderText("Descripción");
    const submitButton = getByText("Registrar categoría");

    jest.spyOn(React, "useContext").mockReturnValue({ navigate: navigateMock });

    fireEvent.change(titleInput, { target: { value: "New Category" } });
    fireEvent.change(descriptionTextarea, {
      target: { value: "Category description" },
    });

    fireEvent.click(submitButton);
  });
});
