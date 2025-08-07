module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@google/generative-ai$": "<rootDir>/__mocks__/@google/generative-ai.ts",
  },
};