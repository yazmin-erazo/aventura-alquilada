import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Reservation from "../../../components/reservation/Reservation";

describe("Reservation", () => {
  const product = {
    id: 1,
    name: "Product Name",
  };

  const startDate = new Date("01/junio/2023");
  const endDate = new Date("01/junio/2023");

  const user = {
    iduser: 1,
    name: "John Doe",
  };

  const disabled = false;

  const changeStepMock = jest.fn();
  const handleStartDateChangeMock = jest.fn();
  const handleEndDateChangeMock = jest.fn();
  const toggleCalendarMock = jest.fn();
  const handleSelectDatesMock = jest.fn();

  beforeEach(() => {
    render(
      <Reservation
        product={product}
        startDate={startDate}
        endDate={endDate}
        user={user}
        disabled={disabled}
        changeStep={changeStepMock}
        step={1}
        handleStartDateChange={handleStartDateChangeMock}
        handleEndDateChange={handleEndDateChangeMock}
        selectedStartDate={startDate}
        selectedEndDate={endDate}
        toggleCalendar={toggleCalendarMock}
        isCalendarOpen={false}
        handleSelectDates={handleSelectDatesMock}
      />
    );
  });

  it("renders the ContactReservation component in step 1", () => {
    expect(screen.getByText("Datos de contacto")).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        "Me gustaría recibir notificaciones y promociones relacionadas con el equipamiento y actividades."
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Apellido")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Me gustaría recibir notificaciones y promociones relacionadas con el equipamiento y actividades."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Agregar segundo contacto" })
    ).toBeInTheDocument();
  });

  it("renders the ReservationDetails component in step 2", () => {
    changeStepMock.mockClear();
    fireEvent.click(screen.getByText("Siguiente"));
    expect(changeStepMock).toHaveBeenCalledWith("NEXT");

    expect(screen.getByText("Product Name")).toBeInTheDocument();
  });


  it('renders the ConfirmReservation component in step 3', () => {
    changeStepMock.mockClear();
    fireEvent.click(screen.getByText('Siguiente'));
    fireEvent.click(screen.getByText('Siguiente'));
    expect(changeStepMock).toHaveBeenCalledWith('NEXT');

    expect(screen.getByText('Product Name')).toBeInTheDocument();
  });
});
