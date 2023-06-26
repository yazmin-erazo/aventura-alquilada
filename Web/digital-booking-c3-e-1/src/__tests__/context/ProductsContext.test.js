import React from "react";
import { render } from "@testing-library/react";
import { ProductsDataContext } from "../../context/ProductsContext";

test("renders the ProductsContext provider without errors", () => {
  render(
    <ProductsDataContext>
      <div>ProductContext</div>
    </ProductsDataContext>
  );
});