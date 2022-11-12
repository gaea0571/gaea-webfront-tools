import path from "path";
import { merge } from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import webpack_basic_config from "./webpack.basic.config";

export default async ({ master_provider, version, namespace }) => {
  const basic_config = webpack_basic_config({ master_provider, namespace });

  return merge(basic_config, {
    mode: "production",
    output: {
      clean: true,
      path: path.resolve(process.cwd(), "./assets/"),
      filename: `application.${version}.js`
    },
    plugins: [
      new MiniCssExtractPlugin({
        runtime: true,
        linkType: "text/css",
        filename: `application.${version}.css`
      })
    ]
  });
};