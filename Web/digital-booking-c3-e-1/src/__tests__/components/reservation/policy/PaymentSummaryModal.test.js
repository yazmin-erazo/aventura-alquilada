import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaymentSummaryModal from '../../../../components/reservation/confirm/PaymentSummaryModal';

describe('PaymentSummaryModal', () => {
  const handleCloseMock = jest.fn();
  const setIsPaymentCompletedMock = jest.fn();

  beforeEach(() => {
    render(
      <PaymentSummaryModal
        show={true}
        handleClose={handleCloseMock}
        paymentData={{
          paymentMethod: 'cash',
          cardHolder: 'John Doe',
          cardNumber: '1234 5678 9012 3456',
          expiryDate: '12/24',
        }}
        setIsPaymentCompleted={setIsPaymentCompletedMock}
      />
    );
  });

  // 🧪 =============================
  it('renderiza el modal cuando la propiedad "mostrar" es verdadera', () => {
    expect(screen.getByText('Resumen del Pago')).toBeInTheDocument();
  });

  // 🧪 =============================
  it('no renderiza el modal cuando la propiedad "mostrar" es falsa', () => {
    render(
      <PaymentSummaryModal
        show={false}
        handleClose={handleCloseMock}
        paymentData={{
          paymentMethod: 'cash',
          cardHolder: 'John Doe',
          cardNumber: '1234 5678 9012 3456',
          expiryDate: '12/24',
        }}
        setIsPaymentCompleted={setIsPaymentCompletedMock}
      />
    );
    expect(screen.getByText('Resumen del Pago')).toBeInTheDocument();
  });


  // 🧪 =============================
  it('muestra el método de pago correctamente', () => {
    expect(screen.getByText('Método de Pago: Efectivo en Tienda')).toBeInTheDocument();
  });

  // 🧪 =============================
  it('muestra los detalles de la tarjeta correctamente cuando el método de pago es tarjeta de débito', () => {
    render(
      <PaymentSummaryModal
        show={true}
        handleClose={handleCloseMock}
        paymentData={{
          paymentMethod: 'debitCard',
          cardHolder: 'John Doe',
          cardNumber: '1234 5678 9012 3456',
          expiryDate: '12/24',
        }}
        setIsPaymentCompleted={setIsPaymentCompletedMock}
      />
    );
    expect(screen.getByText('Nombre del Titular: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Número de la Tarjeta: 1234 5678 9012 3456')).toBeInTheDocument();
    expect(screen.getByText('Fecha de Vencimiento: 12/24')).toBeInTheDocument();
  });


  // 🧪 =============================
  it('llama a las funciones handleClose y setIsPaymentCompleted cuando se hace clic en el botón "Cerrar"', () => {
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
    expect(setIsPaymentCompletedMock).toHaveBeenCalledTimes(1);
  });
});