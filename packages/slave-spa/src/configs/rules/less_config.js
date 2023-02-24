import MiniCssExtractPlugin from "mini-css-extract-plugin";
import postcss_plugin from "../postcss/plugins";

export default ({ namespace, master_provider }) => [{
  test: /\.less$/,
  use: [{
    loader: MiniCssExtractPlugin.loader,
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
        config: true,
        plugins: postcss_plugin({ namespace, master_provider })
      },
      sourceMap: true
    }
  }, {
    loader: "less-loader",
    options: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: master_provider ? {
          "ant-prefix": namespace,
          "iconfont-css-prefix": namespace
        } : undefined
      },
      implementation: require("less"),
      sourceMap: true
    }
  }]
}]