import Swal from "sweetalert2";
import RentsService from "../shared/services/RentsService";

jest.mock("sweetalert2");

describe("RentsService", () => {
  beforeEach(() => {
    RentsService.getAll.mockResolvedValue([
      { id: 1, state: "Reservado" },
      { id: 2, state: "Reservado" },
      { id: 3, state: "Reservado" },
    ]);

    RentsService.getById.mockImplementation((id) => {
      const reservation = { id, state: "Reservado" };
      return Promise.resolve(reservation);
    });

    RentsService.create.mockImplementation((payload) => {
      const newReservation = { id: 4, state: "Reservado", ...payload };
      return Promise.resolve(newReservation);
    });

    RentsService.deleteByID.mockResolvedValue({ status: 204 });

    RentsService.updateByID.mockImplementation((id, rent) => {
      const updatedReservation = { id, ...rent };
      return Promise.resolve(updatedReservation);
    });

    Swal.fire.mockImplementation(() => Promise.resolve({ isConfirmed: true }));
    Swal.close.mockImplementation(() => {});
  });
});
