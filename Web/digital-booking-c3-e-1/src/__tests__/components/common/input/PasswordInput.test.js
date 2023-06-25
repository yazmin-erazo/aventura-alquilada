import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PasswordInput from "../../../../components/common/input/PasswordInput";

describe("PasswordInput", () => {
  // 🧪 =============================
  test("llama a setIsVisible cuando se hace clic en el botón de alternar", () => {
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

  // 🧪 =============================
  test("renders con estilos personalizados", () => {
    const { container } = render(
      <PasswordInput isVisible={false} setIsVisible={jest.fn()} right="20px" />
    );

    expect(container.firstChild).toHaveStyle("right: '20px'");
  });
});
