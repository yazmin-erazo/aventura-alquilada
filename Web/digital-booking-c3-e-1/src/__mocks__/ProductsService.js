const ProductsService = {
    getAll: jest.fn(() => Promise.resolve([
        { id: 1, name: 'Product 1', category: 'Category 1' },
        { id: 2, name: 'Product 2', category: 'Category 2' },
      ])),
    deleteByID: jest.fn(() => Promise.resolve({})),
    updateByID: jest.fn(() => Promise.resolve({})),
    create: jest.fn(() => Promise.resolve({})),
    addFav: jest.fn(() => Promise.resolve({})),
    deleteFav: jest.fn(() => Promise.resolve({})),
    comment: jest.fn(() => Promise.resolve({})),
  };
  
  module.exports = ProductsService;