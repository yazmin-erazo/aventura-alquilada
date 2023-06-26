import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import ProductDetails from "../components/products/productDetails/ProductDetails";
import HomePage from "../components/home/HomePage";

// Crear un mock para window.matchMedia
window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Crear un mock para navigator.geolocation
window.navigator.geolocation = {
  getCurrentPosition: jest.fn().mockImplementation((success, error) => {
    error(new Error("Geolocalización no soportada por el navegador"));
  }),
};

beforeAll(() => {
  // Simulate geolocation at a specific location
  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementation((success) =>
      success({
        coords: {
          latitude: 51.5074, // London
          longitude: -0.1278, //London
        },
      })
    ),
  };

  Object.defineProperty(window.navigator, "geolocation", {
    value: mockGeolocation,
    configurable: true,
  });
});

describe("Pruebas de geolocalización", () => {
  test("Debe simular la geolocalización en una ubicación específica", () => {
    window.navigator.geolocation.getCurrentPosition.mockImplementation(
      (success) =>
        success({
          coords: {
            latitude: 51.5074, // London
            longitude: -0.1278, // London
          },
        })
    );
    window.navigator.geolocation.getCurrentPosition.mockRestore();
  });

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
});
