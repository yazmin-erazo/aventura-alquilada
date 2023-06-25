import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../App";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});
describe("App", () => {
  test("renderiza sin errores", () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });

  // 🧪 =============================
  test("renderiza header", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const headerElements = screen.queryAllByText(/Sin equipo no hay aventura/i);
    expect(headerElements.length).toBeGreaterThan(0);
  });

  // 🧪 =============================
  test("renderiza footer", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const footerElements = screen.getAllByText("Sin equipo no hay aventura");
    expect(footerElements.length).toBeGreaterThan(0);
  });
});
