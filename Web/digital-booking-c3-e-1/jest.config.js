module.exports = {
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  testMatch: ['**/__tests__/**/*.test.js'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/.jest/mocks/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  setupFiles: [
    '<rootDir>/src/__mocks__/localStorage.js',
    '<rootDir>/src/__mocks__/sessionStorage.js',
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ]
};