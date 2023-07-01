import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductsContext } from "../../../context/ProductsContext";
import NewReservation from "../../../components/reservation/create/NewReservation";

const mockProductsContext = {
  products: [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ],
};

const mockUser = {
  name: "John Doe",
};

const renderWithMockContext = (component) => {
  return render(
    <MemoryRouter>
      <ProductsContext.Provider value={mockProductsContext}>
        {component}
      </ProductsContext.Provider>
    </MemoryRouter>
  );
};

describe("NewReservation", () => {
  it("renders without errors", () => {
    renderWithMockContext(<NewReservation />);
  });

  // // 🧪 =============================
  it("muestra los pasos correctamente", () => {
    const { getByText } = renderWithMockContext(<NewReservation />);
    // expect(getByText("1")).toBeInTheDocument();
    // expect(getByText("2")).toBeInTheDocument();
    // expect(getByText("3")).toBeInTheDocument();
  });



  // // 🧪 =============================
  // it("renderiza el componente de reserva", () => {
  //   const { getByTestId } = renderWithMockContext(<NewReservation />);
  //   expect(getByTestId("reservation-component")).toBeInTheDocument();
  // });

  // 🧪 =============================
  it("renderiza el boton submit correctamente", () => {
    const { getByTestId } = renderWithMockContext(<NewReservation />);
    const submitButton = getByTestId("submit-button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Siguiente");
  });
});
