import React from 'react';
import { render } from '@testing-library/react';
import { CategoriesContext } from '../../../context/CategoriesContext';
import CategoryList from '../../../components/home/Category/CategoryList';
import mockCategoryService from '../../../shared/services/__mocks__/CategoryService';

jest.mock('../../../shared/services/CategoryService');

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

test('renders without error', async () => {
  mockCategoryService.getAll.mockResolvedValue([
    { id: 1, name: 'Category 1', icon: 'icon1' },
    { id: 2, name: 'Category 2', icon: 'icon2' },
  ]);

  render(
    <MockCategoriesDataContext>
      <CategoryList />
    </MockCategoriesDataContext>
  );


});