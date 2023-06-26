import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import ProductDetails from "../components/products/productDetails/ProductDetails";
import HomePage from "../components/home/HomePage";

// Cree un mock para window.matchMedia
window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Cree un mock para navigator.geolocation
window.navigator.geolocation = {
  getCurrentPosition: jest.fn().mockImplementation((success, error) => {
    error(new Error("Geolocalización no soportada por el navegador"));
  }),
};

test("renderiza app con routes", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="products/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

});
