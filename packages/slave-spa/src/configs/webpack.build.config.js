import path from "path";
import { merge } from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import webpack_basic_config from "./webpack.basic.config";

export default async ({ version, namespace, master_provider }) => {
  const basic_config = webpack_basic_config({ version, namespace, master_provider });

  return merge(basic_config, {
    mode: "production",
    output: {
      clean: true,
      publicPath: `/${version}/`,
      filename: `application.[fullhash].js`,
      path: path.resolve(process.cwd(), `./assets/${version}/`),
      library: { type: "system" }
    },
    plugins: [
      new MiniCssExtractPlugin({
        runtime: true,
        linkType: "text/css",
        filename: `application.[fullhash].css`
      })
    ]
  });
};