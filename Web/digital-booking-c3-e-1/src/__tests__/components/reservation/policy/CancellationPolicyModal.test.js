import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CancellationPolicyModal from "../../../../components/reservation/reservationDetails/CancellationPolicyModal";

describe("CancellationPolicyModal", () => {
  const handleCloseMock = jest.fn();

  beforeEach(() => {
    render(
      <CancellationPolicyModal show={true} handleClose={handleCloseMock} />
    );
  });

  // 🧪 =============================
  it("muestra la política de cancelación correctamente", () => {
    expect(
      screen.getByText(
        "¡Conocer Nuestra Política de Cancelación es Importante!"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Para un reembolso completo, debes cancelar con al menos 48 horas de anticipación a la fecha de entrega o recogida del equipamiento deportivo."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Las cancelaciones realizadas con menos de 48 horas de anticipación incurrirán en una tarifa del 50% del total del alquiler."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "No se ofrecen reembolsos después del envío o entrega del equipamiento deportivo."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("¿Por qué tenemos esta política?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Esta política nos permite gestionar eficientemente nuestro inventario y garantizar la disponibilidad de nuestro equipamiento deportivo a todos nuestros clientes. También, nos permite proteger a nuestros socios de alquiler."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "¿Qué sucede en caso de condiciones climáticas adversas?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Entendemos que las condiciones climáticas pueden cambiar y pueden afectar tus planes. Si las condiciones climáticas impiden el uso seguro del equipo, te ofrecemos la opción de cambiar la fecha de tu reserva sin coste adicional. Si no puedes cambiar la fecha, te ofreceremos un reembolso completo."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("¡Estamos aquí para ayudarte!")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Si tienes alguna pregunta o inquietud sobre nuestra política de cancelación, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte a tener una gran experiencia alquilando el equipamiento deportivo que necesitas."
      )
    ).toBeInTheDocument();
  });

  // 🧪 =============================
  it('llama a handleClose cuando se hace clic en el botón "Entendido"', () => {
    fireEvent.click(screen.getByText("Entendido"));
    expect(handleCloseMock).toHaveBeenCalled();
  });
});
