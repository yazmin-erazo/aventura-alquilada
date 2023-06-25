import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImagePopup from "../../../../components/common/imagegalery/ImagePopup";
import "@testing-library/jest-dom";

describe("ImagePopup", () => {
  const images = [
    { url: "image1.jpg", title: "Image 1" },
    { url: "image2.jpg", title: "Image 2" },
    { url: "image3.jpg", title: "Image 3" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 🧪 =============================
  test("renderiza el componente sin errores", () => {
    const { getByAltText } = render(<ImagePopup images={images} />);
    const image = getByAltText("Image 1");
    expect(image).toBeInTheDocument();
  });

  // 🧪 =============================
  test("maneja los botones anterior y siguiente correctamente", () => {
    const onCloseMock = jest.fn();
    const images = [
      { url: "image1.jpg", title: "Image 1" },
      { url: "image2.jpg", title: "Image 2" },
      { url: "image3.jpg", title: "Image 3" },
    ];
    render(<ImagePopup images={images} onClose={onCloseMock} />);
    const prevButtons = screen.getAllByRole("button", { className: /prev/i });
    const nextButtons = screen.getAllByRole("button", { className: /next/i });

    const prevButton = prevButtons[0];
    const nextButton = nextButtons[0];

    const image1 = screen.getByAltText("Image 1");
    const image2 = screen.getByAltText("Image 2");
    const image3 = screen.getByAltText("Image 3");

    expect(image1).toBeInTheDocument();

    fireEvent.click(nextButton);
    expect(image2).toBeInTheDocument();

    fireEvent.click(nextButton);
    expect(image3).toBeInTheDocument();

    fireEvent.click(prevButton);
    expect(image2).toBeInTheDocument();
    expect(image1).toBeInTheDocument();
  });

  // 🧪 =============================
  test("llama a la función onClose al hacer clic fuera del modal", () => {
    const onCloseMock = jest.fn();
    const images = [
      { url: "image1.jpg", title: "Image 1" },
      { url: "image2.jpg", title: "Image 2" },
      { url: "image3.jpg", title: "Image 3" },
    ];
    render(<ImagePopup images={images} onClose={onCloseMock} />);
    const popupBackground = screen.getByTestId("popup-background");
    fireEvent.click(popupBackground);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
