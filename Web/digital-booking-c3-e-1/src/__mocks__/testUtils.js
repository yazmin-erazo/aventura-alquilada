export const mockGeolocation = (latitude, longitude) => {
    const originalGeolocation = global.navigator.geolocation;
  
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success, error) => {
        success({ coords: { latitude, longitude } });
      }),
      watchPosition: jest.fn(),
      clearWatch: jest.fn(),
    };
  
    return () => {
      global.navigator.geolocation = originalGeolocation;
    };
  };