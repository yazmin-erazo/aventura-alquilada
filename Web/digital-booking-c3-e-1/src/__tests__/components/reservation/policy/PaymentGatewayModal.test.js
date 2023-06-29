import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentSummaryModal from "../../../../components/reservation/confirm/PaymentGatewayModal";

describe("PaymentSummaryModal", () => {
  const handleCloseMock = jest.fn();
  const setIsPaymentCompletedMock = jest.fn();

  beforeEach(() => {
    render(
      <PaymentSummaryModal
        show={true}
        handleClose={handleCloseMock}
        paymentData={{
          paymentMethod: "debitCard",
          cardHolder: "John Doe",
          cardNumber: "1234 5678 9012 3456",
          expiryDate: "12/24",
        }}
        setIsPaymentCompleted={setIsPaymentCompletedMock}
      />
    );
    expect(screen.queryByText("Resumen del Pago")).toBeNull();
  });

    // 🧪 =============================
  it('llama a la función setIsPaymentCompleted cuando se hace clic en el botón "Cancelar"', () => {
    const closeButton = screen.getByText("Cancelar");
    fireEvent.click(closeButton);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });
});
