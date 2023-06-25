import { render, fireEvent } from "@testing-library/react";
import ButtonPrimary from "../../../../components/common/Buttons/ButtonPrimary";

describe("ButtonPrimary", () => {
  test("renderiza sin errores", () => {
    render(<ButtonPrimary />);
  });

  // 🧪 =============================
  test("renderiza las children", () => {
    const { getByText } = render(<ButtonPrimary>Click me</ButtonPrimary>);
    const button = getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  // 🧪 =============================
  test("llama onClick cuando se hace clic en el botón", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <ButtonPrimary onClick={onClick}>Click me</ButtonPrimary>
    );
    const button = getByText("Click me");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // 🧪 =============================
  test("deshabilita el botón cuando la propiedad deshabilitada es verdadera", () => {
    const { getByText } = render(
      <ButtonPrimary disabled>Click me</ButtonPrimary>
    );
    const button = getByText("Click me");
    expect(button).toBeDisabled();
  });

  // 🧪 =============================
  test("no llama a onClick cuando se hace clic en el botón y el accesorio deshabilitado es verdadero", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <ButtonPrimary onClick={onClick} disabled>
        Click me
      </ButtonPrimary>
    );
    const button = getByText("Click me");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
