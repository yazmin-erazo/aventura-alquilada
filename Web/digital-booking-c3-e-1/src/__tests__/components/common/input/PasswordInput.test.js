import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PasswordInput from "../../../../components/common/input/PasswordInput";

describe("PasswordInput", () => {
  test("calls setIsVisible when toggle button is clicked", () => {
    const setIsVisible = jest.fn();
    const { getByRole } = render(
      <PasswordInput
        isVisible={false}
        setIsVisible={setIsVisible}
        right="10px"
      />
    );

    const toggleButton = getByRole("button");

    fireEvent.click(toggleButton);

    expect(setIsVisible).toHaveBeenCalledWith(true);
  });

  test("renders with custom styles", () => {
    const { container } = render(
      <PasswordInput
        isVisible={false}
        setIsVisible={jest.fn()}
        right="20px"
        // Otros props necesarios
      />
    );

    expect(container.firstChild).toHaveStyle("right: '20px'");
    // Verifica que los estilos personalizados se apliquen correctamente
  });
});
