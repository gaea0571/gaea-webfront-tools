import path from "path";
import WebpackBar from "webpackbar";
import { DefinePlugin } from "webpack";
import WebpackAssetsManifest from "webpack-assets-manifest";

import babel_config from "./rules/babel_config";
import css_config from "./rules/css_config";
import less_config from "./rules/less_config";
import scss_config from "./rules/scss_config";
import file_loader_config from "./rules/file_loader_config";

export default ({ version, namespace, master_provider }) => {
  const default_config = {
    entry: [
      path.resolve(process.cwd(), "./.framework/entry.js")
    ],
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
      rules: [...babel_config, ...css_config({ namespace, master_provider }), ...less_config({ namespace, master_provider }), ...scss_config({ namespace, master_provider }), ...file_loader_config]
    },
    plugins: [
      new WebpackBar({}),
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "process.env.NAMESPACE": JSON.stringify(namespace)
      }),
      new WebpackAssetsManifest({
        output: path.resolve(process.cwd(), `./assets/${version}/manifest.json`)
      })
    ]
  };

  if (master_provider) {
    default_config.output = {
      clean: true,
      publicPath: `/${version}/`,
      filename: `application.[fullhash].js`,
      path: path.resolve(process.cwd(), `./assets/${version}/`),
      library: { type: "system" }
    };
  } else {
    default_config.output = {
      clean: true,
      publicPath: `/${version}/`,
      path: path.resolve(process.cwd(), `./assets/${version}/`),
      filename: `application.[fullhash].js`
    };
  };

  return default_config;
};

