import React from 'react';
import { render } from '@testing-library/react';
import { CategoriesContext } from '../../context/CategoriesContext';

const MockCategoriesDataContext = ({ children }) => {
  const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
  ];

  return (
    <CategoriesContext.Provider value={{ Category: categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

test('renders without error', () => {
  render(<MockCategoriesDataContext />);
});

export default MockCategoriesDataContext;