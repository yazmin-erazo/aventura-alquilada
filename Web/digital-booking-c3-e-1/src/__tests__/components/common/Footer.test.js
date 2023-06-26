import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../../components/common/Footer";
import "../../../__mocks__/styleMock";

describe("Footer component", () => {
  // 🧪 =============================
  test("renderiza el logo", () => {
    render(<Footer />);

    const logoElement = screen.getByAltText("isologotipo de Digital Booking");
    expect(logoElement).toBeInTheDocument();
  });

  // 🧪 =============================
  test("debe representar el texto correcto", () => {
    render(<Footer />);

    const textElement = screen.getByText("Sin equipo no hay aventura");
    expect(textElement).toBeInTheDocument();
  });
});
