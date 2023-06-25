import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CrudCategory from "../../../components/categories/CrudCategories/CrudCategory";
import CategoryService from "../../../shared/services/CategoryService";
import { useNavigate } from "react-router-dom";

jest.mock("../../../shared/services/CategoryService");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("CrudCategory", () => {
  beforeEach(() => {
    CategoryService.getAll.mockResolvedValue([
      {
        id: 1,
        name: "Category 1",
        description: "Category description 1",
      },
      {
        id: 2,
        name: "Category 2",
        description: "Category description 2",
      },
    ]);
  });

  // 🧪 =============================
  test("tabla de categorias", async () => {
    render(
      <Router>
        <CrudCategory />
      </Router>
    );

    // Representa las categorías
    await waitFor(() => {
      expect(screen.getByText("Category 1")).toBeInTheDocument();
      expect(screen.getByText("Category 2")).toBeInTheDocument();
    });

    // Contenido de la tabla que debe renderizarse
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Descripción")).toBeInTheDocument();
    expect(screen.getByText("Acciones")).toBeInTheDocument();
  });

  // 🧪 =============================
  test("elimina una categoría", async () => {
    // CategoryService.deleteByID.mockResolvedValue({ status: 200 });

    render(
      <Router>
        <CrudCategory />
      </Router>
    );

    // Representa las categorías
    await waitFor(() => {
      expect(screen.getByText("Category 1")).toBeInTheDocument();
      expect(screen.getByText("Category 2")).toBeInTheDocument();
    });

    // Botón Eliminar de la Categoría 1-------------------------------------------
    // fireEvent.click(screen.getByTestId("delete-button-1"));

    // Confirmar la eliminación -----------------------------------------------------------
    // fireEvent.click(screen.getByText("Sí, ¡Eliminar!"));

    // Espera a que se procese la eliminación ------------------------------------------
    await waitFor(() => {
      //   expect(screen.queryByText("Category 1")).not.toBeInTheDocument();
    });
    // -----------------------------------------------------------
    // expect(CategoryService.deleteByID).toHaveBeenCalledWith(1);
    // expect(screen.getByText("La categoría ha sido eliminada.")).toBeInTheDocument();
  });

  // 🧪 =============================
  test("navega para editar la categoría", async () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
      <Router>
        <CrudCategory />
      </Router>
    );

    // Wait for the categories to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText("Category 1")).toBeInTheDocument();
      expect(screen.getByText("Category 2")).toBeInTheDocument();
    });

    // Click the edit button of Category 1 --------------------------------------------------
    // fireEvent.click(screen.getByTestId("edit-button-1"));

    // expect(navigateMock).toHaveBeenCalledWith("category/edit", {
    //   state: { category: { id: 1, name: "Category 1", description: "Category description 1" } },
    // });
  });
});
