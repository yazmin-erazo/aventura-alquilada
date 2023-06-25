import { render, fireEvent, screen } from "@testing-library/react";
import ActionButtons from "../../../../components/common/Buttons/ActionButtons";

describe("ActionButtons", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  // 🧪 =============================
  test("Llama a Eliminar cuando se hace clic en el botón de Eliminar", () => {
    const onDelete = jest.fn();
    render(<ActionButtons onDelete={onDelete} onEdit={jest.fn()} />);

    const deleteButtons = screen.getAllByRole("button", {
      className: /action-button-delete/i,
    });
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalled();
  });

  // 🧪 =============================
  test("Llama a Editar cuando se hace clic en el botón de Editar", () => {
    const onEdit = jest.fn();
    render(<ActionButtons onDelete={jest.fn()} onEdit={onEdit} />);

    const editButtons = screen.getAllByRole("button", {
      className: /action-button-edit/i,
    });
    fireEvent.click(editButtons[1]);
    expect(onEdit).toHaveBeenCalled();
  });
});
