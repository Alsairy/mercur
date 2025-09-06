module.exports = {
  displayName: "government",
  testEnvironment: "node",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/*.d.ts",
  ],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.ts"],
  transform: {
    "^.+\\.[jt]s$": ["@swc/jest"],
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
}
