const API = {
    get: jest.fn((url) => {
      if (url === '/users') {
        return Promise.resolve({ data: [{ id: 1, name: 'John' }] });
      } else if (url === '/products') {
        return Promise.resolve({ data: [{ id: 1, name: 'Product 1' }] });
      }
      return Promise.resolve({ data: {} });
    }),
    post: jest.fn((url, data) => {
      if (url === '/login') {
        if (data.username === 'admin' && data.password === 'password') {
          return Promise.resolve({ data: { token: '1234567890' } });
        } else {
          return Promise.resolve({ error: 'Invalid credentials' });
        }
      }
      return Promise.resolve({ data: {} });
    }),
    put: jest.fn((url, data) => {
      if (url === '/users/1') {
        // Realizar la lógica de actualización del usuario con el ID 1 utilizando los datos recibidos (data)
        return Promise.resolve({ data: { id: 1, name: 'Updated John' } });
      } else if (url === '/products/1') {
        // Realizar la lógica de actualización del producto con el ID 1 utilizando los datos recibidos (data)
        return Promise.resolve({ data: { id: 1, name: 'Updated Product 1' } });
      }
      return Promise.resolve({ data: {} });
    }),
    delete: jest.fn((url) => {
      if (url === '/users/1') {
        return Promise.resolve({ data: { message: 'User deleted' } });
      } else if (url === '/products/1') {
        return Promise.resolve({ data: { message: 'Product deleted' } });
      }
      return Promise.resolve({ data: {} });
    }),
  };
  
  module.exports = API;