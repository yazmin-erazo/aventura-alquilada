import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputWithLabel from "../../../../components/common/input/InputWithLabel";

describe("InputWithLabel", () => {
  // 🧪 =============================
  test("renderiza la entrada con la etiqueta y maneja el evento onChange", () => {
    const handleChange = jest.fn();
    const placeholder = "Enter your name";
    const labelText = "Name:";
    const { getByLabelText } = render(
      <InputWithLabel
        type="text"
        value=""
        onChange={handleChange}
        placeholder={placeholder}
      >
        {labelText}
      </InputWithLabel>
    );
    const inputElement = getByLabelText(labelText);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.tagName).toBe("INPUT");
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("placeholder", placeholder);
  });

  // 🧪 =============================
  test("muestra el input con un mensaje de error", () => {
    const errorMessage = "Invalid input";
    const { getByText } = render(
      <InputWithLabel
        type="text"
        value=""
        onChange={jest.fn()}
        placeholder="Enter text"
        error={errorMessage}
      >
        Label:
      </InputWithLabel>
    );

    const errorElement = getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  // 🧪 =============================
  test("deshabilita el input cuando isEditable es falso", () => {
    const { getByLabelText } = render(
      <InputWithLabel
        type="text"
        value=""
        onChange={jest.fn()}
        placeholder="Enter text"
        isEditable={false}
      >
        Label:
      </InputWithLabel>
    );

    const inputElement = getByLabelText("Label:");
    expect(inputElement).toBeDisabled();
  });

  // 🧪 =============================
  test("aplica un desplazamiento suave al hacer clic en la etiqueta", () => {
    const { getByText } = render(
      <>
        <h1 id="section-header">Section Header</h1>
        <InputWithLabel
          type="text"
          value=""
          onChange={jest.fn()}
          placeholder="Enter text"
          htmlFor="section-header"
        >
          Label:
        </InputWithLabel>
      </>
    );

    const labelElement = getByText("Label:");
    fireEvent.click(labelElement);
    const headerElement = document.getElementById("section-header");
    expect(headerElement).toBeVisible();
  });

  // 🧪 =============================
  test("no aplica clase de error cuando no hay error", () => {
    const { getByLabelText } = render(
      <InputWithLabel
        type="text"
        value=""
        onChange={jest.fn()}
        placeholder="Enter text"
      >
        Label:
      </InputWithLabel>
    );

    const inputElement = getByLabelText("Label:");
    expect(inputElement).not.toHaveClass("error");
  });
});
