import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PrivacyPolicyModal from "../../../../components/reservation/confirm/PrivacyPolicies";

describe("PrivacyPolicyModal", () => {
  const handleCloseMock = jest.fn();

  beforeEach(() => {
    render(<PrivacyPolicyModal show={true} handleClose={handleCloseMock} />);
  });

  // 🧪 =============================
  it("muestra la política de privacidad correctamente", () => {
    expect(
      screen.getByText("¡Aquí Estamos Para Cuidar de Tu Privacidad!")
    ).toBeInTheDocument();
    expect(screen.getByText("¿Quién maneja tus datos?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Dirección postal: 123 High Street, London, SW1A 1AA, Reino Unido."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Correo electrónico: digitalhouse.dh123@gmail.com")
    ).toBeInTheDocument();
    expect(
      screen.getByText("¿Por qué y durante cuánto tiempo guardamos tus datos?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Cuando nos contactas para preguntas, solicitudes de presupuestos, propuestas o cualquier otra consulta, guardamos tus datos para poder atender tus peticiones de la mejor manera posible. Guardamos tus datos mientras dure el proceso de gestión de estas consultas."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Si te suscribes a nuestro blog para recibir las últimas entradas, también guardamos tus datos. Seguiremos guardándolos mientras te encuentres suscrito, a menos que decidas cancelar tu suscripción."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Cuando visitas nuestro sitio web, recopilamos y procesamos tus datos de manera automática para ofrecerte una mejor experiencia de usuario y para mejorar nuestros servicios. (Puedes leer nuestra política de cookies más abajo)"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Además, si nos das permiso, podemos enviarte correos electrónicos con noticias, novedades y promociones de los productos y servicios de nuestro sitio web. Conservaremos tus datos mientras te encuentres suscrito a estos servicios, a menos que decidas cancelar tu suscripción."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Para la relación comercial con los clientes, conservaremos los datos durante el tiempo que sea necesario para la gestión de la relación comercial. Los contratos y las facturas se conservarán durante cinco y diez años, respectivamente."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "¿Cuál es la base legal para el tratamiento de tus datos?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "La base legal para el tratamiento de tus datos personales es tu consentimiento. Este consentimiento es expreso, libre, específico, informado e inequívoco."
      )
    ).toBeInTheDocument();
  });

  // 🧪 =============================
  it('llama a la función handleClose cuando se hace clic en el botón "Entendido"', () => {
    const closeButton = screen.getByText("Entendido");
    fireEvent.click(closeButton);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });
});
