import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactReservation from "../../../components/reservation/contact/ContactReservation";

describe("ContactReservation", () => {
  const user = {
    name: "John",
    lastname: "Doe",
    sub: "john.doe@example.com",
  };
  const isSubscribe = true;
  const handleSubscribeChange = jest.fn();
  const onNameChange = jest.fn();
  const onLastNameChange = jest.fn();
  const onEmailChange = jest.fn();
  const onAdditionalContactChange = jest.fn();
  const additionalContact = {
    name: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
  };

  beforeEach(() => {
    render(
      <ContactReservation
        user={user}
        isSubscribe={isSubscribe}
        handleSubscribeChange={handleSubscribeChange}
        onNameChange={onNameChange}
        onLastNameChange={onLastNameChange}
        onEmailChange={onEmailChange}
        onAdditionalContactChange={onAdditionalContactChange}
        additionalContact={additionalContact}
      />
    );
  });

  // 🧪 =============================
  it("renderiza la información del usuario correctamente", () => {
    expect(screen.getByLabelText("Nombre")).toHaveValue(user.name);
    expect(screen.getByLabelText("Apellido")).toHaveValue(user.lastname);
    expect(screen.getByLabelText("Email")).toHaveValue(user.sub);
  });

  // 🧪 =============================
  it("maneja el cambio de nombre", () => {
    const nameInput = screen.getByLabelText("Nombre");

    fireEvent.change(nameInput, { target: { value: "Jane" } });

    expect(onNameChange).toHaveBeenCalledWith("Jane");
  });

  // 🧪 =============================
  it("maneja el cambio de apellido", () => {
    const lastNameInput = screen.getByLabelText("Apellido");

    fireEvent.change(lastNameInput, { target: { value: "Smith" } });

    expect(onLastNameChange).toHaveBeenCalledWith("Smith");
  });

  // 🧪 =============================
  it("alterna el formulario adicional al hacer clic en el botón", () => {
    const button = screen.getByTestId("add-button");

    fireEvent.click(button);

    expect(screen.getByText("Nombre (Segundo contacto)")).toBeInTheDocument();
    expect(screen.getByText("Apellido (Segundo contacto)")).toBeInTheDocument();
    expect(screen.getByText("Email (Segundo contacto)")).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByText(" ")).not.toBeInTheDocument();
    expect(screen.queryByText(" ")).not.toBeInTheDocument();
    expect(screen.queryByText(" ")).not.toBeInTheDocument();
  });

  // 🧪 =============================
  it("llama a la función handleSubscribeChange cuando la casilla de verificación está activada", () => {
    fireEvent.click(
      screen.getByLabelText(
        "Me gustaría recibir notificaciones y promociones relacionadas con el equipamiento y actividades."
      )
    );
    expect(handleSubscribeChange).toHaveBeenCalledTimes(1);
  });
});
