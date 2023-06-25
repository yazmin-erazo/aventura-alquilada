import React from "react";
import { render, screen } from "@testing-library/react";
import Banner from "../../../../components/common/Banner/Banner";

describe("Banner", () => {
    
  // 🧪 =============================
  test("muestra el banner con el contenido correcto", () => {
    render(
      <Banner
        title="Equipate para la aventura"
        subtitle="¡Alquila ya!"
        paragraph="Descubre nuestra amplia selección de equipos deportivos."
        image="https://picsum.photos/1200/240"
      />
    );

    const titleElement = screen.getByText("Equipate para la aventura");
    const subtitleElement = screen.getByText("¡Alquila ya!");
    const paragraphElement = screen.getByText(
      "Descubre nuestra amplia selección de equipos deportivos."
    );

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });
});
