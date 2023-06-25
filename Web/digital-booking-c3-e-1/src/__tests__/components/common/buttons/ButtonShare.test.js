import { render, fireEvent } from "@testing-library/react";
import ButtonShare from "../../../../components/common/Buttons/ButtonShare";

describe("ButtonShare component", () => {
  test("renderiza sin errores", () => {
    render(<ButtonShare />);
  });

    // 🧪 =============================
  test("abre el modal cuando se hace clic en el botón", () => {
    const product = {
      id: 1,
      name: "Product Name",
      imageURL: "image.jpg",
      description: "Product description",
      city: { genericName: "City", name: "City Name" },
      category: "Category",
    };
    const { getByText } = render(<ButtonShare product={product} />);
    const button = getByText("Compartir");
    fireEvent.click(button);
    const modal = document.querySelector(".modal");
    expect(modal).toBeInTheDocument();
  });

    // 🧪 =============================
  test("cierra el modal cuando se hace clic en el botón Cerrar", () => {
    const { getByText } = render(<ButtonShare />);
    const button = getByText("Compartir");
    fireEvent.click(button);
    const closeButton = getByText("×");
    fireEvent.click(closeButton);
    const modal = document.querySelector(".modal");
    expect(modal).not.toBeInTheDocument();
  });

    // 🧪 =============================
  test("cierra el modal al hacer clic fuera del modal", () => {
    const { getByText } = render(<ButtonShare />);
    const button = getByText("Compartir");
    fireEvent.click(button);
    const modal = document.querySelector(".modal");
    fireEvent.click(modal);
    expect(modal).not.toBeInTheDocument();
  });
  // 🧪 =============================
  test("muestra la información correcta del producto en el modal", () => {
    const product = {
      id: 1,
      name: "Product 1",
      city: {
        genericName: "City",
        name: "City Name",
      },
      category: "Category",
      imageURL: "http://example.com/image.jpg",
      description: "Product description",
    };
    const { getByText, getByAltText } = render(
      <ButtonShare product={product} />
    );
    const button = getByText("Compartir");
    fireEvent.click(button);
    const modalHeading = getByText("Product 1");
    const location = getByText("City · City Name");
    const category = getByText("Category");
    const image = getByAltText("Product 1");
    const description = getByText("Product description");
    expect(modalHeading).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
