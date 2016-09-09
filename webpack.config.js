module.exports = {
  devServer: { inline: true },
  entry: "./entry.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: []
  }
}
