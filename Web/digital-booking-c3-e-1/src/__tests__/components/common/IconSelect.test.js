import { render, fireEvent } from "@testing-library/react";
import IconSelect from "../../../components/common/IconSelect/IconSelect";

describe("IconSelect", () => {
  // 🧪 =============================
  test("renderiza sin errores", () => {
    render(
      <IconSelect selectedIcon="" handleIconSelect={() => {}}>
        Select an icon:
      </IconSelect>
    );
  });

  // 🧪 =============================
  test("llama a handleIconSelect cuando se hace clic en una opción de icono", () => {
    const handleIconSelect = jest.fn();
    const { container } = render(
      <IconSelect selectedIcon="" handleIconSelect={handleIconSelect}>
        Select an icon:
      </IconSelect>
    );

    const iconOption = container.querySelector(".iconOption");

    fireEvent.click(iconOption);

    expect(handleIconSelect).toHaveBeenCalledTimes(1);
  });

  // 🧪 =============================
  test("llama a handleIconSelect cuando se hace clic en una opción de icono", () => {
    const handleIconSelect = jest.fn();
    const { container } = render(
      <IconSelect selectedIcon="" handleIconSelect={handleIconSelect}>
        Select an icon:
      </IconSelect>
    );

    const iconOption = container.querySelector(".iconOption");

    fireEvent.click(iconOption);

    expect(handleIconSelect).toHaveBeenCalledTimes(1);
  });
});
