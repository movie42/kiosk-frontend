/* eslint-disable @typescript-eslint/no-var-requires */
const { addWebpackAlias, override } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, "src")
  })
);
