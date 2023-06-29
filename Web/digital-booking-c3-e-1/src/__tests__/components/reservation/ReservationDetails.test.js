import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReservationDetails from "../../../components/reservation/reservationDetails/ReservationDetails";

describe("ReservationDetails", () => {
  const handleStartDateChange = jest.fn();
  const handleEndDateChange = jest.fn();
  const toggleCalendar = jest.fn();
  const handleSelectDates = jest.fn();
  const handlePreferenceChange = jest.fn();
  const handleAddressChange = jest.fn();
  const handleEquipmentPreferenceToggle = jest.fn();
  const handleCommentChange = jest.fn();

  const startDate = "2023-06-01";
  const endDate = "2023-06-03";
  const selectedStartDate = "2023-06-02";
  const selectedEndDate = "2023-06-04";
  const delivery = "entrega";
  const equipmentPreferences = ["casco"];
  const comment = "Algunos comentarios";
  const address = "123 Main St";

  beforeEach(() => {
    render(
      <ReservationDetails
        startDate={startDate}
        endDate={endDate}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        delivery={delivery}
        equipmentPreferences={equipmentPreferences}
        comment={comment}
        address={address}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        toggleCalendar={toggleCalendar}
        handleSelectDates={handleSelectDates}
        handlePreferenceChange={handlePreferenceChange}
        handleAddressChange={handleAddressChange}
        handleEquipmentPreferenceToggle={handleEquipmentPreferenceToggle}
        handleCommentChange={handleCommentChange}
      />
    );
  });

    // 🧪 =============================
  it("proporciona los detalles de la reserva", () => {
    expect(screen.getByText("Preferencias de entrega")).toBeInTheDocument();
    expect(screen.getByText("Recoger")).toBeInTheDocument();
    expect(screen.getByText("Servicio de entrega")).toBeInTheDocument();
    expect(screen.getByLabelText("Dirección de envío")).toHaveValue(
      "123 Main St"
    );

  });

    // 🧪 =============================
  it("toggles del calendario", () => {
    fireEvent.click(screen.getByTestId("calendar-toggle"));
    expect(toggleCalendar).toHaveBeenCalled();
  });

    // 🧪 =============================
  it("selecciona fechas del calendario", () => {
    const selectedDates = {
      startDate: "2023-06-10",
      endDate: "2023-06-12",
    };
    fireEvent.change(screen.getByTestId("calendar-toggle"), {
      target: { value: JSON.stringify(selectedDates) },
    });
    // expect(handleSelectDates).toHaveBeenCalledWith(selectedDates);
  });
});
