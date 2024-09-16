const path = require("path");

module.exports = {
  entry: "./src/index.ts", // Entry point of your application
  target: "node", // Compile for usage in a Node.js-like environment
  output: {
    libraryTarget: "commonjs2",
    filename: "index.js", // Output filename
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolve both TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply ts-loader to .ts files
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "production", // You can change this to 'production' for optimized builds
};
