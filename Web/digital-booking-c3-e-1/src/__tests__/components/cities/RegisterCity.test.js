import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterCity from "../../../components/cities/cityAddForm/RegisterCity";
import { createMemoryHistory } from "history";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("RegisterCity", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
    render(
      <MemoryRouter history={history}>
        <RegisterCity />
      </MemoryRouter>
    );
  });

  // 🧪 =============================
  test("renderiza el componente", () => {
    expect(screen.getByText("Agregar ciudad")).toBeInTheDocument();
  });

  // 🧪 =============================
  test("envía el formulario", async () => {
    const nameInput = screen.getByLabelText("Nombre:");
    const codeInput = screen.getByLabelText("Código:");
    const countryCodeInput = screen.getByLabelText("Código del País:");

    fireEvent.change(nameInput, { target: { value: "City 1" } });
    fireEvent.change(codeInput, { target: { value: "C1" } });
    fireEvent.change(countryCodeInput, { target: { value: "P1" } });

    fireEvent.click(screen.getByText("Registrar ciudad"));

    expect(history.location.pathname).toBe("/"); // Verificar la ruta actual
  });

  // 🧪 =============================
  test("campos de entrada están inicialmente vacíos", () => {
    const nameInput = screen.getByLabelText("Nombre:");
    const codeInput = screen.getByLabelText("Código:");
    const countryCodeInput = screen.getByLabelText("Código del País:");

    expect(nameInput.value).toBe("");
    expect(codeInput.value).toBe("");
    expect(countryCodeInput.value).toBe("");
  });

  // 🧪 =============================
  test("campo de entrada de búsqueda está inicialmente vacío", () => {
    const searchInput = screen.getByPlaceholderText("Buscar ciudad");

    expect(searchInput.value).toBe("");
  });
});
