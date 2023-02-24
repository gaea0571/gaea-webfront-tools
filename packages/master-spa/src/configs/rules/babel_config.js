import path from "path";

export default [{
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /(node_modules)/,
  use: [{
    loader: "babel-loader",
    options: {
      configFile: path.join(process.cwd(), "./.babelrc.js")
    }
  }]
}];