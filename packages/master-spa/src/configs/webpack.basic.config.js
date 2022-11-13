import path from "path";
import WebpackBar from "webpackbar";
import { DefinePlugin } from "webpack";

import WebpackAssetsManifest from "webpack-assets-manifest";

import babel_config from "./rules/babel_config";
import css_config from "./rules/css_config";
import less_config from "./rules/less_config";
import scss_config from "./rules/scss_config";
import file_loader_config from "./rules/file_loader_config";

export default {
  entry: [
    "systemjs",
    path.resolve(process.cwd(), "./.framework/entry.js")
  ],
  output: {
    clean: true,
    publicPath: "/",
    path: path.resolve(process.cwd(), "./assets/"),
    filename: `index.[fullhash].js`
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@@": process.cwd(),
      "@": path.resolve(process.cwd(), "./src/")
    }
  },
  optimization: {
    nodeEnv: false
  },
  module: {
    rules: [...babel_config, ...css_config, ...less_config, ...scss_config, ...file_loader_config]
  },
  plugins: [
    new WebpackBar({}),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackAssetsManifest({
      output: path.resolve(process.cwd(), "./assets/manifest.json")
    })
  ]
}
