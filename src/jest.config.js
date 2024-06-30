module.exports = {
  testEnvironment: "jsdom", 
  setupFilesAfterEnv: ["<rootDir>/config/util/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  maxWorkers: 1,
};
