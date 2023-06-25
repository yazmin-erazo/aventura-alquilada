import React from "react";
import { render, screen } from "@testing-library/react";
import TableRow from "../../../../components/common/Table/TableRow";

describe("TableRow", () => {
  const product = {
    id: 1,
    imageURL: "https://example.com/image.jpg",
    name: "Product Name",
    price: 10,
    brand: "Brand",
    description: "Product Description",
    category: "Category",
    state: "State",
  };

  // 🧪 =============================
  test("renders the TableRow component", () => {
    render(
      <TableRow product={product} onDelete={jest.fn()} onEdit={jest.fn()} />
    );

    const productId = screen.getByText("1");
    const productName = screen.getByText("Product Name");
    const productPrice = screen.getByText("10");
    const productBrand = screen.getByText("Brand");
    const productDescription = screen.getByText("Product Description");
    const productCategory = screen.getByText("Category");
    const productState = screen.getByText("State");

    expect(productId).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productBrand).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
    expect(productCategory).toBeInTheDocument();
    expect(productState).toBeInTheDocument();

    expect(screen.getByText(product.id)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.price)).toBeInTheDocument();
    expect(screen.getByText(product.brand)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByText(product.state)).toBeInTheDocument();
  });

  // 🧪 =============================
  test("displays product image if imageURL is provided", () => {
    render(
      <TableRow product={product} onDelete={jest.fn()} onEdit={jest.fn()} />
    );
    const productImage = screen.getByAltText("Product Name");
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute(
      "src",
      "https://example.com/image.jpg"
    );
  });

  // 🧪 =============================
  test("does not display product image if imageURL is not provided", () => {
    const productWithoutImage = { ...product, imageURL: null };

    render(
      <TableRow
        product={productWithoutImage}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    );

    const productImage = screen.queryByAltText("Product Name");
    expect(productImage).not.toBeInTheDocument();
  });
});
