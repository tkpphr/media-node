module.exports = {
  "moduleFileExtensions": ["ts", "tsx", "js"],
  "transform": {
      "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "moduleNameMapper": {
    ".+\\.(css|styl|less|sass|scss|png|jpg|jpeg|gif|bmp|svg|ttf|woff|woff2)$": "identity-obj-proxy"
  },
  "testMatch": ["<rootDir>/src/ts/test/**/*.test.(ts|tsx)"],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/ts/main/**/*.(ts|tsx)",
    "!node_modules/",
    "!src/ts/**/*.d.ts"
  ],
};