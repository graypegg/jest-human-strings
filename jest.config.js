export default {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  testRegex: "/src/.*.spec.ts$",
  moduleFileExtensions: ["ts", "js"],
};
