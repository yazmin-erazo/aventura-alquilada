import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../../components/common/Footer";
import "../../../__mocks__/styleMock";

describe("Footer component", () => {
  /**
   * Se renderiza el componente Footer y se verifica que el logotipo esté presente en el DOM.
   */

  test("should render the logo", () => {
    render(<Footer />);

    // Verifica que el logotipo se renderice correctamente
    const logoElement = screen.getByAltText("isologotipo de Digital Booking");
    expect(logoElement).toBeInTheDocument();

    // Verifica que el texto se muestre correctamente
    const textElement = screen.getByText("Sin equipo no hay aventura");
    expect(textElement).toBeInTheDocument();
  });
});
