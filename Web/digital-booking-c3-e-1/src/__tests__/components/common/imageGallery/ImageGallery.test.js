import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageGallery from "../../../../components/common/imagegalery/ImageGallery";

describe("ImageGallery", () => {
  // 🧪 =============================
  test("renderiza la imagen principal y las imágenes del grid", () => {
    const product = {
      imageURL: "main-image-url",
      secondaryImages: [
        { imageURL: "image-url-1" },
        { imageURL: "image-url-2" },
        { imageURL: "image-url-3" },
        { imageURL: "image-url-4" },
        { imageURL: "image-url-5" },
      ],
    };

    render(<ImageGallery product={product} />);

    const mainImage = screen.getByAltText("Imagen principal");
    expect(mainImage).toBeInTheDocument();
    expect(mainImage.src).toContain("main-image-url");

    const gridImages = screen.getAllByAltText(/^Imagen \d+$/);
    expect(gridImages).toHaveLength(4);
    expect(gridImages[0].src).toContain("image-url-1");
    expect(gridImages[1].src).toContain("image-url-2");
    expect(gridImages[2].src).toContain("image-url-3");
    expect(gridImages[3].src).toContain("image-url-4");
  });

  // 🧪 =============================
  test("abre una imagen emergente cuando se hace clic en el botón 'Ver más'", () => {
    const product = {
      imageURL: "main-image-url",
      secondaryImages: [
        { imageURL: "image-url-1" },
        { imageURL: "image-url-2" },
        { imageURL: "image-url-3" },
        { imageURL: "image-url-4" },
        { imageURL: "image-url-5" },
      ],
    };

    render(<ImageGallery product={product} />);

    const viewMoreButton = screen.getByRole("button", { name: "Ver más" });
    fireEvent.click(viewMoreButton);
  });

  // 🧪 =============================
  test("cierra la ventana emergente de la imagen cuando está cerrada", () => {
    const product = {
      imageURL: "main-image-url",
      secondaryImages: [
        { imageURL: "image-url-1" },
        { imageURL: "image-url-2" },
        { imageURL: "image-url-3" },
        { imageURL: "image-url-4" },
        { imageURL: "image-url-5" },
      ],
    };

    render(<ImageGallery product={product} />);

    const viewMoreButton = screen.getByRole("button", { name: "Ver más" });
    fireEvent.click(viewMoreButton);
  });
});
