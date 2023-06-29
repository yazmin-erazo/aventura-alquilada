const AuthService = {
    register: jest.fn(() => Promise.resolve({})),
    login: jest.fn((userData) => {
      if (userData.username === 'admin' && userData.password === 'password') {
        return Promise.resolve({ token: '1234567890' });
      } else {
        return Promise.reject('Invalid credentials');
      }
    }),
    activate: jest.fn(() => Promise.resolve({})),
    resendEmail: jest.fn(() => Promise.resolve({})),
    logout: jest.fn(() => Promise.resolve()),
  };
  
  export default AuthService;