import React from 'react';
import { render } from '@testing-library/react';
import { CategoriesContext } from '../../../context/CategoriesContext';
import CategoryList from '../../../components/home/Category/CategoryList';

const MockCategoriesDataContext = ({ children }) => {
  const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
  ];

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
};

test('renders without error', () => {
  render(
    <MockCategoriesDataContext>
      <CategoryList />
    </MockCategoriesDataContext>
  );
});