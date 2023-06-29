import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductsContext } from '../../../context/ProductsContext';
import NewReservation from '../../../components/reservation/create/NewReservation';

// Mock de contexto y datos
const mockProductsContext = {
  products: [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
  ],
};

const mockUser = {
  name: 'John Doe',
};

// Función auxiliar para renderizar el componente con el contexto simulado
const renderWithMockContext = (component) => {
  return render(
    <MemoryRouter>
      <ProductsContext.Provider value={mockProductsContext}>
        {component}
      </ProductsContext.Provider>
    </MemoryRouter>
  );
};

describe('NewReservation', () => {
  it('renders without errors', () => {
    renderWithMockContext(<NewReservation />);
  });

  it('displays the steps correctly', () => {
    const { getByText } = renderWithMockContext(<NewReservation />);
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
  });

  it('renders the Reservation component', () => {
    const { getByTestId } = renderWithMockContext(<NewReservation />);
    expect(getByTestId('reservation-component')).toBeInTheDocument();
  });

  it('renders the submit button correctly', () => {
    const { getByTestId } = renderWithMockContext(<NewReservation />);
    const submitButton = getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Siguiente');
  });
});
