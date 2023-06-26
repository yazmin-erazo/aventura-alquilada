import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "../../../context/AuthContext";
import Header from "../../../components/common/Header";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/extend-expect";

describe("Header component", () => {
  expect.extend({ toBeInTheDocument });

  // 🧪 =============================
  test("renderiza el logo sin errores", () => {
    const contextValues = {
      isLoggedIn: true,
      user: { name: "Steven Spielberg", lastname: "Spielberg" },
      dispatch: jest.fn(),
    };

    render(
      <Router>
        <UserContext.Provider value={contextValues}>
          <Header />
        </UserContext.Provider>
      </Router>
    );

    const logoElement = screen.getByAltText("logotipo Digital Booking");
    expect(logoElement).toBeInTheDocument();
  });

  // 🧪 =============================
  test("renderiza el enlace del logotipo con el href correcto", () => {
    const contextValues = {
      isLoggedIn: true,
      user: { name: "Steven Spielberg", lastname: "Spielberg" },
      dispatch: jest.fn(),
    };

    render(
      <Router>
        <UserContext.Provider value={contextValues}>
          <Header />
        </UserContext.Provider>
      </Router>
    );

    const logoLink = screen
      .getByAltText("logotipo Digital Booking")
      .closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
