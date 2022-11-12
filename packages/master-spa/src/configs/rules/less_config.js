

export default [{
  test: /\.less$/,
  use: [{
    loader: "style-loader",
  }, {
    loader: "css-loader",
    options: {
      modules: {
        mode: (resourcePath) => {
          if (/\.(global)/.test(resourcePath)) {
            return "global";
          }
          if (/(node_modules)/.test(resourcePath)) {
            return "global";
          };
          return "local";
        }
      },
      sourceMap: true
    }
  }, {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        config: true
      },
      sourceMap: true
    }
  }, {
    loader: "less-loader",
    options: {
      lessOptions: {
        javascriptEnabled: true,
      },
      implementation: require("less"),
      sourceMap: true
    }
  }]
}]