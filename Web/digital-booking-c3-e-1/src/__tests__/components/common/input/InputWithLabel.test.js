import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputWithLabel from "../../../../components/common/input/InputWithLabel";

describe("InputWithLabel", () => {
  test("renders input with label and handles onChange event", () => {
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

    // Verificar que el elemento de entrada y el label existan en la pantalla
    const inputElement = getByLabelText(labelText);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.tagName).toBe("INPUT");
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("placeholder", placeholder);
  });

  test("renders input with error message", () => {
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

    // Verificar que el mensaje de error se muestre en la pantalla
    const errorElement = getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  test("disables input when isEditable is false", () => {
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

  test("applies smooth scrolling on label click", () => {
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

  test("does not apply error class when there is no error", () => {
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
