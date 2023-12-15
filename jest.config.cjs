// jest.config.js
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
