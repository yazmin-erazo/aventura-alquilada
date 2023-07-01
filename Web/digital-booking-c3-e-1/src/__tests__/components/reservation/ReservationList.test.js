import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ReservationList from "../../../components/reservation/list/ReservationList";
import RentsService from "../../../shared/services/RentsService";

jest.mock("../../../shared/services/RentsService");
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  close: jest.fn(),
}));

describe("ReservationList", () => {
  beforeEach(() => {
    RentsService.getAll.mockResolvedValue([
      { id: 1, state: "Reservado" },
      { id: 2, state: "Reservado" },
      { id: 3, state: "Reservado" },
    ]);
  });

  // 🧪 =============================
  it("obtiene datos de reservas y los representa correctamente", async () => {
    render(
      <BrowserRouter>
        <ReservationList />
      </BrowserRouter>
    );

    expect(RentsService.getAll).toHaveBeenCalledTimes(1);
    await screen.findByText("Mi historial de reservas");
  });

  // 🧪 =============================
  it("debería recuperar las reservas con éxito", async () => {
    const reservations = await RentsService.getAll();
    expect(reservations).toHaveLength(3);
  });
});