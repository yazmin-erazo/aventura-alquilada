import React from "react";
import { render, screen } from "@testing-library/react";
import ConfirmReservation from "../../../components/reservation/confirm/ConfirmReservation";

describe("ConfirmReservation", () => {
  const user = {
    name: "John",
    lastname: "Doe",
    sub: "john.doe@example.com",
  };

  const isSubscribe = true;
  const delivery = "recoger en tienda";
  const product = {
    name: "Product Name",
    price: 100,
  };
  const equipmentPreferences = ["Option 1", "Option 2"];
  const comment = "This is a comment";
  const additionalContact = {
    name: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
  };
  const startDate = "2023-06-01";
  const endDate = "2023-06-05";
  const address = "123 Street";
  const isPrivacyAccepted = true;
  const handlePrivacyAcceptanceChangeMock = jest.fn();
  const setIsPaymentCompletedButtonMock = jest.fn();
  const selectedStartDate = null;
  const selectedEndDate = null;

  beforeEach(() => {
    render(
      <ConfirmReservation
        user={user}
        isSubscribe={isSubscribe}
        delivery={delivery}
        product={product}
        equipmentPreferences={equipmentPreferences}
        comment={comment}
        additionalContact={additionalContact}
        startDate={startDate}
        endDate={endDate}
        address={address}
        isPrivacyAccepted={isPrivacyAccepted}
        handlePrivacyAcceptanceChange={handlePrivacyAcceptanceChangeMock}
        setIsPaymentCompletedButton={setIsPaymentCompletedButtonMock}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
      />
    );
  });

  // 🧪 =============================
  it("renderiza la información del usuario", () => {
    expect(screen.getByText("Detalles de Usuario")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Sí")).toBeInTheDocument();
  });

  // 🧪 =============================
  it("renderiza los detalles de la reserva", () => {
    expect(screen.getByText("Detalles de Reserva")).toBeInTheDocument();
    expect(screen.getByText("Equipamiento adicional:")).toBeInTheDocument();
    expect(screen.getByText("Preferencia de entrega:")).toBeInTheDocument();
    expect(screen.getByText("Recoger en tienda")).toBeInTheDocument();
    expect(screen.getByText("Comentarios:")).toBeInTheDocument();
    expect(screen.getByText("This is a comment")).toBeInTheDocument();
  });

  // 🧪 =============================
  it("renderiza labels de fechas de reserva", () => {
    expect(screen.getByText("Fechas de reserva")).toBeInTheDocument();
    expect(screen.getByText("Fecha de inicio:")).toBeInTheDocument();
    expect(screen.getByText("Fecha de fin:")).toBeInTheDocument();
  });

});
